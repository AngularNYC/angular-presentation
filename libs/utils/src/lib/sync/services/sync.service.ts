import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoginService } from '@codelab/firebase-login';
import { distinctUntilChanged, first, map, mergeMap, pairwise, startWith, switchMap, take } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, forkJoin, iif, Observable, of, ReplaySubject } from 'rxjs';
import { SyncMeta, SyncStatus } from '@codelab/utils/src/lib/sync/common';

@Injectable({
  providedIn: 'root'
})
export class SyncService<T> {
  currentSyncId$ = new BehaviorSubject('');
  currentViewerIdSubject = new BehaviorSubject('');
  currentViewerId$ = this.currentViewerIdSubject.pipe(distinctUntilChanged());

  readonly isInSession$ = this.currentSyncId$.pipe(map(syncId => !!syncId));
  readonly canStartSession$ = combineLatest([this.loginService.uid$, this.currentSyncId$])
    .pipe(map(([uid, syncId]) => {
      return !!uid && syncId === '';
    }));
  readonly currentSession$ = this.currentSyncId$.pipe(
    mergeMap(id =>
      iif(() => !!id, this.db.object<SyncMeta<T>>('sync-sessions/' + id).valueChanges(), of(null))));

  readonly presentersData$ = this.currentSyncId$.pipe(
    mergeMap(id =>
      iif(() => !!id, this.db.object<T>('sync-sessions/' + id + '/presenter').valueChanges(), of(null))));

  readonly statusChange$: Observable<SyncStatus> = this.currentSyncId$.pipe(switchMap(syncId => {
    if (!syncId) {
      return of(SyncStatus.OFF);
    }

    return this.currentSession$.pipe(
      switchMap(session => {
        if (!session) {
          return of(SyncStatus.OFF);
        }

        return this.loginService.uid$.pipe(map((uid) => {
          if (uid === 'admin') {
            return SyncStatus.ADMIN;
          }

          if (session.uid === uid) {
            return SyncStatus.PRESENTING;
          }
          return SyncStatus.VIEWING;
        }));
      })
    );

  }), distinctUntilChanged());


  // combineLatest([this.loginService.uid$, this.currentSyncId$, this.currentSession$])


  readonly hasSessions$;
  private readonly list = this.db.list<Partial<SyncMeta<T>>>('sync-sessions',
    ref => ref.orderByChild('time').startAt(Date.now() - 1000 * 60 * 10)
  );
  sessions$ = this.list.snapshotChanges().pipe(map(snapshot => {
    return snapshot.map(s => {
      return {
        key: s.key,
        ...s.payload.val()
      };
    });
  }));
  private presenterUpdates$ = new ReplaySubject<Partial<T>>(1);
  private viewerUpdates$ = new ReplaySubject<any>(1);


  constructor(
    private db: AngularFireDatabase,
    private loginService: LoginService
  ) {
    combineLatest([this.presenterUpdates$, this.currentSyncId$, this.statusChange$])
      .subscribe(
        ([data, syncId, status]) => {

          // TODO(kirjs): Use rxjs way
          if (syncId && (status === SyncStatus.PRESENTING || status === SyncStatus.ADMIN)) {
            this.touch();
            this.db.object('sync-sessions/' + syncId + '/presenter').update(data);
          }
        });

    // this.viewerUpdates$.subscribe((viewerUpdates) => console.log({viewerUpdates}));
    // this.currentSyncId$.subscribe((currentSyncId) => console.log({currentSyncId}));
    // this.currentViewerId$.subscribe((currentViewerId) => console.log({currentViewerId}));
    // this.presenterUpdates$.subscribe((presenterUpdates) => console.log({presenterUpdates}));


    // Formatter breaks this when it's above constructor by moving it before
    // $sessions declaration on every second format
    this.hasSessions$ = this.sessions$.pipe(map(sessions => sessions.length > 0));

    combineLatest([this.viewerUpdates$, this.currentSyncId$, this.currentViewerId$]).subscribe(
      ([{key, data, type}, syncId, viewerId]) => {

        if (syncId === '') {
          throw new Error('No viewer ID, you might be a presenter');
        }

        if (type === 'update') {
          const update = {[viewerId]: data};
          this.db.object(`sync-sessions/${syncId}/viewer/${key}`).update(update);
        }

        if (type === 'push') {
          this.db.list(`sync-sessions/${syncId}/viewer/${key}/${viewerId}`).push(data);
        }
      });

    /**
     * AutoJoin
     */

    this.sessions$.pipe(
      startWith([]),
      map(sessions => {
        if (sessions.length === 0) {
          return '';
        }
        if (sessions.length === 1) {
          return sessions[0].key;
        }

        console.log('There are ' + sessions.length + ' sessions. Not sure which session to join');
      }),
      distinctUntilChanged(),
      pairwise(),
    ).subscribe(([oldId, newId]) => {
      if (newId) {
        this.follow(newId);
      }
    });
  }


  getObjectByKey<T>(key: string) {
    return this.db.object<T>(key);
  }

  getListByKey<T>(key: string) {
    return this.db.list<T>(key);
  }

  startSession(data: T) {
    this.loginService.user$.subscribe(user => {
      const syncId = this.list.push({
        displayName: user.displayName || user.email,
        uid: user.uid,
        presenter: data,
        users: {},
        time: Date.now()
      }).key;
      this.currentSyncId$.next(syncId);
    });
  }

  follow(syncId: string) {
    this.currentSyncId$.next(syncId);

    forkJoin([
      this.statusChange$.pipe(first()),
      this.loginService.uid$.pipe(first())
    ]).subscribe(([status, uid]) => {
      if (status === SyncStatus.VIEWING) {

        this.db.list('sync-sessions/' + syncId + '/all-viewers', ref => ref.orderByChild('uid').equalTo(uid))
          .snapshotChanges()
          .pipe(first())
          .subscribe(a => {
            if (a.length > 0) {
              this.currentViewerIdSubject.next(a[0].key);
            } else {
              this.currentViewerIdSubject.next(
                this.db.list('sync-sessions/' + syncId + '/all-viewers').push({
                  time: Date.now(),
                  uid,
                }).key
              );
            }
          });
      }
    });
  }

  touch() {
    this.currentSyncId$
      .pipe(first())
      .subscribe((syncId) => {
        this.list.update(syncId, {
          time: Date.now()
        });
      });

  }

  dropCurrentSession() {
    return this.currentSyncId$.pipe(take(1)).subscribe(id => {
      this.currentSyncId$.next('');
      this.list.remove(id);
    });
  }
}