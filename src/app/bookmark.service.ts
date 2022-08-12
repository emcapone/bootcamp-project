import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bookmark } from './bookmark';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of, shareReplay, tap, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  private url = 'api/bookmarks';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private _bookmarkData$ = new BehaviorSubject<void>(undefined);
  apiRequest$ = this.http.get<Bookmark[]>(this.url)
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
    map(([bookmark, id]) =>
      bookmark.map(mark => { return mark.petfinder_id }).includes(id)
    )
  );

  constructor(private http: HttpClient) { }

  addBookmark(bookmark: Bookmark) {
    return this.http.post<Bookmark>(this.url, bookmark, this.httpOptions).pipe(
      tap((res: Bookmark) => console.log(`added bookmark w/ id=${res.id}`)),
      catchError(err => {
        console.log(err);
        return of();
      })
    );
  }

  deleteBookmark(id: number): Observable<Bookmark> {
    const url = `${this.url}/${id}`;

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
