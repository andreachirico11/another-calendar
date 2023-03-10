import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../reducers';
import { StateSelectors } from '../reducers/state';
import { DateToolsService } from '../shared/date-tools-service/date-tools.service';

@Component({
  selector: 'ac-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
})
export class WeekComponent {
  mockHours = Array(7).fill('');
  mockHoursSlots = Array(23).fill('');

  selectedDate!: Date;
  firstDayOfTheWeekDate!: Date;
  dayHours: Date[] = [];
  weekDays: Date[] = [];
  isLoading = true;

  private sub!: Subscription;

  constructor(private store: Store<AppState>, private tool: DateToolsService) {}

  ngOnInit() {
    this.sub = this.store.pipe(StateSelectors.actualSelectedDate).subscribe((newSelectedDate) => {
      this.isLoading = true;
      this.selectedDate = newSelectedDate;
      this.dayHours = this.tool.getDayHoursArray(this.selectedDate);
      this.weekDays = this.tool.getWeekAroundDate(this.selectedDate);
      this.firstDayOfTheWeekDate = this.tool.getFirstDayOfTheWeek(this.selectedDate);
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  mergeDayAndHour(dayDate: Date, hour: Date) {
    return this.tool.mergeDayAndHour(dayDate, hour);
  }

  getSlotEndHour(startHourIndex: number) {
    if (startHourIndex === this.dayHours.length - 1) {
      return this.tool.getTheNextDay(this.dayHours[0]);
    }
    return this.dayHours[startHourIndex + 1];
  }

  updateIfLastDay(startHourIndex: number, date: Date) {
    if (startHourIndex === this.dayHours.length - 1) {
      return this.tool.getTheNextDay(date);
    }
    return date;
  }
}
