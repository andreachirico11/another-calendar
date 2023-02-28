import { Injectable } from '@angular/core';
import { delay, of, throwError } from 'rxjs';
import { CalendarEvent } from 'src/app/types';

const MOCK_DB: CalendarEvent[] = [];

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  createEvent(e: CalendarEvent) {
    if ((e.title = 'error')) {
      return throwError(() => new Error());
    }
    const updated: CalendarEvent = { ...e, _id: randomId() };
    MOCK_DB.push(updated);
    return of(updated).pipe(delay(1000));
  }
}

function randomId() {
  let group = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return (
    group() +
    group() +
    '-' +
    group() +
    '-' +
    group() +
    '-' +
    group() +
    '-' +
    group() +
    group() +
    group()
  );
}
