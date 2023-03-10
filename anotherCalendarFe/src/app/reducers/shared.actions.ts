import { State } from './state';
import { createAction, props } from '@ngrx/store';
import { AppConfig } from '../types';

export const ClearError = createAction('CLEAR');

type ClearErrorType = ReturnType<typeof ClearError>;

export const onClearError = (state: State): State => {
  return {
    ...state,
    onError: false,
  };
};

export const InitializationStart = createAction(
  'APP_INITIALIZATION_START',
  props<{ apiUrl: string }>()
);

export type InitializationStartType = ReturnType<typeof InitializationStart>;

export const onInitializationStart = (state: State, { apiUrl }: InitializationStartType): State => {
  return {
    ...state,
    isLoading: true,
    configs: { ...state.configs, apiUrl },
  };
};

export const InitializationEnd = createAction(
  'APP_INITIALIZATION_END',
  props<{ configs: AppConfig }>()
);

export type InitializationEndType = ReturnType<typeof InitializationEnd>;

export const onInitializationEnd = (state: State, { configs }: InitializationEndType): State => {
  return {
    ...state,
    isLoading: false,
    configs: { ...state.configs, ...configs },
  };
};
