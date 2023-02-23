import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [ToolbarComponent],
})
export class SharedModule {}
