import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailsDialogData } from 'src/app/types';
import { EventDetailsComponent } from '../event-details/event-details.component';

@Component({
  selector: 'ac-event-chip',
  templateUrl: './event-chip.component.html',
  styleUrls: ['./event-chip.component.scss'],
})
export class EventChipComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const data: DetailsDialogData = { eventId: 'pippo' };
    this.dialog.open(EventDetailsComponent, { data });
  }
}
