import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../shared/data/data.service';
import { concatMap, map } from 'rxjs';
import { Router } from '@angular/router';
import { InitializationEnd, InitializationStart } from './shared.actions';

@Injectable()
export class SharedEffects {
  initializationStartEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InitializationStart),
      concatMap(({ apiUrl }) => {
        return this.data.getAppConfig(apiUrl);
      }),
      map((configs) => InitializationEnd({ configs }))
    );
  });

  constructor(private actions$: Actions, private data: DataService, private router: Router) {}
}
