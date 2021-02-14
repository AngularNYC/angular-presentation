import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SyncCodeGameAdminComponent } from './sync-code-game-admin.component';

describe('SyncCodeGameAdminComponent', () => {
  let component: SyncCodeGameAdminComponent;
  let fixture: ComponentFixture<SyncCodeGameAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SyncCodeGameAdminComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncCodeGameAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
