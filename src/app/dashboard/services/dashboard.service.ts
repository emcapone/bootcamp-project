import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, mergeMap, EMPTY, catchError, tap } from 'rxjs';
import { BookmarkService } from 'src/app/bookmark.service';
import { PetListItem } from 'src/app/pet-list-item';
import { PetService } from 'src/app/pet.service'
import { PetfinderService } from 'src/app/petfinder/petfinder-service/petfinder.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  today!: moment.Moment;

  monthlyBirthdays$ = this.petService.pets$.pipe(
    map(res => {
      let pets: PetListItem[] = [];
      for (let p of res) {
        if (p.birthday) {
          let birthday = new Date(p.birthday);
          if (birthday.getMonth() == this.today.month()) {
            pets.push(p);
            continue;
          }
        }
        if (p.adoptionDay) {
          let adoptionDay = new Date(p.adoptionDay);
          if (adoptionDay.getMonth() == this.today.month()) {
            pets.push(p);
            continue;
          }
        }
      }
      return pets;
    }),
    catchError(_ => {
      return EMPTY;
    })
  );

  latestBookmark$ = this.bookmarkService.bookmarks$.pipe(
    map(bookmarks => {
      return bookmarks[bookmarks.length -1];
    }),
    mergeMap(res => {
      if (res?.petfinder_link) {
        return this.petfinderService.getPet(res.petfinder_link);
      }
      return EMPTY;
    }),
    catchError(_ => {
      return EMPTY;
    })
  );

  constructor(private petService: PetService, private bookmarkService: BookmarkService, private petfinderService: PetfinderService) {
    this.today = moment();
  }

  getDate(): moment.Moment {
    return this.today;
  }

}
