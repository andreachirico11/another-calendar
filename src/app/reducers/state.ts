import { createReducer, on, select } from '@ngrx/store';
import { pipe } from 'rxjs';
import { AppState } from '.';
import { DateToolsService } from '../shared/date-tools-service/date-tools.service';
import { CalendarEvent } from '../types';
import {
  CreateEvent,
  CreateEventFail,
  CreateEventSuccess,
  onCreateEvent,
  onCreateEventFail,
  onCreateEventSuccess,
} from './event.actions';
import { onSelectedDateUpdate, UpdateSelectedDate } from './selectedDate-actions';
import { ClearError, onClearError } from './shared.actions';

export interface State {
  events: CalendarEvent[];
  selectedDate: Date;
  isLoading: boolean;
  onError: boolean;
}

const initialState: State = {
  events: [],
  selectedDate: new Date(),
  isLoading: false,
  onError: false,
};

// REDUCER

export const stateReducer = createReducer(
  initialState,
  on(CreateEvent, onCreateEvent),
  on(CreateEventSuccess, onCreateEventSuccess),
  on(CreateEventFail, onCreateEventFail),
  on(UpdateSelectedDate, onSelectedDateUpdate),
  on(ClearError, onClearError)
);

export const StateSelectors = {
  get simpleSel() {
    return pipe(select((s: AppState) => s.state.events));
  },

  get actualSelectedDate() {
    return pipe(select((s: AppState) => s.state.selectedDate));
  },

  get isLoading() {
    return pipe(select((s: AppState) => s.state.isLoading));
  },

  get isOnError() {
    return pipe(select((s: AppState) => s.state.onError));
  },

  selectedDateEvents(startDate: Date, endDate: Date) {
    return pipe(
      select((s: AppState) =>
        s.state.events.filter((e) => {
          return DateToolsService.isInRange(e, startDate, endDate);
        })
      )
    );
  },
};
