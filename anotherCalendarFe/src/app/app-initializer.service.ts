import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { InitializationStart } from './reducers/shared.actions';

@Injectable({
  providedIn: 'root',
})
export class AppInitializerService {
  constructor(private store: Store, private http: HttpClient) {}

  async Init() {
    const apiUrl = await this.getApiUrl();
    this.store.dispatch(InitializationStart(apiUrl));
    return Promise.resolve();
  }

  private getApiUrl() {
    return firstValueFrom(this.http.get<{ apiUrl: string }>('/assets/apiUrl.json'));
  }
}
