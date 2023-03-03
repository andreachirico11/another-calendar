import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonthComponent } from './month.component';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [MonthComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: MonthComponent }]),
  ],
})
export class MonthModule {}
