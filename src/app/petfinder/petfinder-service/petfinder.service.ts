import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, take, of, tap, Subject, combineLatest, throwError, BehaviorSubject, mergeMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Token, Types, Breeds, Parameters, PetfinderPets, PetfinderPet } from './models';

@Injectable({
  providedIn: 'root'
})
export class PetfinderService implements OnDestroy {

  private apiKey = 'BMftsF57yG0s4ZSeDgOqp67N63b5KBZpWSJXOyx6MhTs7l4Ik8';
  private apiSecret = 'ykUUhf6okEPpaIGZBLB4BgsXXfkfQTQxL6iJzu4O';
  private baseUrl = 'https://api.petfinder.com'

  private tokenHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };

  private refreshTokenSubject = new BehaviorSubject<void>(undefined);
  private refreshToken$ = this.refreshTokenSubject.asObservable();

  private getToken$ = this.http.post<Token>(this.baseUrl + '/v2/oauth2/token',
    `grant_type=client_credentials&client_id=${this.apiKey}&client_secret=${this.apiSecret}`, this.tokenHeader);

  token$ = combineLatest([
    this.getToken$,
    this.refreshToken$
  ]).pipe(
    mergeMap(() => this.getToken$)
  );

  httpOptions!: Object;

  constructor(private http: HttpClient) {
    this.token$.pipe(
      catchError(this.handleError<Token>('getToken'))
    ).subscribe(res => {
      setTimeout(() => this.refreshToken(), (res.expires_in * 1000));
      this.httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `${res?.token_type} ${res?.access_token}` })
      }
    });
  }

  ngOnDestroy(): void {
    this.refreshTokenSubject.complete();
  }

  refreshToken(): void {
    this.refreshTokenSubject.next();
  }

  getTypes(): Observable<Types> {
    return this.http.get<Types>(this.baseUrl + '/v2/types', this.httpOptions).pipe(
      catchError(this.handleError<Types>('getTypes')));
  }

  getBreeds(link: string): Observable<Breeds> {
    return this.http.get<Breeds>(this.baseUrl + link, this.httpOptions).pipe(
      catchError(this.handleError<Breeds>('getBreeds')));
  }

  getPets(params: Parameters): Observable<PetfinderPets> {
    let query = "?";
    query += 'type=' + params.type + '&';
    query += 'location=' + params.location + '&';
    query += 'distance=' + params.distance + '&';
    if (params.breed) {
      query += 'breed=' + params.breed + '&';
    }
    if (params.size) {
      query += 'size=' + params.size + '&';
    }
    if (params.gender) {
      query += 'gender=' + params.gender + '&';
    }
    if (params.age) {
      query += 'age=' + params.age + '&';
    }
    if (params.color) {
      query += 'color=' + params.color + '&';
    }
    if (params.coat) {
      query += 'coat=' + params.coat + '&';
    }
    if (params.good_with_children) {
      query += 'good_with_children=' + params.good_with_children + '&';
    }
    if (params.good_with_dogs) {
      query += 'good_with_dogs=' + params.good_with_dogs + '&';
    }
    if (params.good_with_cats) {
      query += 'good_with_cats=' + params.good_with_cats + '&';
    }
    if (params.house_trained) {
      query += 'house_trained=' + params.house_trained + '&';
    }
    query += 'special_needs=' + params.special_needs + '&';
    query += 'page=' + params.page;

    return this.http.get<PetfinderPets>(this.baseUrl + '/v2/animals' + query, this.httpOptions).pipe(
      tap(_ => console.log('fetch pets by query')),
      catchError(this.handleError<PetfinderPets>('getPets')));
  }

  getPetsLink(link: string): Observable<PetfinderPets> {
    return this.http.get<PetfinderPets>(this.baseUrl + link, this.httpOptions).pipe(
      tap(_ => console.log('fetch pets by link')),
      catchError(this.handleError<PetfinderPets>('getPetsLink')));
  }

  getPet(link: string): Observable<PetfinderPet>{
    return this.http.get<PetfinderPet>(this.baseUrl + link, this.httpOptions).pipe(
      tap(res => console.log('fetch pet by link')),
      catchError(this.handleError<PetfinderPet>('getPetsLink')));
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
