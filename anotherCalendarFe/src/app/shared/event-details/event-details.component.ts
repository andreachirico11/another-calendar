import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { DeleteEvent } from 'src/app/reducers/event.actions';
import { StateSelectors } from 'src/app/reducers/state';
import { DetailsDialogData } from 'src/app/types';

@Component({
  selector: 'ac-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnDestroy {
  private sub!: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DetailsDialogData,
    private router: Router,
    private dialogRef: MatDialogRef<EventDetailsComponent>,
    private store: Store<AppState>
  ) {}

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onEdit() {
    this.router.navigate(['/event/edit'], { state: { event: this.data.event } }).finally(() => {
      this.dialogRef.close();
    });
  }

  onDelete() {
    this.store.dispatch(DeleteEvent({ eventId: this.data.event._id! }));
    this.sub = this.store.pipe(StateSelectors.isLoading).subscribe((isLoading) => {
      if (!isLoading) {
        this.dialogRef.close();
      }
    });
  }
}
