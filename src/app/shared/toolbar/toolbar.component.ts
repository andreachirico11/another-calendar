import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Routes, RoutesArray, RoutesType } from '../../types';

@Component({
  selector: 'ac-nav',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnDestroy {
  selectedRoute: RoutesType = Routes.month;
  routes: RoutesType[] = RoutesArray;
  @Input() disabledButton = false;

  get showSelect() {
    return this.routes.includes(this.selectedRoute);
  }

  private sub: Subscription;

  @Output() toggledMenu = new EventEmitter<null>();

  constructor(private router: Router) {
    this.sub = this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.selectedRoute = this.routes.find((route) => {
          const r = new RegExp(route);
          return r.test(e.url);
        })!;
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
}
