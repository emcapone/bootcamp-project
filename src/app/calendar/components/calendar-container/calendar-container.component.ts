import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { CalendarEvent } from '../../calendar-event';

@Component({
  selector: 'app-calendar-container',
  templateUrl: './calendar-container.component.html',
  styleUrls: ['./calendar-container.component.css']
})
export class CalendarContainerComponent implements OnInit, OnDestroy {

  selectedDate!: moment.Moment | null;
  showForm: boolean = false;
  eventId: number = -1;
  showError: boolean = false;

  private clear$ = new Subject<void>();

  constructor(private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.clear$.subscribe(_ => {
      this.eventId = -1;
      this.showForm = false;
      this.selectedDate = null;
      this.showError = false;
    })
  }

  ngOnDestroy(): void {
    this.clear$.complete();
  }

  refresh(): void {
    this.clear$.next();
  }

  formatMoment(date: moment.Moment): string {
    return moment(date).format("MMMM Do YYYY");
  }

  dateSelected(value: moment.Moment) {
    this.selectedDate = value;
  }

  editEvent(value: CalendarEvent) {
    if(value.id){
      this.eventId = value.id;
      this.showForm = true;
    } else {
      throw new Error('Event is missing an ID.')
    }
  }

  newEvent() {
    if(this.selectedDate !== null){
      this.showForm = true;
    }
  }

  cancelForm($event?: boolean) {
    if ($event === true) {
      this.snackbar.open('Saved Event', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    } else if ($event === false) {
      this.showError = true;
    }
    this.eventId = -1;
    this.showForm = false;
  }

}
