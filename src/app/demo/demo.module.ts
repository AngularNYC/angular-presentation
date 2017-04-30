import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {MonacoConfigService} from '../exercise/services/monaco-config.service';
import {ExerciseModule} from '../exercise/exersice.module';
import {TooltipsModule} from '../tooltips/tooltips.module';
import {IndexComponent} from './index/index.component';
import {PresentationModule} from '../presentation/presentation.module';

export const routes = [
  {
    path: 'typescript',
    loadChildren: './typescript/typescript.module#TypescriptModule',
    name: 'Typescript (Optional)',
    description: 'Angular is using TypeScript which is an improved version with JavaScript. Learn more about it in this codelab'
  }, {
    path: 'bootstrap',
    loadChildren: './bootstrap/bootstrap.module#BootstrapModule',
    name: 'Bootstrap',
    description: 'Learn how create and bootstrap your first Angular application'
  },
  {
    path: 'templates',
    loadChildren: './templates/templates.module#TemplatesModule',
    name: 'Templates',
    description: 'See how you can use angular templates'
  },
  {
    path: 'dependency-injection',
    loadChildren: './dependency-injection/dependency-injection.module#DependencyInjectionModule',
    name: 'Dependency-Injection',
    description: 'Learn how to provide dependencies to your code instead of hard-coding them.'
  },
  {
    path: 'component-tree',
    loadChildren: './component-tree/component-tree.module#ComponentTreeModule',
    name: 'Component-Tree',
    description: 'Learn how to organize your app into reusable components'
  },
  {
    path: 'experiments',
    loadChildren: './experiments/experiments.module#ExperimentsModule',
    name: 'Experiments',
    description: 'This is a place for experiments, dev only'
  },
  {
    path: '',
    component: IndexComponent
  }
];

export function monacoReady() {
  return MonacoConfigService.monacoReady;
}

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PresentationModule,
    ExerciseModule,
    RouterModule.forRoot(routes),
    TooltipsModule
  ],
  providers: [
    {
      provide: 'ROUTES',
      useValue: routes
    },
    {
      provide: APP_INITIALIZER,
      useValue: monacoReady,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class DemoModule {
}
