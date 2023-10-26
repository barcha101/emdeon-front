import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBotsComponent } from './list-bots.component';

describe('ListBotsComponent', () => {
  let component: ListBotsComponent;
  let fixture: ComponentFixture<ListBotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
