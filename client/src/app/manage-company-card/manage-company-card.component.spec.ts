import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCompanyCardComponent } from './manage-company-card.component';

describe('ManageCompanyCardComponent', () => {
  let component: ManageCompanyCardComponent;
  let fixture: ComponentFixture<ManageCompanyCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCompanyCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCompanyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
