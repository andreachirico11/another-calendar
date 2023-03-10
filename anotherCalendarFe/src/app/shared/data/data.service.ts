import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, firstValueFrom, map, of, tap, throwError } from 'rxjs';
import { AppConfig, CalendarEvent } from 'src/app/types';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  allEvents() {
    return this.http.get<CalendarEvent[]>('/assets/MOCK_DATA.json').pipe(
      map((rawObjects) =>
        rawObjects.map((rawOb) => ({
          ...rawOb,
          startDateTime: new Date(rawOb.startDateTime),
          endDateTime: new Date(rawOb.endDateTime),
        }))
      ),
      delay(2000)
    );
  }

  createEvent(e: CalendarEvent) {
    if (e.title === 'error') {
      return throwError(() => new Error());
    }
    const updated: CalendarEvent = { ...e, _id: randomId() };
    return of(updated).pipe(delay(1000));
  }

  updateEvent(e: CalendarEvent) {
    return of(e).pipe(delay(1000));
  }

  deleteEvent(id: string) {
    return of(id).pipe(delay(1000));
  }

  getAppConfig(url: string) {
    return this.http.get<AppConfig & { _id: string }>(url + '/appConfig').pipe(
      map((value) => {
        const { _id, ...otherProps } = value;
        return otherProps as AppConfig;
      })
    );
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
