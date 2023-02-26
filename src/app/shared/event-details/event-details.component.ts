import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DetailsDialogData } from 'src/app/types';

@Component({
  selector: 'ac-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DetailsDialogData,
    private router: Router,
    private dialogRef: MatDialogRef<EventDetailsComponent>
  ) {}

  onEdit() {
    this.router.navigate(['/event/edit'], { state: { eventId: 'pizza' } }).finally(() => {
      this.dialogRef.close();
    });
  }
}
