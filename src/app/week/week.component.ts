import { Component } from '@angular/core';

@Component({
  selector: 'ac-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
})
export class WeekComponent {
  mockHours = Array(7 * 24).fill('');
  mockHoursSlots = Array(23).fill('');

  getHourLabel(i: number) {
    i = i + 1;
    const amPm = i < 12 ? 'am' : 'pm';
    i = i < 13 ? i : i - 12;
    return `${i} ${amPm}`;
  }
}
