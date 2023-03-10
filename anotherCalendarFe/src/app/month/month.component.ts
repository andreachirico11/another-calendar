import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../reducers';
import { StateSelectors } from '../reducers/state';
import { DateToolsService } from '../shared/date-tools-service/date-tools.service';

@Component({
  selector: 'ac-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss'],
})
export class MonthComponent implements OnInit, OnDestroy {
  mockDays = Array(35).fill('');

  selectedDate!: Date;
  squaredMonthDays: Date[] = [];
  isLoading = true;

  private sub!: Subscription;

  get weekDays() {
    return this.tool.weekDays;
  }

  constructor(private store: Store<AppState>, private tool: DateToolsService) {}

  ngOnInit() {
    this.sub = this.store.pipe(StateSelectors.actualSelectedDate).subscribe((newSelectedDate) => {
      this.isLoading = true;
      this.selectedDate = newSelectedDate;
      this.squaredMonthDays = this.tool.getSquaredMonthFromDate(newSelectedDate);
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getEndDate(date: Date, i: number) {
    if (i === this.squaredMonthDays.length - 1) {
      return this.tool.getTheNextDay(this.squaredMonthDays[i]);
    }
    return this.squaredMonthDays[i + 1];
  }
}
