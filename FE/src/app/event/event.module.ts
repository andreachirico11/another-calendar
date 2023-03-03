import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventComponent } from './event.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { OperationMode } from '../types';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EventComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'new', component: EventComponent, data: { mode: OperationMode.new } },
      { path: 'edit', component: EventComponent, data: { mode: OperationMode.edit } },
      { path: '', redirectTo: 'new', pathMatch: 'full' },
    ]),
  ],
})
export class EventModule {}
