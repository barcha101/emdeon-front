import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEraComponent } from './add-era.component';

describe('AddEraComponent', () => {
  let component: AddEraComponent;
  let fixture: ComponentFixture<AddEraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
