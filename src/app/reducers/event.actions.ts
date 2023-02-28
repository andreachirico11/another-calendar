import { createAction, props } from '@ngrx/store';
import { CalendarEvent, FormCalendarEvent } from '../types';
import { State } from './state';

export const CreateEvent = createAction('CREATE_EVENT', props<{ newEvent: FormCalendarEvent }>());

export type CreateEventType = ReturnType<typeof CreateEvent>;

export const onCreateEvent = (state: State, action: CreateEventType): State => {
  return {
    ...state,
    isLoading: true,
  };
};

export const CreateEventSuccess = createAction(
  'CREATE_EVENT_SUCCESS',
  props<{ eventCreated: CalendarEvent }>()
);

export type CreateEventSuccessType = ReturnType<typeof CreateEventSuccess>;

export const onCreateEventSuccess = (state: State, action: CreateEventSuccessType): State => {
  return {
    ...state,
    isLoading: false,
    events: [...state.events, action.eventCreated],
  };
};

export const CreateEventFail = createAction('CREATE_EVENT_FAIL');

export type CreateEventFailType = ReturnType<typeof CreateEventFail>;

export const onCreateEventFail = (state: State): State => {
  return {
    ...state,
    isLoading: false,
    onError: true,
  };
};
