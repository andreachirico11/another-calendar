import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeekComponent } from './week.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [WeekComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: WeekComponent }]),
  ],
})
export class WeekModule {}
