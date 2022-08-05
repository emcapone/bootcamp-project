import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { CalendarEvent } from '../../calendar-event';

@Component({
  selector: 'app-calendar-container',
  templateUrl: './calendar-container.component.html',
  styleUrls: ['./calendar-container.component.css']
})
export class CalendarContainerComponent implements OnInit {

  selectedDate!: moment.Moment;
  showForm: boolean = false;
  eventId: number = -1;
  showError: boolean = false;

  constructor(private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  refresh(): void {
    window.location.reload();
  }

  formatMoment(date: moment.Moment): string {
    return moment(date).format("MMMM Do YYYY");
  }

  dateSelected(value: moment.Moment) {
    this.selectedDate = value;
  }

  editEvent(value: CalendarEvent) {
    this.eventId = value.id;
    this.showForm = true;
  }

  newEvent() {
    this.showForm = true;
  }

  cancelForm($event?: boolean) {
    console.log($event);
    if ($event === true) {
      this.snackbar.open('Saved Event', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    } else if ($event === false){
      this.showError = true;
    }
    this.eventId = -1;
    this.showForm = false;
  }

}
