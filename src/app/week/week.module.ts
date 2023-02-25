import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeekComponent } from './week.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [WeekComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: WeekComponent }]),
  ],
})
export class WeekModule {}
