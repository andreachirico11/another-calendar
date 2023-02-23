type Values<T> = T[keyof T];

export const Routes = {
  month: 'month',
  week: 'week',
  day: 'day',
} as const;

export type RoutesType = Values<typeof Routes>;

export const RoutesArray: RoutesType[] = Object.values(Routes);
