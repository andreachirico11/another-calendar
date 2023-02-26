import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DayComponent } from './day.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [DayComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: DayComponent }]),
  ],
})
export class DayModule {}
