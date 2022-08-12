import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bookmark } from './bookmark';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveSearchService {

  private url = 'api/bookmarks';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

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

  getBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.url)
    .pipe(
      tap(marks => {
        console.log('fetched ' + marks.length + ' pets');
      })
    );
  }

  deleteBookmark(id: number): Observable<Bookmark>{
    return this.http.delete<Bookmark>(this.url + '/' + id, this.httpOptions).pipe(
      tap(_ => console.log(`deleted pet id=${id}`)),
      catchError(err => {
        console.log(err);
        return of();
      })
    );
  }
}
