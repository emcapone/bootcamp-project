import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { take, BehaviorSubject, tap, mergeMap, shareReplay, combineLatest, map, catchError, Observable, of, concatMap, distinctUntilChanged, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../user.service';
import { CalendarEvent } from './calendar-event';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private apiUrl = environment.apiUrl
  private eventsUrl = this.apiUrl + '/api/v1/CalendarEvents';
  private user_id = this.userService.user_id;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private now = moment();

  private refresh = new BehaviorSubject<void>(undefined);
  private refresh$ = this.refresh.asObservable();

  private MonthYearSubject = new BehaviorSubject<[number, number]>([parseInt(this.now.format('M')), parseInt(this.now.format('YYYY'))]);
  private MonthYear$ = this.MonthYearSubject.asObservable();
  private apiRequest$ = this.MonthYear$.pipe(
    concatMap(date => {
      return this.http.get<CalendarEvent[]>(`${this.eventsUrl}/GetAll/${this.user_id}?month=${date[0]}&year=${date[1]}`, this.httpOptions)
        .pipe(
          catchError(this.handleError<CalendarEvent[]>('fetchMonthEvents'))
        )
    })
  );

  private events$ = this.refresh$.pipe(
    mergeMap(() => this.apiRequest$),
    tap(res => console.log("cache refresh")),
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

  constructor(private http: HttpClient, private userService: UserService) { }

  refreshEvents() {
    this.refresh.next();
  }

  selectMonth(month: number, year: number) {
    this.MonthYearSubject.next([month, year]);
  }

  selectEvent(id: number) {
    this.selectedEventSubject.next(id);
  }

  getDayEvents(day: moment.Moment): Observable<CalendarEvent[]> {
    return this.events$.pipe(
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
    return this.events$.pipe(
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
    return this.http.post<CalendarEvent>(`${this.eventsUrl}/${this.user_id}`, event).pipe(
      tap((newEvent: CalendarEvent) => console.log('added event', newEvent.id))
    );
  }

  /**
* Errors must be handled by subscriber.
* @param event - edited CalendarEvent to PUT
*/
  editCalendarEvent(event: CalendarEvent): Observable<any> {
    return this.http.put(`${this.eventsUrl}/${event.id}`, event, this.httpOptions).pipe(
      tap(_ => console.log(`updated event`, event.id))
    );
  }

  deleteCalendarEvent(id: number): Observable<CalendarEvent> {
    const url = `${this.eventsUrl}/${id}`;

    return this.http.delete<CalendarEvent>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted event`, id)),
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
