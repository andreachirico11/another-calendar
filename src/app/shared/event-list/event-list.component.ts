import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { StateSelectors } from 'src/app/reducers/state';
import { CalendarEvent } from 'src/app/types';

@Component({
  selector: 'ac-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent {
  events: Observable<CalendarEvent[]>;

  constructor(private store: Store<AppState>) {
    this.events = this.store.pipe(StateSelectors.simpleSel);
  }
}
