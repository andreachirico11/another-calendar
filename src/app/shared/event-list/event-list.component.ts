import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { StateSelectors } from 'src/app/reducers/state';
import { CalendarEvent } from 'src/app/types';

@Component({
  selector: 'ac-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  @Input() startDate!: Date;
  @Input() endDate!: Date;

  events!: Observable<CalendarEvent[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.events = this.store.pipe(StateSelectors.selectedDateEvents(this.startDate, this.endDate));
  }
}
