import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFilesListComponent } from './admin-files-list.component';

describe('AdminFilesListComponent', () => {
  let component: AdminFilesListComponent;
  let fixture: ComponentFixture<AdminFilesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFilesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFilesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
