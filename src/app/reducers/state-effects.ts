import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../shared/data/data.service';
import { CreateEvent, CreateEventFail, CreateEventSuccess, CreateEventType } from './event.actions';
import { catchError, concatMap, map, of } from 'rxjs';
import { DateToolsService } from '../shared/date-tools-service/date-tools.service';

@Injectable()
export class StateEffects {
  createEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CreateEvent),
      concatMap(({ newEvent }: CreateEventType) => {
        console.log('effect');

        const parsed = DateToolsService.toCalendarEvent(newEvent);
        return this.data.createEvent(parsed);
      }),
      map((eventCreated) => CreateEventSuccess({ eventCreated })),
      catchError((_) => of(CreateEventFail()))
    );
  });

  constructor(private actions$: Actions, private data: DataService) {}
}
