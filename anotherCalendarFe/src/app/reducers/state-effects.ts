import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../shared/data/data.service';
import {
  CreateEvent,
  CreateEventFail,
  CreateEventSuccess,
  CreateEventType,
  DeleteEvent,
  DeleteEventSuccess,
  DeleteEventType,
  EventsLoaded,
  StartLoadEvents,
  UpdateEvent,
  UpdateEventSuccess,
  UpdateEventType,
} from './event.actions';
import { catchError, concatMap, map, of, tap, withLatestFrom } from 'rxjs';
import { DateToolsService } from '../shared/date-tools-service/date-tools.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '.';
import { StateSelectors } from './state';

@Injectable()
export class StateEffects {
  initialLoadEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StartLoadEvents),
      concatMap(() => {
        return this.data.allEvents();
      }),
      map((events) => EventsLoaded({ events }))
    );
  });

  createEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CreateEvent),
      withLatestFrom(this.store.pipe(StateSelectors.configs)),
      concatMap(([{ newEvent }, { apiUrl }]) => {
        const parsed = DateToolsService.toCalendarEvent(newEvent);
        return this.data.createEvent(parsed, apiUrl);
      }),
      map((eventCreated) => CreateEventSuccess({ eventCreated })),
      catchError((_) => of(CreateEventFail()))
    );
  });

  updateEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UpdateEvent),
      concatMap(({ updatedEvent }: UpdateEventType) => {
        const parsed = DateToolsService.toCalendarEvent(updatedEvent);
        return this.data.updateEvent(parsed);
      }),
      map((eventUpdated) => UpdateEventSuccess({ eventUpdated })),
      tap(() => {
        this.router.navigate(['/']);
      }),
      catchError((_) => of(CreateEventFail()))
    );
  });

  deleteEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeleteEvent),
      concatMap(({ eventId }: DeleteEventType) => this.data.deleteEvent(eventId)),
      map((eventId) => DeleteEventSuccess({ eventId })),
      tap(() => {
        this.router.navigate(['/']);
      }),
      catchError((_) => of(CreateEventFail()))
    );
  });

  constructor(
    private actions$: Actions,
    private data: DataService,
    private router: Router,
    private store: Store<AppState>
  ) {}
}
