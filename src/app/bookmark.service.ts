import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bookmark } from './bookmark';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of, shareReplay, mergeMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AzureAdService } from './azure-ad.service';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  private url = environment.apiUrl + '/api/v1/Bookmarks';
  private petfinder_version = 'Petfinder/v' + environment.petfinderVersion;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private userId$ = this.azureAdService.userId$;

  private _bookmarkData$ = new BehaviorSubject<void>(undefined);
  apiRequest$ = this.userId$.pipe(
    mergeMap(user_id => {
      return this.http.get<Bookmark[]>(`${this.url}/GetAll/${user_id}/${this.petfinder_version}`);
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

  constructor(private http: HttpClient, private azureAdService: AzureAdService) { }

  /**
  * Errors must be handled by subscriber.
  * @param bookmark - new Bookmark to POST
  */
  addBookmark(bookmark: Bookmark) {
    return this.userId$.pipe(
      mergeMap(user_id => {
        return this.http.post<Bookmark>(`${this.url}/${user_id}/${this.petfinder_version}`, bookmark, this.httpOptions);
      })
    );
  }

  deleteBookmark(id: number): Observable<Bookmark> {
    const url = `${this.url}/${id}`;

    return this.http.delete<Bookmark>(url, this.httpOptions).pipe(
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
