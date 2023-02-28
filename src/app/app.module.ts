import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeekModule } from './week/week.module';
import { DayModule } from './day/day.module';
import { MonthModule } from './month/month.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material.module';
import reducers from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { StateEffects } from './reducers/state-effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([StateEffects]),
    BrowserAnimationsModule,
    WeekModule,
    DayModule,
    MonthModule,
    FormsModule,
    SharedModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
