import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { catchError, Observable, of, take } from 'rxjs';
import { CalendarEvent } from '../../calendar-event';
import { CalendarService } from '../../calendar.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnDestroy {

  _selectedDate!: moment.Moment;
  get selectedDate(): moment.Moment {
    return this._selectedDate;
  }
  @Input() set selectedDate(date: moment.Moment) {
    this._selectedDate = date;
    this.date?.setValue(moment(this.selectedDate).format("dddd, MMMM Do YYYY"));
  }

  event$!: Observable<CalendarEvent | undefined>;
  editing: boolean = false;

  _id!: number;
  get id(): number {
    return this._id;
  }
  @Input() set id(num: number) {
    this._id = num;
    if (this._id < 0) {
      return;
    }
    this.editing = true;
    this.calendarService.selectEvent(num);
    this.event$ = this.calendarService.event$;
    this.fillForm();
  }

  @Output() saved: EventEmitter<any> = new EventEmitter();

  fillForm(): void {
    this.event$.pipe(
      take(1)
    ).subscribe(res => {
      this.date?.setValue(moment(res?.date).format("dddd, MMMM Do YYYY"));
      this.allDay?.setValue(!res?.allDay);
      this.toggleAllDay();
      this.allDay?.setValue(res?.allDay);
      this.startTime?.setValue(res?.startTime);
      this.endTime?.setValue(res?.endTime);
      this.name?.setValue(res?.name);
      this.details?.setValue(res?.details);
    });
  }


  eventForm!: FormGroup;

  constructor(private calendarService: CalendarService) {
    this.eventForm = new FormGroup({
      'date': new FormControl('', Validators.required),
      'allDay': new FormControl(''),
      'startTime': new FormControl('', Validators.required),
      'endTime': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'details': new FormControl('', Validators.required)
    })
  }

  ngOnDestroy(): void {
    this.saved.complete();
  }

  get date() {
    return this.eventForm.get('date');
  }
  get allDay() {
    return this.eventForm.get('allDay');
  }
  get startTime() {
    return this.eventForm.get('startTime');
  }
  get endTime() {
    return this.eventForm.get('endTime');
  }
  get name() {
    return this.eventForm.get('name');
  }
  get details() {
    return this.eventForm.get('details');
  }

  dateSelected(value: moment.Moment) {
    this.selectedDate = value;
    this.date?.setValue(moment(value).format("dddd, MMMM Do YYYY"));
  }

  toggleAllDay() {
    if (!this.allDay?.value) {
      this.startTime?.clearValidators();
      this.startTime?.updateValueAndValidity();
      this.endTime?.clearValidators();
      this.endTime?.updateValueAndValidity();
    } else {
      this.startTime?.addValidators(Validators.required);
      this.startTime?.updateValueAndValidity();
      this.endTime?.addValidators(Validators.required);
      this.endTime?.updateValueAndValidity();
    }
  }

  addEvent() {
    if (this.eventForm.valid) {
      let event: CalendarEvent = {
        allDay: (this.allDay?.value ? true : false),
        startTime: (this.allDay?.value ? null : this.startTime?.value),
        endTime: (this.allDay?.value ? null : this.endTime?.value),
        date: this.selectedDate,
        name: this.name?.value,
        details: this.details?.value
      }
      if (this.editing) {
        event.id = this.id;
        this.calendarService.editCalendarEvent(event).pipe(
          take(1),
          catchError(err => {
            console.log(err);
            this.saved.emit(false);
            return of();
          })
        ).subscribe(_ => {
          this.calendarService.refreshEvents();
          this.saved.emit(true);
        });
      } else {
        this.calendarService.addCalendarEvent(event).pipe(
          take(1),
          catchError(err => {
            console.log(err);
            this.saved.emit(false);
            return of();
          })
        ).subscribe(_ => {
          this.calendarService.refreshEvents();
          this.saved.emit(true);
        });
      }
    } else if (this.eventForm.invalid) {
      return;
    }
  }

}
