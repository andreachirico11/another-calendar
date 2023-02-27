import { Injectable } from '@angular/core';
import { CalendarEvent, FormCalendarEvent } from 'src/app/types';

const MINUTE_VALUES = ['00', '15', '30', 45];

const AM = 'AM',
  PM = 'PM';

const dateParser = (d: Date, hour: string) => {
  const y = d.getFullYear(),
    m = d.getMonth() + 1,
    day = d.getDate();
  const output = new Date(`${y} ${m} ${day} ${hour}`);
  return output;
};

@Injectable({
  providedIn: 'root',
})
export class DateToolsService {
  static toCalendarEvent({
    _id,
    content,
    title,
    startDate,
    startTime,
    endDate,
    endTime,
  }: FormCalendarEvent): CalendarEvent {
    return {
      _id,
      content,
      title,
      startDateTime: dateParser(startDate, startTime),
      endDateTime: dateParser(endDate, endTime),
    };
  }

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
