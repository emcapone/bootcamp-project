import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { take, BehaviorSubject, tap, mergeMap, shareReplay, combineLatest, map, catchError, Observable, of } from 'rxjs';
import { CalendarEvent } from './calendar-event';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private eventsUrl = 'api/events';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private now = moment();

  //fetch all user events
  private eventsData$ = new BehaviorSubject<void>(undefined);
  private apiRequest$ = this.http.get<CalendarEvent[]>(this.eventsUrl)
    .pipe(
      tap(_ => {
        console.log('fetch events');
      }),
      catchError(this.handleError<CalendarEvent[]>('fetchEvents'))
    );
  //cache events
  private events$ = this.eventsData$.pipe(
    mergeMap(() => this.apiRequest$),
    shareReplay(1)
  );

  //get events in month
  private MonthYearSubject = new BehaviorSubject<[number, number]>([parseInt(this.now.format('M')), parseInt(this.now.format('YYYY'))]);
  private MonthYear$ = this.MonthYearSubject.asObservable();
  monthEvents$ = combineLatest([
    this.events$,
    this.MonthYear$
  ]).pipe(
    tap(res => console.log(`month: ${res[1][0]}, year: ${res[1][1]}`)),
    map(([events, date]) => {
      let match: CalendarEvent[] = [];
      for (let x of events) {
        let temp = moment(x.date);
        if (parseInt(temp.format('M')) === date[0] && parseInt(temp.format('YYYY')) === date[1]) {
          match.push(x);
        }
      }
      return match;
    }),
    tap(res => console.log(`events: ${res.length}`)),
    catchError(this.handleError<CalendarEvent>('selectMonth')),
    shareReplay(1)
  );

  //get selected event by id
  private selectedEventSubject = new BehaviorSubject<number>(0);
  private selectedEvent$ = this.selectedEventSubject.asObservable();
  event$ = combineLatest([
    this.events$,
    this.selectedEvent$
  ]).pipe(
    map(([events, id]) =>
      events.find(event => event.id === id)
    ),
    tap(event => console.log('selected event', event?.id)),
    catchError(this.handleError<CalendarEvent>('getEvent'))
  );

  constructor(private http: HttpClient) { }

  refreshEvents() {
    this.eventsData$.next();
  }

  selectMonth(month: number, year: number) {
    this.MonthYearSubject.next([month, year]);
  }

  selectEvent(id: number) {
    this.selectedEventSubject.next(id);
  }

  getDayEvents(day: moment.Moment): Observable<CalendarEvent[]> {
    return this.monthEvents$.pipe(
      map(res => {
        let events: CalendarEvent[] = [];
        for (let event of (res as CalendarEvent[])) {
          if (moment(event.date).format('M D, YYYY') === moment(day).format('M D, YYYY')) {
            events.push(event);
          }
        }
        return events;
      })
    );
  }

  getStringEvents(): Observable<string[]> {
    return this.monthEvents$.pipe(
      map(res => {
        let stringified: string[] = [];
        for (let event of (res as CalendarEvent[])) {
          stringified.push(moment(event.date).format('MMMM D, YYYY'));
        }
        return stringified;
      })
    );
  }

  /**
* Errors must be handled by subscriber.
* @param event - new CalendarEvent to POST
*/
  addCalendarEvent(event: CalendarEvent): Observable<CalendarEvent> {
    return this.http.post<CalendarEvent>(this.eventsUrl, event, this.httpOptions).pipe(
      tap((newEvent: CalendarEvent) => console.log('added event', newEvent.id))
    );
  }

  /**
* Errors must be handled by subscriber.
* @param event - edited CalendarEvent to PUT
*/
  editCalendarEvent(event: CalendarEvent): Observable<any> {
    return this.http.put(this.eventsUrl, event, this.httpOptions).pipe(
      tap(_ => console.log(`updated event id=${event.id}`))
    );
  }

  deleteCalendarEvent(id: number): Observable<CalendarEvent> {
    const url = `${this.eventsUrl}/${id}`;

    return this.http.delete<CalendarEvent>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted event id=${id}`)),
      catchError(this.handleError<CalendarEvent>('deleteCalendarEvent'))
    );
  }

  /**
* Handle Http operation that failed.
* Let the app continue.
*
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
