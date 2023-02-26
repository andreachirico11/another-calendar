import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { EventChipComponent } from './event-chip/event-chip.component';
import { EventListComponent } from './event-list/event-list.component';

@NgModule({
  declarations: [ToolbarComponent, EventChipComponent, EventListComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [ToolbarComponent, EventChipComponent, MaterialModule, EventListComponent],
})
export class SharedModule {}
