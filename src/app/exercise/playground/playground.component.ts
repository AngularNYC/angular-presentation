import {Component, Input} from '@angular/core';
import {ExerciseBase} from '../exercise/exercise.base';
import {MonacoConfigService} from '../services/monaco-config.service';
import {SlideComponent} from '../../presentation/slide/slide.component';
import {AnalyticsService} from '../../presentation/analytics.service';


@Component({
  selector: 'slides-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent extends ExerciseBase {
  @Input() browserUseConsole: boolean;
  @Input() browserWidth: string;
  @Input() browserHeight: string;

  // tslint:disable-next-line:all TODO: Fix linter warnings on the next line and delete this comment.
  @Input('focus-highlight-match') highlightMatches = [];

  constructor(slide: SlideComponent, monacoConfig: MonacoConfigService, analyticsService: AnalyticsService) {
    super(slide, monacoConfig, analyticsService);
  }

  onCodeChange(code) {
    this.onCodeChanges({file: this.config.files[0], code});
  }
}
