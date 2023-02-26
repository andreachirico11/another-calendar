import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthComponent } from './month.component';
import { RouterModule } from '@angular/router';

import { MonthDayComponent } from './month-day/month-day.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [MonthComponent, MonthDayComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: MonthComponent }]),
  ],
})
export class MonthModule {}
