import { Component, Input, OnInit } from '@angular/core';
import { Bookmark } from 'src/app/bookmark';
import { SaveSearchService } from 'src/app/save-search.service';
import { PetDetails } from '../../petfinder-service/models';
import { take } from 'rxjs';

@Component({
  selector: 'app-petfinder-pet',
  templateUrl: './petfinder-pet.component.html',
  styleUrls: ['./petfinder-pet.component.css']
})
export class PetfinderPetComponent implements OnInit {

  @Input() pet!: PetDetails;

  constructor(private save: SaveSearchService) { }

  ngOnInit(): void {
  }

  round(num: number): number {
    return Math.round(num * 100) / 100;
  }

  replaceEscapedChars(str: string) {
    while (str.includes('&amp;')) {
      str = str.replace('&amp;', "&");
    }
    while (str.includes ('&#38;')){
      str = str.replace('&#38;', "&");
    }

    while(str.includes('&lt;')){
      str = str.replace('&lt;', '<');
    }
    while(str.includes('&#60;')){
      str = str.replace('&#60;', '<');
    }
    while(str.includes('&gt;')){
      str = str.replace('&gt;', '>');
    }
    while(str.includes('&#62;')){
      str = str.replace('&#62;', '>');
    }
    while(str.includes('&quot;')){
      str = str.replace('&quot;', '"');
    }
    while(str.includes('&#34;')){
      str = str.replace('&#34;', '"');
    }
    while(str.includes('&apos;')){
      str = str.replace('&apos;', "'");
    }
    while(str.includes('&#39;')){
      str = str.replace('&#39;', "'");
    }
    while(str.includes('&#039;')){
      str = str.replace('&#039;', "'");
    }
    return str;
  }

  bookmark(){
    let x: Bookmark = {
      link: this.pet._links.self.href,
      title: this.pet.name,
      note: 'Adoptable pet with PetSearch, listed on ' + this.pet.published_at,
      external_url: this.pet.url
    };
    if(this.pet.primary_photo_cropped) {
      x.image = this.pet.primary_photo_cropped.small;
    }
    this.save.addBookmark(x).pipe(
      take(1),
    ).subscribe(res => console.log(res));
  }
}
