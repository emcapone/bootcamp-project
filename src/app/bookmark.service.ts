import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bookmark } from './bookmark';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of, shareReplay, tap, mergeMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  private url = environment.apiUrl + '/api/v1/Bookmarks';
  private user_id = 1; //replace after auth
  private petfinder_version = 'Petfinder/v' + environment.petfinderVersion;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private _bookmarkData$ = new BehaviorSubject<void>(undefined);
  apiRequest$ = this.http.get<Bookmark[]>(`${this.url}/GetAll/${this.user_id}/${this.petfinder_version}`)
    .pipe(
      tap(marks => {
        console.log('fetched ' + marks.length + ' bookmarks');
      })
    );

  bookmarks$ = this._bookmarkData$.pipe(
    mergeMap(() => this.apiRequest$),
    shareReplay(1)
  );

  selectedPetSubject = new BehaviorSubject<number>(0);
  selectedPet$ = this.selectedPetSubject.asObservable();

  duplicate$ = combineLatest([
    this.bookmarks$,
    this.selectedPet$
  ]).pipe(
    map(([bookmarks, id]) => {
      for (let mark of bookmarks) {
        if (mark.petfinder_id === id) {
          return true;
        }
      }
      return false;
    })
  );

  constructor(private http: HttpClient) { }

  /**
  * Errors must be handled by subscriber.
  * @param bookmark - new Bookmark to POST
  */
  addBookmark(bookmark: Bookmark) {
    return this.http.post<Bookmark>(`${this.url}/${this.user_id}/${this.petfinder_version}`, bookmark, this.httpOptions).pipe(
      tap((res: Bookmark) => console.log(`added bookmark w/ id=${res.id}`))
    );
  }

  deleteBookmark(id: number): Observable<Bookmark> {
    const url = `${this.url}/${id}/${this.petfinder_version}`;

    return this.http.delete<Bookmark>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted bookmark id=${id}`)),
      catchError(err => {
        console.log(err);
        return of();
      })
    );
  }

  checkDuplicate(id: number) {
    this.selectedPetSubject.next(id);
  }

  refreshBookmarks(): void {
    this._bookmarkData$.next();
  }

}
