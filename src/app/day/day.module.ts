import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DayComponent } from './day.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DayComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: DayComponent }]),
  ],
})
export class DayModule {}
