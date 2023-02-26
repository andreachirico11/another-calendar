import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DateToolsService } from 'shared/date-tools-service/date-tools.service';
import { OperationMode } from '../types';

@Component({
  selector: 'ac-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  form: FormGroup;
  hoursValues: string[];

  private _mode: OperationMode;
  private _eventId: string;

  get editMode() {
    return this._mode === OperationMode.edit;
  }

  get newMode() {
    return this._mode === OperationMode.new;
  }

  // FORMAT TO THIS
  // 2025-11-11 12:15 AM

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dateTools: DateToolsService
  ) {
    this._mode = this.route.snapshot.data['mode'];
    this._eventId = this.newMode
      ? null
      : this.router.getCurrentNavigation()!.extras!.state!['eventId'];
    this.form = this.createForm();
    this.hoursValues = this.dateTools.getHoursValues();
  }

  ngOnInit() {
    if (this.editMode && this._eventId) {
      this.prefillForm();
    }
  }

  private createForm() {
    return this.fb.group({
      title: this.fb.control(null),
      startDate: this.fb.control(null),
      startTime: this.fb.control(null),
      endDate: this.fb.control(null),
      endTime: this.fb.control(null),
      content: this.fb.control(null),
    });
  }

  private prefillForm() {
    this.form.setValue({
      title: 'Mega Event',
      startDate: new Date('2004-11-11'),
      endDate: new Date('2009-12-12'),
      startTime: '12:15 AM',
      endTime: '1:30 PM',
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, iste ipsam qui at facere dignissimos expedita recusandae provident quos quidem, facilis omnis suscipit. Nam, facere rem? Accusantium animi consectetur, fugit eos architecto eius corporis officiis neque aut voluptatibus consequatur sapiente at excepturi quidem doloribus explicabo accusamus, autem debitis rerum! Distinctio recusandae cupiditate nobis, facere ab maxime eius assumenda quam provident expedita maiores placeat illo deserunt ipsa magnam corrupti, asperiores corporis delectus ratione aperiam. Maxime animi saepe atque blanditiis tempore, ea placeat inventore ipsam iusto accusantium earum fugit quo est, consectetur veniam non voluptatum in itaque necessitatibus molestiae recusandae? Amet, aspernatur?"`,
    });
  }
}
