import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'month',
    loadChildren: () => import('./month/month.module').then((m) => m.MonthModule),
  },
  {
    path: 'week',
    loadChildren: () => import('./week/week.module').then((m) => m.WeekModule),
  },
  { path: 'day', loadChildren: () => import('./day/ac-day.module').then((m) => m.DayModule) },
  {
    path: '',
    redirectTo: 'month',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
