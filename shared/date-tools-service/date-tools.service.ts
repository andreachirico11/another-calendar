import { Injectable } from '@angular/core';

const MINUTE_VALUES = ['00', '15', '30', 45];

const AM = 'AM',
  PM = 'PM';

@Injectable({
  providedIn: 'root',
})
export class DateToolsService {
  constructor() {}

  getHoursValues() {
    const hours = this.getHours();
    const hoursWithMinutes = this.addMinutes(hours);
    const output = [...this.addAmPm(hoursWithMinutes, AM), ...this.addAmPm(hoursWithMinutes, PM)];
    return output;
  }

  private getHours() {
    return Array(12)
      .fill(null)
      .map((_, i) => {
        return i === 0 ? 12 : i;
      });
  }

  private addMinutes(hours: number[]) {
    return hours.map((h) => MINUTE_VALUES.map((m) => `${h}:${m}`)).flat();
  }

  private addAmPm(hoursWithMinutes: string[], amOrPm: typeof AM | typeof PM) {
    return hoursWithMinutes.map((hm, i) => `${hm} ${amOrPm}`);
  }
}
