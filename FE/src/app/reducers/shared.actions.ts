import { State } from './state';
import { createAction } from '@ngrx/store';

export const ClearError = createAction('CLEAR');

type ClearErrorType = ReturnType<typeof ClearError>;

export const onClearError = (state: State): State => {
  return {
    ...state,
    onError: false,
  };
};
