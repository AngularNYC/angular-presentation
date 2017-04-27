import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ng2tsConfig} from '../../../../ng2ts/ng2ts';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {


  code = {
    'test0': {
      code: `export class Hello {
  constructor(private name: string){}
  hello(){
     const greeting = 'Hello';
		return \`\${greeting} ${name}!\`
  }
}
`,
      readonly: true,
      path: 'hello.ts',
      type: 'typescript'
    },
    component: {
      justClass: {
        code: `
export class AppComponent {
}`,
        readonly: true,
        path: 'Path',
        type: 'typescript',

      },
      'test1': {
        code: `import {Hello} from 'Hello';
console.log(new Hello(2016).hello())`,
        readonly: true,
        path: 'main.ts',
        type: 'typescript'
      },
      hello: `tooltips = [
 {
  match:'Angular',
  text:'This is Angular',
  fontSize: 40 //optional
 }
];`
    }
  };
  exercises = [
    ng2tsConfig.milestones[0].exercises[1],
    ng2tsConfig.milestones[1].exercises[1],
    ng2tsConfig.milestones[1].exercises[2],
    {
      "name": "Create a component",
      "description": "<p>Create first Angular component!</p>",
      "files": [
        {
          "bootstrap": false,
          "excludeFromTesting": false,
          "type": "typescript",
          "path": "app.component.ts",
          "template": "import {Component} from '@angular/core';\n\n",
          "moduleName": "app.component",
          "code": `import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: '<h1>Hello CatTube!</h1>',
})
export class AppComponent {
}
`,
          "solution": "import {Component} from '@angular/core';\n\n@Component({\n  selector: 'my-app',\n  template: '<h1>Hello CatTube!</h1>',\n})\nexport class AppComponent {\n}\n",
          "after": "export export function evalJs( js ){ return eval(js);}"
        },
        {
          "bootstrap": false,
          "excludeFromTesting": false,
          "type": "typescript",
          "path": "app.module.ts",
          "template": "import {BrowserModule} from '@angular/platform-browser';\nimport {NgModule} from '@angular/core';\nimport {AppComponent} from './app.component';\n\n@NgModule({\n  imports: [BrowserModule],\n  declarations: [AppComponent],\n  bootstrap: [AppComponent]\n})\nexport class AppModule {\n}\n",
          "moduleName": "app.module",
          "code": "import {BrowserModule} from '@angular/platform-browser';\nimport {NgModule} from '@angular/core';\nimport {AppComponent} from './app.component';\n\n@NgModule({\n  imports: [BrowserModule],\n  declarations: [AppComponent],\n  bootstrap: [AppComponent]\n})\nexport class AppModule {\n}\n",
          "readonly": true,
          "collapsed": true
        },
        {
          "bootstrap": true,
          "excludeFromTesting": true,
          "type": "typescript",
          "path": "main.ts",
          "template": "import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';\nimport {AppModule} from './app.module';\n\nconst platform = platformBrowserDynamic();\nplatform.bootstrapModule(AppModule);\n",
          "moduleName": "main",
          "code": "import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';\nimport {AppModule} from './app.module';\n\nconst platform = platformBrowserDynamic();\nplatform.bootstrapModule(AppModule);\n",
          "readonly": true,
          "collapsed": true
        },
        {
          "bootstrap": true,
          "excludeFromTesting": false,
          "type": "typescript",
          "path": "tests/test.ts",
          "template": "\nimport {TestBed} from '@angular/core/testing';\n// Solution prefix will be stripped-out by the app\nimport {AppComponent, evalJs} from '../app.component';\nimport 'reflect-metadata';\n\nlet metadata;\nbeforeEach(() => {\n  try {\n    TestBed.resetTestingModule();\n    TestBed.configureTestingModule({declarations: [AppComponent]});\n    metadata = Reflect.getMetadata('annotations', AppComponent);\n  } catch (e) {\n    // Do nothing, we have assertions below for this case\n  }\n});\n\ndescribe('Component', () => {\n  it(`Create a class called AppComponent`, () => {\n    chai.expect(typeof evalJs('AppComponent')).equals('function');\n  });\n\n  it(`Export the created class`, () => {\n    chai.expect(typeof AppComponent).equals('function');\n  });\n\n  it(`Add a Component decorator for the class`, () => {\n    chai.expect(metadata).is.not.undefined\n  });\n\n  it(`Add a selector to the component decorator`, () => {\n    chai.expect(metadata[0].selector).equals('my-app');\n  });\n\n  it(`Add a template that contains: '<h1>Hello CatTube!</h1>'`, () => {\n    chai.expect(metadata[0].template).equals('<h1>Hello CatTube!</h1>');\n  });\n});\n\n",
          "moduleName": "tests/test",
          "code": "\nimport {TestBed} from '@angular/core/testing';\n// Solution prefix will be stripped-out by the app\nimport {AppComponent, evalJs} from '../app.component';\nimport 'reflect-metadata';\n\nlet metadata;\nbeforeEach(() => {\n  try {\n    TestBed.resetTestingModule();\n    TestBed.configureTestingModule({declarations: [AppComponent]});\n    metadata = Reflect.getMetadata('annotations', AppComponent);\n  } catch (e) {\n    // Do nothing, we have assertions below for this case\n  }\n});\n\ndescribe('Component', () => {\n  it(`Create a class called AppComponent`, () => {\n    chai.expect(typeof evalJs('AppComponent')).equals('function');\n  });\n\n  it(`Export the created class`, () => {\n    chai.expect(typeof AppComponent).equals('function');\n  });\n\n  it(`Add a Component decorator for the class`, () => {\n    chai.expect(metadata).is.not.undefined\n  });\n\n  it(`Add a selector to the component decorator`, () => {\n    chai.expect(metadata[0].selector).equals('my-app');\n  });\n\n  it(`Add a template that contains: '<h1>Hello CatTube!</h1>'`, () => {\n    chai.expect(metadata[0].template).equals('<h1>Hello CatTube!</h1>');\n  });\n});\n\n",
          "solution": "\nimport {TestBed} from '@angular/core/testing';\n// Solution prefix will be stripped-out by the app\nimport {AppComponent, evalJs} from '../app.component';\nimport 'reflect-metadata';\n\nlet metadata;\nbeforeEach(() => {\n  try {\n    TestBed.resetTestingModule();\n    TestBed.configureTestingModule({declarations: [AppComponent]});\n    metadata = Reflect.getMetadata('annotations', AppComponent);\n  } catch (e) {\n    // Do nothing, we have assertions below for this case\n  }\n});\n\ndescribe('Component', () => {\n  it(`Create a class called AppComponent`, () => {\n    chai.expect(typeof evalJs('AppComponent')).equals('function');\n  });\n\n  it(`Export the created class`, () => {\n    chai.expect(typeof AppComponent).equals('function');\n  });\n\n  it(`Add a Component decorator for the class`, () => {\n    chai.expect(metadata).is.not.undefined\n  });\n\n  it(`Add a selector to the component decorator`, () => {\n    chai.expect(metadata[0].selector).equals('my-app');\n  });\n\n  it(`Add a template that contains: '<h1>Hello CatTube!</h1>'`, () => {\n    chai.expect(metadata[0].template).equals('<h1>Hello CatTube!</h1>');\n  });\n});\n\n",
          "test": true,
          "before": "mochaBefore();",
          "after": "mochaAfter();",
          "hidden": true
        }
      ]
    }
  ];

  activeSlideId = 0;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    //let id = Number(this.route.snapshot.params['id']);
    //if (id) {
      //this.activeSlideIndex = id;
    //}
  }

}
