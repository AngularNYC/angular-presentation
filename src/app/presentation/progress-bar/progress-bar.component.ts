import {Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {PresentationComponent} from '../presentation/presentation.component';

@Component({
  selector: 'slides-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements AfterViewInit {
  @ViewChild('progressBarDiv') el: ElementRef;
  slides = [];
  currentSlideId = 0;

  constructor(public presentation: PresentationComponent) {
  }
  ngAfterViewInit() {
    this.slides = this.presentation.slides.toArray();
    this.presentation.onSlideChange.subscribe(() => {
      if (this.slides[this.presentation.activeSlideIndex].id === 'type-mini-exercise') {
        this.addProgressBarExplanation();
      } else if (this.el.nativeElement.getAttribute('data-intro') !== null) {
        this.removeProgressBarExplanation();
      }
      this.currentSlideId = this.presentation.activeSlideIndex;
    });
  }
  // TODO: Move the logic out of the progress bar.
  addProgressBarExplanation() {
    this.el.nativeElement.setAttribute('data-step', '5');
    this.el.nativeElement.setAttribute(
      'data-intro',
      'By the way...the progress bar can help you navigate through any section.'
    );
  }
  removeProgressBarExplanation() {
    this.el.nativeElement.removeAttribute('data-step');
    this.el.nativeElement.removeAttribute('data-intro');
  }
  goToSlide(index) {
    this.presentation.goToSlide(index);
  }
}
