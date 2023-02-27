import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../reducers';
import { StateSelectors } from '../reducers/state';
import { DateToolsService } from '../shared/date-tools-service/date-tools.service';

@Component({
  selector: 'ac-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnDestroy, OnInit {
  selectedDate!: Date;
  dayHours: Date[] = [];
  isLoading = true;

  private sub!: Subscription;

  constructor(private store: Store<AppState>, private tool: DateToolsService) {}

  ngOnInit() {
    this.sub = this.store.pipe(StateSelectors.actualSelectedDate).subscribe((newSelectedDate) => {
      this.selectedDate = newSelectedDate;
      this.dayHours = this.tool.getDayHoursArray(this.selectedDate);
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getSlotEndHour(startHourIndex: number) {
    if (startHourIndex === this.dayHours.length - 1) {
      return this.dayHours[0];
    }
    return this.dayHours[startHourIndex + 1];
  }
}
