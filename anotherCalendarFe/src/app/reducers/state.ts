import { createReducer, on, select } from '@ngrx/store';
import { first, pipe } from 'rxjs';
import { AppState } from '.';
import { DateToolsService } from '../shared/date-tools-service/date-tools.service';
import { AppConfig, CalendarEvent } from '../types';
import {
  CreateEvent,
  CreateEventFail,
  CreateEventSuccess,
  DeleteEvent,
  DeleteEventSuccess,
  EventsLoaded,
  onCreateEvent,
  onCreateEventFail,
  onCreateEventSuccess,
  onDeleteEvent,
  onDeleteEventSuccess,
  onEventsLoaded,
  onStartLoadEvents,
  onUpdateEvent,
  onUpdateEventSuccess,
  StartLoadEvents,
  UpdateEvent,
  UpdateEventSuccess,
} from './event.actions';
import {
  NextOrPrevSelectedDate,
  onNextOrPrevSelectedDate,
  onSelectedDateUpdate,
  UpdateSelectedDate,
} from './selectedDate-actions';
import {
  ClearError,
  InitializationEnd,
  InitializationStart,
  onClearError,
  onInitializationEnd,
  onInitializationStart,
} from './shared.actions';

export interface State {
  events: CalendarEvent[];
  selectedDate: Date;
  isLoading: boolean;
  onError: boolean;
  configs: AppConfig;
}

const initialState: State = {
  events: [],
  selectedDate: new Date(),
  isLoading: false,
  onError: false,
  configs: { version: '', production: true, apiUrl: '' },
};

export const stateReducer = createReducer(
  initialState,
  on(CreateEvent, onCreateEvent),
  on(CreateEventSuccess, onCreateEventSuccess),
  on(CreateEventFail, onCreateEventFail),
  on(UpdateSelectedDate, onSelectedDateUpdate),
  on(NextOrPrevSelectedDate, onNextOrPrevSelectedDate),
  on(ClearError, onClearError),
  on(StartLoadEvents, onStartLoadEvents),
  on(EventsLoaded, onEventsLoaded),
  on(UpdateEvent, onUpdateEvent),
  on(UpdateEventSuccess, onUpdateEventSuccess),
  on(DeleteEvent, onDeleteEvent),
  on(DeleteEventSuccess, onDeleteEventSuccess),
  on(InitializationStart, onInitializationStart),
  on(InitializationEnd, onInitializationEnd)
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

  get configs() {
    return pipe(select((s: AppState) => s.state.configs));
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
