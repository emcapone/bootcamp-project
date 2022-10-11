import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, map, combineLatest, catchError, EMPTY, mergeMap } from 'rxjs';
import { CalendarService } from 'src/app/calendar/calendar.service';
import { PetfinderService } from 'src/app/petfinder/petfinder-service/petfinder.service';
import { DashboardDetails } from './dashboard-details';
import { DashboardService } from './dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardResolver implements Resolve<DashboardDetails> {

  constructor(private _dashboardService: DashboardService, private _petfinderService: PetfinderService, private _calendarService: CalendarService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DashboardDetails> {
    return this._petfinderService.token$.pipe(
      mergeMap(_ => {
        return combineLatest([
          this._dashboardService.latestBookmark$,
          this._dashboardService.monthlyBirthdays$,
          this._calendarService.getDayEvents(this._dashboardService.today)
        ]).pipe(
          catchError(_ => {
            return EMPTY;
          }),
          map(([bookmark, pets]) => {
            let details: DashboardDetails = {
              bookmarkedPet: bookmark.animal,
              pets: pets
            }
            return details;
          })
        );
      })
    );
  }
}
