import { State } from './state';
import { createAction, props } from '@ngrx/store';
import { DateToolsService } from '../shared/date-tools-service/date-tools.service';

export const UpdateSelectedDate = createAction('UPDATE_DATE', props<{ newDate: Date }>());

type UpdateSelectedDateType = ReturnType<typeof UpdateSelectedDate>;

export const onSelectedDateUpdate = (state: State, action: UpdateSelectedDateType): State => {
  return {
    ...state,
    selectedDate: action.newDate,
  };
};

export const NextOrPrevSelectedDate = createAction(
  'NEXT_PREV_DATE',
  props<{ nexOrPrev: 'next' | 'prev' }>()
);

type NextOrPrevSelectedDateType = ReturnType<typeof NextOrPrevSelectedDate>;

export const onNextOrPrevSelectedDate = (
  state: State,
  action: NextOrPrevSelectedDateType
): State => {
  const selectedDate =
    action.nexOrPrev === 'next'
      ? DateToolsService.getTheNextMonth(state.selectedDate)
      : DateToolsService.getThePrevMonth(state.selectedDate);
  return {
    ...state,
    selectedDate,
  };
};
