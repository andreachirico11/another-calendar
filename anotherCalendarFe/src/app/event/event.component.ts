import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DateToolsService } from 'src/app/shared/date-tools-service/date-tools.service';
import { AppState } from '../reducers';
import { CreateEvent, UpdateEvent } from '../reducers/event.actions';
import { CalendarEvent, OperationMode } from '../types';

@Component({
  selector: 'ac-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  form: FormGroup;
  hoursValues: string[];

  private _mode: OperationMode;
  private _eventToUpdate: CalendarEvent;

  get editMode() {
    return this._mode === OperationMode.edit;
  }

  get newMode() {
    return this._mode === OperationMode.new;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dateTools: DateToolsService,
    private location: Location,
    private store: Store<AppState>
  ) {
    this._mode = this.route.snapshot.data['mode'];
    this._eventToUpdate = this.newMode
      ? null
      : this.router.getCurrentNavigation()!.extras!.state!['event'];
    const { startDate, endDate } = this.route.snapshot.queryParams;
    this.form = this.createForm(startDate, endDate);
    this.hoursValues = this.dateTools.getHoursValues();
  }

  ngOnInit() {
    if (this.editMode && this._eventToUpdate) {
      this.prefillForm();
    }
  }

  back() {
    this.location.back();
  }

  onSubmit() {
    if (this.newMode) {
      this.store.dispatch(CreateEvent({ newEvent: this.form.value }));
      setTimeout(() => {
        this.back();
      }, 100);
    }
    if (this.editMode) {
      this.store.dispatch(UpdateEvent({ updatedEvent: this.form.value }));
    }
  }

  private createForm(startDate?: string, endDate?: string) {
    return this.fb.group({
      title: this.fb.control(null, [Validators.required]),
      startDate: this.fb.control(startDate ? new Date(startDate) : null, [Validators.required]),
      startTime: this.fb.control(null, [Validators.required]),
      endDate: this.fb.control(endDate ? new Date(endDate) : null, [Validators.required]),
      endTime: this.fb.control(null, [Validators.required]),
      content: this.fb.control(null, [Validators.required]),
      _id: this.fb.control(null),
    });
  }

  private prefillForm() {
    const { _id, title, content, startDateTime, endDateTime } = this._eventToUpdate;
    const startTime = this.dateTools.getAmPmHour(startDateTime),
      endTime = this.dateTools.getAmPmHour(endDateTime);
    this.form.setValue({
      _id,
      title,
      startDate: startDateTime,
      endDate: endDateTime,
      startTime,
      endTime,
      content,
    });
  }
}
