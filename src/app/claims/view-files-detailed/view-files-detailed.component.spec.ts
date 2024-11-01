import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFilesDetailedComponent } from './view-files-detailed.component';

describe('ViewFilesDetailedComponent', () => {
  let component: ViewFilesDetailedComponent;
  let fixture: ComponentFixture<ViewFilesDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFilesDetailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFilesDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
