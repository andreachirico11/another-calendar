import { createAction, createReducer, on, props } from '@ngrx/store';
import { DateToolsService } from '../shared/date-tools-service/date-tools.service';
import { CalendarEvent, FormCalendarEvent } from '../types';

export const eventsStateKey = 'appState';

export interface EventsState {
  events: CalendarEvent[];
}

const initialState: EventsState = {
  events: [],
};

export const CreateEvent = createAction('CREATE_EVENT', props<{ newEvent: FormCalendarEvent }>());

type CreateEventType = ReturnType<typeof CreateEvent>;

const onCreateEvent = (state: EventsState, action: CreateEventType) => {
  const parsed = DateToolsService.toCalendarEvent(action.newEvent);
  const updatedState: EventsState = { events: [...state.events, parsed] };
  return updatedState;
};

export const eventsReducer = createReducer(initialState, on(CreateEvent, onCreateEvent));
