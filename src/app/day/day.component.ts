import { Component } from '@angular/core';

@Component({
  selector: 'ac-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent {
  mockHours = Array(7 * 24).fill('');
  mockHoursSlots = Array(23).fill('');

  getHourLabel(i: number) {
    i = i + 1;
    const amPm = i < 12 ? 'am' : 'pm';
    i = i < 13 ? i : i - 12;
    return `${i} ${amPm}`;
  }
}
