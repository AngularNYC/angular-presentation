import {NgModule} from '@angular/core';
import {TypescriptComponent} from './typescript.component';
import {RouterModule} from '@angular/router';
import {SlidesRoutes} from '../../presentation/slide-routes';
import {ExerciseModule} from '../../exercise/exercise.module';
import {PresentationModule} from 'app/presentation/presentation.module';
import {FeedbackModule} from '../../feedback/feedback.module';
import {CommonModule} from '@angular/common';
import {BrowserWindowModule} from '../../browser-window/browser-window.module';
import {TrackingModule} from '../../tracking/tracking.module';

const routes = RouterModule.forChild(
  SlidesRoutes.get(TypescriptComponent)
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, FeedbackModule, CommonModule, BrowserWindowModule, TrackingModule],
  declarations: [TypescriptComponent],
  exports: [TypescriptComponent]
})
export class TypescriptModule {

}
