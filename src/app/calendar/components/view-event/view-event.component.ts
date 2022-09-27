import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { take } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { CalendarEvent } from '../../calendar-event';
import { CalendarService } from '../../calendar.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})

export class ViewEventComponent implements OnDestroy {

  private _selectedDate!: moment.Moment;
  get selectedDate(): moment.Moment {
    return this._selectedDate;
  }
  @Input() set selectedDate(date: moment.Moment) {
    this._selectedDate = date;
    this.getEvents();
  }

  @Output() event: EventEmitter<CalendarEvent> = new EventEmitter();

  events!: CalendarEvent[] | null;

  constructor(private calendarService: CalendarService, private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.event.complete();
  }

  formatMoment(x: moment.Moment): string {
    return moment(x).format("dddd, MMMM Do YYYY");
  }

  getEvents() {
    this.calendarService.getDayEvents(this.selectedDate).pipe(
      take(1)
    ).subscribe(events => this.events = events);
  }

  editEvent(event: CalendarEvent) {
    this.event.emit(event);
  }

  deleteEvent(id: number | undefined) {
    if (id) {
      this.calendarService.deleteCalendarEvent(id).pipe(
        take(1)
      ).subscribe(_ => this.calendarService.refreshEvents());
    } else {
      throw new Error('Event is missing an ID.')
    }
  }

  openDialog(id: number | undefined, name: string) {
    let dialog = this.dialog.open(ConfirmDialogComponent, {
      width: '50%',
      data: {
        title: 'Delete Event: ' + name,
        message: 'This action cannot be undone. Are you sure?'
      }
    });
    dialog.afterClosed().pipe(
      take(1)
    ).subscribe(res => {
      if (res) {
        this.deleteEvent(id);
      }
    });
  }
}
