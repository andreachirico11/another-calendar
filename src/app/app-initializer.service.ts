import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StartLoadEvents } from './reducers/event.actions';

@Injectable({
  providedIn: 'root',
})
export class AppInitializerService {
  constructor(private store: Store) {}

  Init() {
    this.store.dispatch(StartLoadEvents());
    return Promise.resolve();
  }
}
