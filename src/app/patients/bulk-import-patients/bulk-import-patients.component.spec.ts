import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkImportPatientsComponent } from './bulk-import-patients.component';

describe('BulkImportPatientsComponent', () => {
  let component: BulkImportPatientsComponent;
  let fixture: ComponentFixture<BulkImportPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkImportPatientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkImportPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
