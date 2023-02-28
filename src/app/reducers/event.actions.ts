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

export const UpdateEvent = createAction(
  'UPDATE_EVENT',
  props<{ updatedEvent: FormCalendarEvent }>()
);

export type UpdateEventType = ReturnType<typeof UpdateEvent>;

export const onUpdateEvent = (state: State): State => {
  return {
    ...state,
    isLoading: true,
  };
};

export const UpdateEventSuccess = createAction(
  'UPDATE_EVENT_SUCCESS',
  props<{ eventUpdated: CalendarEvent }>()
);

export type UpdateEventSuccessType = ReturnType<typeof UpdateEventSuccess>;

export const onUpdateEventSuccess = (state: State, action: UpdateEventSuccessType): State => {
  const index = state.events.findIndex((ev) => ev._id === action.eventUpdated._id);
  const events = [
    ...state.events.slice(0, index),
    { ...action.eventUpdated },
    ...state.events.slice(index + 1),
  ];
  return { ...state, isLoading: false, events };
};

export const DeleteEvent = createAction('DELETE_EVENT', props<{ eventId: string }>());

export type DeleteEventType = ReturnType<typeof DeleteEvent>;

export const onDeleteEvent = (state: State): State => {
  return {
    ...state,
    isLoading: true,
  };
};

export const DeleteEventSuccess = createAction(
  'DELETE_EVENT_SUCCESS',
  props<{ eventId: string }>()
);

export type DeleteEventSuccessType = ReturnType<typeof DeleteEventSuccess>;

export const onDeleteEventSuccess = (state: State, action: DeleteEventSuccessType): State => {
  return {
    ...state,
    isLoading: false,
    events: state.events.filter((e) => e._id !== action.eventId),
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

export const StartLoadEvents = createAction('START_LOAD');

export type StartLoadEventsType = ReturnType<typeof StartLoadEvents>;

export const onStartLoadEvents = (state: State): State => {
  return {
    ...state,
    isLoading: true,
  };
};

export const EventsLoaded = createAction('EVENTS_LOADED', props<{ events: CalendarEvent[] }>());

export type EventsLoadedType = ReturnType<typeof EventsLoaded>;

export const onEventsLoaded = (state: State, action: EventsLoadedType): State => {
  return {
    ...state,
    isLoading: false,
    events: [...action.events],
  };
};
