import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, BehaviorSubject, tap, mergeMap, EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';
import { Credentials } from './credentials';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;
  private userUrl = this.apiUrl + '/api/v1/User';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private _user_id: number | undefined;
  get user_id(): number | undefined {
    return this._user_id;
  }
  set user_id(id: number | undefined) {
    this._user_id = id;
    if (id)
      this.loggedInSubject.next(true);
  }

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public loggedIn$ = this.loggedInSubject.asObservable();

  user$ = this.loggedIn$.pipe(
    mergeMap(res => {
      if (res === false) {
        return EMPTY;
      }
      return this.http.get<User>(`${this.userUrl}/${this.user_id}`, this.httpOptions).pipe(
        catchError(this.handleError<User>('fetchUser'))
      )
    }
    )
  );

  constructor(private http: HttpClient, private snackbar: MatSnackBar, private router: Router) { }

  isLoggedIn(): boolean {
    return this.user_id ? true : false;
  }

  logout(): void {
    this.user_id = undefined;
    this.loggedInSubject.next(false);
    this.router.navigate(['homepage']);
    this.snackbar.open('Successfully logged out', 'Close', {
      panelClass: ['snackbar'],
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  login(cred: Credentials): Observable<User> {
    return this.http.post<User>(`${this.userUrl}/Auth`, cred, this.httpOptions).pipe(
      tap(res => {
        if (!(res instanceof HttpErrorResponse)) {
          this.user_id = res.id;
        }
      })
    );
  }

  signup(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user, this.httpOptions).pipe(
      tap(res => {
        if (!(res instanceof HttpErrorResponse)) {
          this.user_id = res.id;
        }
      })
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.userUrl}/${user.id}`, user, this.httpOptions).pipe(
      catchError(this.handleError<User>('updateUser'))
    )
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
