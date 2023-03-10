import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { StateSelectors } from 'src/app/reducers/state';
import { CalendarEvent } from 'src/app/types';

const SHOW_TIMES_FOR_DEBUG = false;

@Component({
  selector: 'ac-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  @Input() startDate!: Date;
  @Input() endDate!: Date;

  events!: Observable<CalendarEvent[]>;

  get debugMode() {
    return SHOW_TIMES_FOR_DEBUG;
  }

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.events = this.store.pipe(StateSelectors.selectedDateEvents(this.startDate, this.endDate));
  }

  onSlotClick() {
    this.router.navigate(['/event/new'], {
      queryParams: { startDate: this.startDate.toISOString(), endDate: this.endDate.toISOString() },
    });
  }
}
