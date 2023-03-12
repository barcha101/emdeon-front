import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFinanceComponent } from './patient-finance.component';

describe('PatientFinanceComponent', () => {
  let component: PatientFinanceComponent;
  let fixture: ComponentFixture<PatientFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientFinanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
