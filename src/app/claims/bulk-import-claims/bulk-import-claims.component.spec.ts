import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkImportClaimsComponent } from './bulk-import-claims.component';

describe('BulkImportClaimsComponent', () => {
  let component: BulkImportClaimsComponent;
  let fixture: ComponentFixture<BulkImportClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkImportClaimsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkImportClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
