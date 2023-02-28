import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { NextOrPrevSelectedDate } from 'src/app/reducers/selectedDate-actions';
import { StateSelectors } from 'src/app/reducers/state';
import { Routes, RoutesArray, RoutesType } from '../../types';

@Component({
  selector: 'ac-nav',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnDestroy {
  selectedRoute: RoutesType = Routes.month;
  selectedDate: Observable<Date>;
  dateFormat: 'MMMM YYYY' | 'mediumDate' = 'MMMM YYYY';
  routes: RoutesType[] = RoutesArray;
  @Input() disabledButton = false;

  get showSelect() {
    return this.routes.includes(this.selectedRoute);
  }

  private sub: Subscription;

  @Output() toggledMenu = new EventEmitter<null>();

  constructor(private router: Router, private store: Store<AppState>) {
    this.selectedDate = this.store.pipe(StateSelectors.actualSelectedDate);
    this.sub = this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.onNavigationEnd(e);
      }
    });
  }

  goHome() {
    this.router.navigate([Routes.month]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onChange(e: RoutesType) {
    this.selectedRoute = e;
    this.router.navigate([this.selectedRoute]);
  }

  onArrowClick(nexOrPrev: 'prev' | 'next', e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.store.dispatch(NextOrPrevSelectedDate({ nexOrPrev }));
  }

  private onNavigationEnd(e: NavigationEnd) {
    this.selectedRoute = this.routes.find((route) => {
      const r = new RegExp(route);
      return r.test(e.url) || r.test(e.urlAfterRedirects);
    })!;
    this.dateFormat = this.selectedRoute === Routes.day ? 'mediumDate' : 'MMMM YYYY';
  }
}
