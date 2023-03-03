import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from './reducers';
import { UpdateSelectedDate } from './reducers/selectedDate-actions';
import { ClearError } from './reducers/shared.actions';
import { StateSelectors } from './reducers/state';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './shared/error-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
  drawerOpened = false;
  drawerMode: MatDrawerMode = 'over';

  selected!: Observable<Date | null>;
  appIsLoading!: Observable<boolean>;
  errorSub!: Subscription;

  constructor(private store: Store<AppState>, public dialog: MatDialog, public elR: ElementRef) {}

  ngOnInit() {
    this.selected = this.store.pipe(StateSelectors.actualSelectedDate);
    this.appIsLoading = this.store.pipe(StateSelectors.isLoading);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setupDrawer(this.elR.nativeElement.offsetWidth);
      this.errorSub = this.store.pipe(StateSelectors.isOnError).subscribe((isOn) => {
        if (isOn) {
          this.appIsOnError();
        }
      });
    }, 100);
  }

  onToggled() {
    if (this.drawerMode === 'over') {
      this.drawerOpened = !this.drawerOpened;
    }
  }

  onSelectedDateChange(newDate: Date) {
    this.store.dispatch(UpdateSelectedDate({ newDate }));
  }

  appIsOnError() {
    const ref = this.dialog
      .open(ErrorDialogComponent)
      .afterClosed()
      .subscribe(() => {
        ref.unsubscribe();
        this.store.dispatch(ClearError());
      });
  }

  private setupDrawer(innerWidth: number) {
    if (innerWidth < 1000) {
      this.drawerMode = 'over';
      this.drawerOpened = false;
    } else {
      this.drawerMode = 'side';
      this.drawerOpened = true;
    }
  }
}
