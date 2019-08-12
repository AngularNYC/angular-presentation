import { Component } from '@angular/core';
import { QuestionsService } from '@codelab/utils/src/lib/sync/components/questions/common/questions.service';
import { map } from 'rxjs/operators';
import { statuses } from '@codelab/utils/src/lib/sync/components/questions/common/common';

@Component({
  selector: 'slides-questions-admin',
  templateUrl: './questions-admin.component.html',
  styleUrls: ['./questions-admin.component.css'],
  providers: [QuestionsService],
})
export class QuestionsAdminComponent {
  statuses = statuses;

  public readonly questionsByStatus$ = this.questionsService.questions$.pipe(map(questions => {
    return questions.reduce((result, question) => {
      result[question.status] = result[question.status] || [];
      result[question.status].push(question);
      return result;
    }, {});
  }));
  requireApproval: boolean;


  constructor(public readonly questionsService: QuestionsService) {
  }
}