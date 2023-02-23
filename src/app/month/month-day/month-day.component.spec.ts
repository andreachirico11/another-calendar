import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthDayComponent } from './month-day.component';

describe('AcMonthDayComponent', () => {
  let component: MonthDayComponent;
  let fixture: ComponentFixture<MonthDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthDayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MonthDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
