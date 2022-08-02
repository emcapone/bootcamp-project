import * as moment from 'moment';
import { AfterViewInit, Component, EventEmitter, OnDestroy, Output, Renderer2, ViewChild } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { CalendarService } from '../../calendar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements AfterViewInit, OnDestroy{

  selectedDate = moment();
  minDate: Date = new Date();
  events!: string[];
  stringEvents!: Subscription;

  @Output()
  dateSelected: EventEmitter<moment.Moment> = new EventEmitter();

  @Output()
  monthSelected: EventEmitter<moment.Moment> = new EventEmitter();

  @ViewChild('calendar', { static: true })
  calendar!: MatCalendar<moment.Moment>;

  constructor(private renderer: Renderer2, private calendarService: CalendarService) { }

  ngAfterViewInit() {
    this.setupArrowButtonListeners();
    this.setMonth();
    this.stringEvents = this.calendarService.getStringEvents().subscribe(res => this.highlightDays(res));
  }

  ngOnDestroy() {
    this.dateSelected.complete();
    this.monthSelected.complete();
    this.stringEvents.unsubscribe();
  }

  private setupArrowButtonListeners() {
    const buttons = document.querySelectorAll('.mat-calendar-previous-button, .mat-calendar-next-button');

    if (buttons) {
      Array.from(buttons).forEach(button => {
        this.renderer.listen(button, 'click', () => {
          this.monthSelected.emit(this.calendar.activeDate);
          this.setMonth();
        });
      });
    }
  }

  monthChanged(date: moment.Moment) {
    this.monthSelected.emit(date);
  }

  dateChanged() {
    this.calendar.activeDate = this.selectedDate;
    this.dateSelected.emit(this.selectedDate);
  }

  setMonth() {
    const month = parseInt(moment(this.calendar.activeDate).format('M'));
    const year = parseInt(moment(this.calendar.activeDate).format('Y'));
    this.calendarService.selectMonth(month, year);
  }

  // Update events when selecting from year view
  viewChanged(event: 'month' | 'multi-year' | 'year') {
    if(event === 'month'){
      this.setMonth();
    }
  }

  /**
 * Method to highlight certain days on the calendar.
 * This should be used when month selection changes.
 *
 * @param days: Array of strings in the format "February 20, 2020"
 */
  highlightDays(days: string[]) {
    let dayElements = document.querySelectorAll(
      'mat-calendar .mat-calendar-table .mat-calendar-body-cell'
      );
    Array.from(dayElements).forEach((element) => {
      const matchingDay = days.find((d) => d === element.getAttribute('aria-label')) !== undefined;

      if (matchingDay) {
        this.renderer.addClass(element, 'booked');
        this.renderer.setAttribute(element, 'title', 'Event(s) Scheduled');
      } else {
        this.renderer.removeClass(element, 'booked');
        this.renderer.removeAttribute(element, 'title');
      }
    });
  }

}
