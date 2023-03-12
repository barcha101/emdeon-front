import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCptComponent } from './update-cpt.component';

describe('UpdateCptComponent', () => {
  let component: UpdateCptComponent;
  let fixture: ComponentFixture<UpdateCptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
