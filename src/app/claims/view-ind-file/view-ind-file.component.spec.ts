import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIndFileComponent } from './view-ind-file.component';

describe('ViewIndFileComponent', () => {
  let component: ViewIndFileComponent;
  let fixture: ComponentFixture<ViewIndFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewIndFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewIndFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
