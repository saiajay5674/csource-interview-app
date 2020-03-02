import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerfairComponent } from './careerfair.component';

describe('CareerfairComponent', () => {
  let component: CareerfairComponent;
  let fixture: ComponentFixture<CareerfairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerfairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerfairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
