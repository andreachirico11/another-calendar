import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthComponent } from './month.component';
import { RouterModule } from '@angular/router';

import { MatGridListModule } from '@angular/material/grid-list';
import { MonthDayComponent } from './month-day/month-day.component';

@NgModule({
  declarations: [MonthComponent, MonthDayComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    RouterModule.forChild([{ path: '', component: MonthComponent }]),
  ],
})
export class MonthModule {}
