import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventComponent } from './event.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [EventComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: EventComponent }]),
  ],
})
export class EventModule {}
