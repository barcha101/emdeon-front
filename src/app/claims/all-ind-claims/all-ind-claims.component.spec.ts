import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllIndClaimsComponent } from './all-ind-claims.component';

describe('AllIndClaimsComponent', () => {
  let component: AllIndClaimsComponent;
  let fixture: ComponentFixture<AllIndClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllIndClaimsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllIndClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
