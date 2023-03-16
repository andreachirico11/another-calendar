import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekComponent } from './week.component';

describe('AcWeekComponent', () => {
  let component: WeekComponent;
  let fixture: ComponentFixture<WeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeekComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});