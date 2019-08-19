import { Component } from '@angular/core';
import { SyncPollConfig } from '@codelab/utils/src/lib/sync/components/poll/common/common';


@Component({
  selector: 'slides-sync-playground-test',
  templateUrl: './sync-playground-test.component.html',
  styleUrls: ['./sync-playground-test.component.css']
})
export class SyncPlaygroundTestComponent {
  readonly polls: SyncPollConfig[] = [
    {
      key: 'js',
      type: 'stars',
      question: 'How well do you know JavaScript',
    },
    {
      key: 'angularjs',
      type: 'stars',
      question: 'How well do you know AngularJS (Old version)',
    },
    {
      key: 'angularjs',
      type: 'stars',
      question: 'How well do you know Angular',
    },
    {
      key: 'fruit',
      type: 'choice',
      question: 'What is your favorite fruit?',
      answers: [
        '🍏', '🍋', '🍓', '🍍'
      ]
    },
    {
      key: 'angular question',
      type: 'choice',
      question: 'What is your favorite framework?',
      answers: [
        'react', 'Angular', 'Vue', 'Other',
      ]
    },
    {
      key: 'longer question',
      type: 'choice',
      question: 'Who created angular',
      answers: [
        'Мега корпорация "Крошка-Картошка"', 'Facebook сделал лично Цукерберг', 'Николай Васильевич Гогол',
        'Google Angular Brad Green Misko',
      ]
    }
  ];
}
