import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckedStudentsComponent } from './checked-students.component';

describe('CheckedStudentsComponent', () => {
  let component: CheckedStudentsComponent;
  let fixture: ComponentFixture<CheckedStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckedStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckedStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
