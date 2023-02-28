import { State } from './state';
import { createAction, props } from '@ngrx/store';

export const UpdateSelectedDate = createAction('UPDATE_DATE', props<{ newDate: Date }>());

type UpdateSelectedDateType = ReturnType<typeof UpdateSelectedDate>;

export const onSelectedDateUpdate = (state: State, action: UpdateSelectedDateType): State => {
  return {
    ...state,
    selectedDate: action.newDate,
  };
};
