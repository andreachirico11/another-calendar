import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from './reducers';
import { UpdateSelectedDate } from './reducers/selectedDate-actions';
import { ClearError } from './reducers/shared.actions';
import { StateSelectors } from './reducers/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  drawerOpened = false;
  drawerMode: MatDrawerMode = 'over';

  selected!: Observable<Date | null>;
  appIsLoading!: Observable<boolean>;

  errorSub!: Subscription;

  constructor(private store: Store<AppState>) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setupDrawer(window.innerWidth);
  }

  ngOnInit() {
    this.selected = this.store.pipe(StateSelectors.actualSelectedDate);
    this.appIsLoading = this.store.pipe(StateSelectors.isLoading);
    this.errorSub = this.store.pipe(StateSelectors.isOnError).subscribe((isAppOnError) => {
      this.onErr(isAppOnError);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setupDrawer(window.innerWidth);
    }, 100);
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  onToggled() {
    if (this.drawerMode === 'over') {
      this.drawerOpened = !this.drawerOpened;
    }
  }

  onSelectedDateChange(newDate: Date) {
    this.store.dispatch(UpdateSelectedDate({ newDate }));
  }

  onErr(on: boolean) {
    if (on) {
      alert('there was an error');
      this.store.dispatch(ClearError());
    }
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
