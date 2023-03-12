import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoinciliationComponent } from './recoinciliation.component';

describe('RecoinciliationComponent', () => {
  let component: RecoinciliationComponent;
  let fixture: ComponentFixture<RecoinciliationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoinciliationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoinciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
