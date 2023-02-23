import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Routes, RoutesArray, RoutesType } from '../../types';

@Component({
  selector: 'ac-nav',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  selectedRoute: RoutesType = Routes.month;
  routes: RoutesType[] = RoutesArray;

  constructor(private router: Router) {}

  onChange(e: RoutesType) {
    this.selectedRoute = e;
    this.router.navigate([this.selectedRoute]);
  }
}
