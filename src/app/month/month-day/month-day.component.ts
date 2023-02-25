import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

export interface ChipColor {
  name: string;
  color: ThemePalette;
}

@Component({
  selector: 'ac-month-day',
  templateUrl: './month-day.component.html',
  styleUrls: ['./month-day.component.scss'],
})
export class MonthDayComponent {
  @Input() mockNumber: number | null = null;

  availableColors: ChipColor[] = [
    { name: 'none', color: undefined },
    { name: 'Primary', color: 'primary' },
    { name: 'Accent', color: 'accent' },
    { name: 'Warn', color: 'warn' },
  ];
}
