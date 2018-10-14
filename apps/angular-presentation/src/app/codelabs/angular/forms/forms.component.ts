import { CodelabFile } from '../../../exercise/helpers/codelabFile';
import { Component } from '@angular/core';
import { ExerciseConfigTemplate, Ng2TsExercises } from '../../../../../../../ng2ts/ng2ts';

declare const require;


interface FileHighlights {
  appModule?: RegExp | RegExp[];
  appHtml?: RegExp | RegExp[];
  appComponent?: RegExp | RegExp[];
}

function formsConfig(code,
                     highlights: FileHighlights = {}) {
  const files = {
    appHtml: require('!!raw-loader!./samples/basic/app.1.html'),
    appModule: require('!!raw-loader!./samples/basic/app.module.ts'),
    appComponent: require('!!raw-loader!./samples/basic/app.component.ts'),
    ...code
  };

  return {
    files: [
      CodelabFile.Html('app')
        .setCode(files.appHtml)
        .withHighlight(highlights.appHtml),

      CodelabFile.TypeScriptFile('app.module')
        .setCode(files.appModule)
        .withHighlight(highlights.appModule),

      CodelabFile.TypeScriptFile('app.component')
        .setCode(files.appComponent)
        .withHighlight(highlights.appComponent),

      CodelabFile.TypeScriptFile('bootstrap').setCode(require('!!raw-loader!./samples/basic/main.ts')).makeBootstrappable(),

      CodelabFile.Css('styles.css').setCode(require('!!raw-loader!@angular/material/prebuilt-themes/indigo-pink.css')),

      CodelabFile.Css('extra.css').setCode(require('!!raw-loader!./samples/basic/styles.css'))
    ]
  };

}

@Component({
  selector: 'slides-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {
  exercise: ExerciseConfigTemplate;
  samples = {
    basicForm: formsConfig({appHtml: require('!!raw-loader!./samples/basic/app.1.html')}, {
      appModule: /FormsModule\n/
    }),
    ngModel: formsConfig({appHtml: require('!!raw-loader!./samples/basic/app.2.html')},
      {
        appHtml: [/ngModel/g]
      }),
    ngValidation1: formsConfig({appHtml: require('!!raw-loader!./samples/basic/app.3.html')},
      {
        appHtml: [/required/]
      }),
    ngValidation2: formsConfig({appHtml: require('!!raw-loader!./samples/basic/app.4.html')},
      {
        appHtml: [/#usernameModel="ngModel"/, /<div \*[\s\S]*?<\/div>/]
      }),
    touched: formsConfig({
      appHtml: require('!!raw-loader!./samples/basic/app.4.html'),
      appComponent: require('!!raw-loader!./samples/basic/app.component.5.ts'),
    }, {
      appComponent: /username = ''/
    }),
    touched2: formsConfig({
      appHtml: require('!!raw-loader!./samples/basic/app.5.html'),
      appComponent: require('!!raw-loader!./samples/basic/app.component.5.ts'),
    }, {
      appHtml: /(usernameModel.touched \|\| usernameModel.dirty)/
    }),
    ngMaterial: formsConfig({
      appHtml: require('!!raw-loader!./samples/basic/app.6.html'),
      appModule: require('!!raw-loader!./samples/basic/app.module.6.ts').replace('component.5', 'component' /*Stupid hack*/)
    }, {
      appHtml: [/<mat-form-field>/, /<\/mat-form-field>/, /matInput/, /<mat-error>.*<\/mat-error>/]
    })
  };

  constructor(private exercises: Ng2TsExercises) {
    this.exercise = exercises.getExercises(7, 0);
  }

}
