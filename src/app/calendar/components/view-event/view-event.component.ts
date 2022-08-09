import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import * as moment from 'moment';
import { Observable, take } from 'rxjs';
import { CalendarEvent } from '../../calendar-event';
import { CalendarService } from '../../calendar.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})

export class ViewEventComponent implements OnDestroy{

  _selectedDate!: moment.Moment;
  get selectedDate(): moment.Moment {
    return this._selectedDate;
  }
  @Input() set selectedDate(date: moment.Moment) {
    this._selectedDate = date;
    this.getEvents();
  }

  @Output() event: EventEmitter<CalendarEvent> = new EventEmitter();

  events$!: Observable<CalendarEvent[]>;

  constructor(private calendarService: CalendarService) { }

  ngOnDestroy(): void {
    this.event.complete();
  }

  formatMoment(x: moment.Moment): string{
    return moment(x).format("dddd, MMMM Do YYYY");
  }

  getEvents() {
    this.events$ = this.calendarService.getDayEvents(this.selectedDate);
  }

  editEvent(event: CalendarEvent){
    this.event.emit(event);
  }

  deleteEvent(id: number | undefined){
    if(id){
      this.calendarService.deleteCalendarEvent(id).pipe(
        take(1)
      ).subscribe(_ => this.calendarService.refreshEvents());
    } else {
      throw new Error('Event is missing an ID.')
    }
  }
}
