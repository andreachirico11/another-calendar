import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Routes, RoutesArray, RoutesType } from '../../types';

function isNav(e: any): e is NavigationEnd {
  return e instanceof NavigationEnd;
}

@Component({
  selector: 'ac-nav',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnDestroy {
  selectedRoute: RoutesType = Routes.month;
  routes: RoutesType[] = RoutesArray;

  private sub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.sub = this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.selectedRoute = this.routes.find((route) => {
          const r = new RegExp(route);
          return r.test(e.url);
        })!;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onChange(e: RoutesType) {
    this.selectedRoute = e;
    this.router.navigate([this.selectedRoute]);
  }
}
