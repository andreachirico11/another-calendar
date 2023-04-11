import { Injectable } from '@angular/core';
import { CalendarEvent, FormCalendarEvent } from 'src/app/types';

const MINUTE_VALUES = ['00', '15', '30', '45'];

const MINUTE_INTERVALS = MINUTE_VALUES.map((value, i) => {
  const valueNum: number = Number(value);
  return {
    lowerLimit: valueNum,
    upperLimit: Number(i === MINUTE_VALUES.length - 1 ? 60 : MINUTE_VALUES[i + 1]),
  };
});

const AM = 'AM',
  PM = 'PM';

const WEEK_DAYS = 7;

const HOURS_SLOTS = 24;

const FIRST_DAY_OF_THE_WEEK = 1; // monday

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
    let base = _id ? { _id } : {};
    return {
      ...base,
      content,
      title,
      startDateTime: dateParser(startDate, startTime),
      endDateTime: dateParser(endDate, endTime),
    };
  }

  static isInRange(e: CalendarEvent, startDate: Date, endDate: Date) {
    const { startDateTime, endDateTime } = e;
    const startEvent = startDateTime.getTime(),
      endEvent = endDateTime.getTime();
    const rangeStart = startDate.getTime(),
      rangeEnd = endDate.getTime();
    return (
      (rangeStart <= startEvent && startEvent < rangeEnd) ||
      (rangeStart <= endEvent && endEvent < rangeEnd) ||
      (startEvent <= rangeStart && rangeEnd < endEvent)
    );
  }

  static getTheNextMonth(d: Date) {
    return new Date(d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes());
  }

  static getThePrevMonth(d: Date) {
    return new Date(d.getFullYear(), d.getMonth() - 1, d.getDate(), d.getHours(), d.getMinutes());
  }

  get weekDays() {
    const firstD = this.getFirstDayOfTheWeek(new Date());
    return Array(WEEK_DAYS)
      .fill('')
      .map((_, i) => new Date(new Date().setDate(firstD.getDate() + i)));
  }

  constructor() {}

  getTheNextDay(d: Date) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1, d.getHours(), d.getMinutes());
  }

  getThePrevDay(d: Date) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1, d.getHours(), d.getMinutes());
  }

  getHoursValues() {
    const hours = this.getHours();
    const hoursWithMinutes = this.addMinutes(hours);
    const output = [...this.addAmPm(hoursWithMinutes, AM), ...this.addAmPm(hoursWithMinutes, PM)];
    return output;
  }

  getDayHoursArray(date: Date): Date[] {
    let actualHour = 0;
    const output = [];
    while (actualHour < 24) {
      const newD = new Date(date.toISOString());
      newD.setHours(actualHour, 0, 0, 0);
      output.push(newD);
      actualHour++;
    }
    return output;
  }

  getWeekAroundDate(d: Date) {
    // because of code misunderstandings let's put sunday at 7
    const dateDay = d.getDay() === 0 ? 7 : d.getDay();
    return Array(7)
      .fill(null)
      .map((_, i) => {
        const newD = new Date(d.toISOString()),
          weekDayNum = i + 1;
        let difference = 0;
        if (weekDayNum > dateDay) {
          difference = weekDayNum - dateDay;
        } else if (weekDayNum < dateDay) {
          difference = -(dateDay - weekDayNum);
        }
        return new Date(newD.setDate(d.getDate() + difference));
      });
  }

  getFirstDayOfTheWeek(d: Date) {
    const clone = new Date(d.toISOString());
    return new Date(clone.setDate(clone.getDate() - (clone.getDay() - FIRST_DAY_OF_THE_WEEK)));
  }

  mergeDayAndHour(dayDate: Date, hour: Date) {
    const newD = new Date(dayDate.toISOString());
    newD.setHours(hour.getHours());
    newD.setMinutes(hour.getMinutes());
    return newD;
  }

  getSquaredMonthFromDate(d: Date) {
    let actualMonthDates = this.getAllDaysInAMonth(d);
    let differenceToSquare = WEEK_DAYS * 5 - actualMonthDates.length;
    while (differenceToSquare > 0) {
      if (actualMonthDates[0].getDay() === 1) {
        break;
      }
      actualMonthDates = [this.getThePrevDay(actualMonthDates[0]), ...actualMonthDates];
      differenceToSquare--;
    }
    if (differenceToSquare > 0) {
      while (differenceToSquare > 0) {
        const last = actualMonthDates[actualMonthDates.length - 1];
        actualMonthDates = [...actualMonthDates, this.getTheNextDay(last)];
        differenceToSquare--;
      }
    }
    return actualMonthDates;
  }

  getAllDaysInAMonth(d: Date) {
    const refMonth = d.getMonth();
    const referenceDate = new Date(d.getFullYear(), refMonth, 1);
    const output: Date[] = [];
    while (referenceDate.getMonth() === refMonth) {
      output.push(new Date(referenceDate));
      referenceDate.setDate(referenceDate.getDate() + 1);
    }
    return output;
  }

  getAmPmHour(d: Date) {
    const hour = d.getHours(),
      minutes = d.getMinutes(),
      amOrPm = hour > 12 ? PM : AM;
    let stringHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    let parsedMinutes = this.minuteParser(minutes);
    if (parsedMinutes === 60) {
      parsedMinutes = 0;
      stringHour++;
    }
    return `${stringHour}:${this.padWithZero(parsedMinutes)} ${amOrPm}`;
  }

  private minuteParser(minutes: number) {
    const interval = MINUTE_INTERVALS.find(
      ({ lowerLimit, upperLimit }) => lowerLimit <= minutes && minutes < upperLimit
    )!;
    const lowerDifference = minutes - interval.lowerLimit,
      upperDifference = interval?.upperLimit - minutes;
    return lowerDifference < upperDifference ? interval.lowerLimit : interval.upperLimit;
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

  private padWithZero(num: number) {
    const str = num.toString();
    return str.length > 1 ? str : '0' + str;
  }
}
