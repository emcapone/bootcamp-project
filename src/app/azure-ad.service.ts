import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, map, mergeMap, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PawssierUser } from './pawssier-user';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AzureAdService {
  private userUrl = environment.apiUrl + '/api/v1/User';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isUserLoggedIn$ = this.isUserLoggedIn.asObservable();

  user$ = this.isUserLoggedIn$.pipe(
    filter(res => res === true),
    mergeMap(_ => {
      return this.http.get<User>(environment.graphUrl);
    })
  );

  userId$ = this.user$.pipe(
    map(res => {
      return res.id;
    })
  );

  givenName$ = this.user$.pipe(
    map(res => {
      return res.givenName || "Pet Parent";
    })
  );

  createUserProfileIfNotCreated$ = this.user$.pipe(
    mergeMap(user => {
      let pawssierUser: PawssierUser = {
        id: user.id,
        preferredFirstName: null,
        username: null
      }
      return this.http.post<PawssierUser>(this.userUrl, pawssierUser, this.httpOptions).pipe(
        map(res => {
          if (res) {
            return true;
          } else {
            throw (new Error('Client side error'));
          }
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            // Already created
            return of(true);
          } else {
            return of(false)
          }
        })
      );
    })
  );

  constructor(private http: HttpClient) { }
}
