import { Injectable } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, mergeMap, shareReplay, tap } from 'rxjs/operators';

import { Pet } from './pet';
import { PETS } from './mock-pets';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private petsUrl = 'api/pets';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private _petsData$ = new BehaviorSubject<void>(undefined);
  apiRequest$ = this.http.get<Pet[]>(this.petsUrl)
    .pipe(
      tap(pets => {
        console.log('fetched ' + pets.length + ' pets');
      })
    );

  pets$ = this._petsData$.pipe(
    mergeMap(() => this.apiRequest$),
    shareReplay(1)
  );

  private selectedPetSubject = new BehaviorSubject<number>(0);
  selectedPet$ = this.selectedPetSubject.asObservable();

  pet$ = combineLatest([
    this.pets$,
    this.selectedPet$
  ]).pipe(
    map(([pets, id]) =>
      pets.find(pet => pet.id === id)
    ),
    tap(pet => console.log('selected pet', pet?.id)),
    catchError(this.handleError<Pet>('getPet'))
  );

  constructor(private http: HttpClient) { }

  selectedPetChanged(id: number): void {
    this.selectedPetSubject.next(id);
  }

  refreshPets(){
    this._petsData$.next();
  }

  /** PUT */
  updatePet(pet: Pet): Observable<any> {
    return this.http.put(this.petsUrl, pet, this.httpOptions).pipe(
      tap(_ => console.log(`updated pet id=${pet.id}`)),
      catchError(this.handleError<any>('updatePet'))
    );
  }

  /** POST */
  addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.petsUrl, pet, this.httpOptions).pipe(
      tap((newPet: Pet) => console.log(`added pet w/ id=${newPet.id}`)),
      catchError(this.handleError<Pet>('addPet'))
    );
  }

  /** DELETE */
  deletePet(id: number): Observable<Pet> {
    const url = `${this.petsUrl}/${id}`;

    return this.http.delete<Pet>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted pet id=${id}`)),
      catchError(this.handleError<Pet>('deletePet'))
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
