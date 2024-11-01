import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIndPatientComponent } from './view-ind-patient.component';

describe('ViewIndPatientComponent', () => {
  let component: ViewIndPatientComponent;
  let fixture: ComponentFixture<ViewIndPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewIndPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewIndPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
