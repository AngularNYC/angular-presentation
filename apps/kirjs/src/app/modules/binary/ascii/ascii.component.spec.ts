import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AsciiComponent } from './ascii.component';

describe('AsciiComponent', () => {
  let component: AsciiComponent;
  let fixture: ComponentFixture<AsciiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AsciiComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsciiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
