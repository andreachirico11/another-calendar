type Values<T> = T[keyof T];

export const Routes = {
  month: 'month',
  week: 'week',
  day: 'day',
} as const;

export type RoutesType = Values<typeof Routes>;

export const RoutesArray: RoutesType[] = Object.values(Routes);

export const Days = {
  mon: 'mon',
  tue: 'tue',
  wed: 'wed',
  thu: 'thu',
  fri: 'fri',
  sat: 'sat',
  sun: 'sun',
} as const;

export type DaysType = Values<typeof Days>;

export const DaysArray: DaysType[] = Object.values(Days);

export interface DetailsDialogData {
  event: CalendarEvent;
}

export enum OperationMode {
  edit = 'edit',
  new = 'new',
}

interface CalendarEventShared {
  _id?: string;
  title: string;
  content: string;
}

export interface CalendarEvent extends CalendarEventShared {
  startDateTime: Date;
  endDateTime: Date;
}

export interface ApiCalendarEvent extends CalendarEventShared {
  startDateTime: string;
  endDateTime: string;
}

export interface FormCalendarEvent extends CalendarEventShared {
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
}

export interface AppConfig {
  version: string;
  isInProduction: boolean;
  apiUrl: string;
}
