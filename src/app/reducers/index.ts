import { ActionReducerMap } from '@ngrx/store';
import { State, stateReducer } from './state';

export interface AppState {
  state: State;
}

const reducers: ActionReducerMap<AppState> = {
  state: stateReducer,
};

export default reducers;
