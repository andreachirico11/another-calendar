import { createAction, createReducer, on, props, select } from '@ngrx/store';
import { map, pipe } from 'rxjs';
import { AppState } from '.';
import { DateToolsService } from '../shared/date-tools-service/date-tools.service';
import { CalendarEvent, FormCalendarEvent } from '../types';

export interface State {
  events: CalendarEvent[];
  selectedDate: Date;
}

const initialState: State = {
  events: [],
  selectedDate: new Date(),
};

// CREATE EVENT

export const CreateEvent = createAction('CREATE_EVENT', props<{ newEvent: FormCalendarEvent }>());

type CreateEventType = ReturnType<typeof CreateEvent>;

const onCreateEvent = (state: State, action: CreateEventType): State => {
  const parsed = DateToolsService.toCalendarEvent(action.newEvent);
  return {
    ...state,
    events: [...state.events, parsed],
  };
};

// UPDATE SELECTED DATE

export const UpdateSelectedDate = createAction('UPDATE_DATE', props<{ newDate: Date }>());

type UpdateSelectedDateType = ReturnType<typeof UpdateSelectedDate>;

const onSelectedDateUpdate = (state: State, action: UpdateSelectedDateType): State => {
  return {
    ...state,
    selectedDate: action.newDate,
  };
};

// REDUCER

export const stateReducer = createReducer(
  initialState,
  on(CreateEvent, onCreateEvent),
  on(UpdateSelectedDate, onSelectedDateUpdate)
);

export const StateSelectors = {
  get simpleSel() {
    return pipe(select((s: AppState) => s.state.events));
  },

  get actualSelectedDate() {
    return pipe(select((s: AppState) => s.state.selectedDate));
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
