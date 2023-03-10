import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ac-error-dialog',
  template: `
    <div class="error-overlay">
      <mat-card>
        <h1>There was an Error</h1>
        <button mat-raised-button (click)="dialogRef.close()">Ok</button>
      </mat-card>
    </div>
  `,
  styles: [
    `
      div mat-card {
        width: 400px;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      div mat-card button {
        width: 5em;
      }
    `,
  ],
})
export class ErrorDialogComponent {
  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>) {}
}
