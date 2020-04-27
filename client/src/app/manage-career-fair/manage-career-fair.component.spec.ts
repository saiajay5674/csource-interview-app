import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCareerFairComponent } from './manage-career-fair.component';

describe('ManageCareerFairComponent', () => {
  let component: ManageCareerFairComponent;
  let fixture: ComponentFixture<ManageCareerFairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCareerFairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCareerFairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
