import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EraListComponent } from './era-list.component';

describe('EraListComponent', () => {
  let component: EraListComponent;
  let fixture: ComponentFixture<EraListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EraListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
