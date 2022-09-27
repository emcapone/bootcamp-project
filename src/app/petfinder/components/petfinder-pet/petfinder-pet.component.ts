import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Bookmark } from 'src/app/bookmark';
import { BookmarkService } from 'src/app/bookmark.service';
import { PetfinderPetDetails } from '../../petfinder-service/models';
import { catchError, EMPTY, Subscription, take, tap } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-petfinder-pet',
  templateUrl: './petfinder-pet.component.html',
  styleUrls: ['./petfinder-pet.component.css']
})
export class PetfinderPetComponent{

  sub!: Subscription;
  private _pet!: PetfinderPetDetails;
  get pet(): PetfinderPetDetails {
    return this._pet;
  }
  @Input() set pet(p: PetfinderPetDetails) {
    this._pet = p;
    this.save.checkDuplicate(this._pet.id);
    this.checkDuplicate();
  }
  duplicate = true;

  constructor(private save: BookmarkService) { }

  checkDuplicate(): void {
    this.sub = this.save.duplicate$.pipe(
      take(1)
    ).subscribe(res => this.duplicate = res);
  }

  round(num: number): number {
    return Math.round(num * 100) / 100;
  }

  replaceEscapedChars(str: string) {
    while (str.includes('&amp;')) {
      str = str.replace('&amp;', "&");
    }
    while (str.includes('&#38;')) {
      str = str.replace('&#38;', "&");
    }

    while (str.includes('&lt;')) {
      str = str.replace('&lt;', '<');
    }
    while (str.includes('&#60;')) {
      str = str.replace('&#60;', '<');
    }
    while (str.includes('&gt;')) {
      str = str.replace('&gt;', '>');
    }
    while (str.includes('&#62;')) {
      str = str.replace('&#62;', '>');
    }
    while (str.includes('&quot;')) {
      str = str.replace('&quot;', '"');
    }
    while (str.includes('&#34;')) {
      str = str.replace('&#34;', '"');
    }
    while (str.includes('&apos;')) {
      str = str.replace('&apos;', "'");
    }
    while (str.includes('&#39;')) {
      str = str.replace('&#39;', "'");
    }
    while (str.includes('&#039;')) {
      str = str.replace('&#039;', "'");
    }
    return str;
  }

  bookmark() {
    this.duplicate = true;
    let x: Bookmark = {
      link: this.pet._links.self.href,
      petfinder_id: this.pet.id,
      title: this.pet.name,
      note: `${this.pet.type}, listed on ${formatDate(this.pet.published_at, 'M/d/yy, h:mm a', 'en-US')}`,
      savedAt: new Date(),
      external_url: this.pet.url
    };
    this.save.addBookmark(x).pipe(
      take(1),
      catchError(err => {
        console.log(err);
        this.duplicate = false;
        return EMPTY;
      })
    ).subscribe(_ => {
      this.save.refreshBookmarks();
    });
  }
}
