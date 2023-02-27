import { ActionReducerMap } from '@ngrx/store';
import { EventsState, eventsReducer } from './events';

export interface AppState {
  events: EventsState;
}

const reducers: ActionReducerMap<{ events: EventsState }> = {
  events: eventsReducer,
};

export default reducers;
