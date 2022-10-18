import { Injectable } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable, of, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, concatMap, distinctUntilChanged, filter, map, mergeMap, shareReplay, tap } from 'rxjs/operators';

import { Pet } from './pet';
import { environment } from 'src/environments/environment';
import { PetListItem } from './pet-list-item';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private apiUrl = environment.apiUrl
  private petsUrl = this.apiUrl + '/api/v1/Pets';
  private user_id = this.userService.user_id;

  private _petsData$ = new BehaviorSubject<void>(undefined);
  apiRequestListItem$ = this.http.get<PetListItem[]>(this.petsUrl + `/GetAll/${this.user_id}`)
    .pipe(
      tap(_ => {
        console.log('fetched pet list items');
      })
    );

  pets$ = this._petsData$.pipe(
    mergeMap(() => this.apiRequestListItem$),
    shareReplay(1)
  );

  private selectedPetSubject = new BehaviorSubject<number>(0);
  selectedPet$ = this.selectedPetSubject.asObservable()
    .pipe(distinctUntilChanged());

  pet$ = combineLatest([
    this.pets$,
    this.selectedPet$
  ]).pipe(
    filter(([pets, id]) => id !== 0 || id !== null),
    map(([pets, id]) =>
      pets.find(pet => pet.id === id)?.link || null
    ),
    filter(link => link !== null),
    concatMap(link => this.http.get<Pet>(this.apiUrl + link)
    .pipe(
      tap(pet => {
        console.log('fetched pet', pet.id);
      })
    )),
    catchError(this.handleError<Pet>('getPet')),
    shareReplay(1)
  );

  constructor(private http: HttpClient, private userService: UserService) { }

  selectedPetChanged(id: number): void {
    this.selectedPetSubject.next(id);
  }

  refreshPets(){
    this._petsData$.next();
  }

  /** PUT */
  updatePet(pet: Pet): Observable<any> {
    return this.http.put(`${this.petsUrl}/${pet.id}`, pet).pipe(
      tap(_ => console.log(`updated pet id=${pet.id}`)),
      catchError(this.handleError<any>('updatePet'))
    );
  }

  /** POST */
  addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(`${this.petsUrl}/${this.user_id}`, pet).pipe(
      tap((newPet: Pet) => console.log(`added pet w/ id=${newPet.id}`)),
      catchError(this.handleError<Pet>('addPet'))
    );
  }

  /** DELETE */
  deletePet(id: number): Observable<Pet> {
    const url = `${this.petsUrl}/${id}`;

    return this.http.delete<Pet>(url).pipe(
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
