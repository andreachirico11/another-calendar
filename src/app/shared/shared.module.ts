import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { EventChipComponent } from './event-chip/event-chip.component';

@NgModule({
  declarations: [ToolbarComponent, EventChipComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [ToolbarComponent, EventChipComponent, MaterialModule],
})
export class SharedModule {}
