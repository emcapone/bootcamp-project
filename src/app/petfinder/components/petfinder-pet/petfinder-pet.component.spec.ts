import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { BookmarkService } from 'src/app/bookmark.service';

import { PetfinderPetComponent } from './petfinder-pet.component';

describe('PetfinderPetComponent', () => {
  let component: PetfinderPetComponent;
  let fixture: ComponentFixture<PetfinderPetComponent>;
  let mockBookmarkService;

  beforeEach(async () => {
    mockBookmarkService = {
      checkDuplicate: () => { },
      addBookmark: () => { return of() },
      refreshBookmarks: () => { },
      duplicate$: of()
    }

    await TestBed.configureTestingModule({
      imports: [
        MatChipsModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule
      ],
      providers: [
        { provide: BookmarkService, useValue: mockBookmarkService }
      ],
      declarations: [PetfinderPetComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PetfinderPetComponent);
    component = fixture.componentInstance;

    component.pet = {
      "id": 56688070,
      "organization_id": "OH423",
      "url": "https://www.petfinder.com/cat/bonnie-56688070/oh/akron/summit-county-animal-control-department-oh423/?referrer_id=e7b6eea0-abdd-4ce1-bbf1-5aa43e1312f2",
      "type": "Cat",
      "species": "Cat",
      "breeds": {
        "primary": "Domestic Short Hair",
        "secondary": "",
        "mixed": false,
        "unknown": false
      },
      "colors": {
        "primary": "Gray",
        "secondary": "",
        "tertiary": ""
      },
      "age": "Young",
      "gender": "Female",
      "size": "Small",
      "coat": "Short",
      "attributes": {
        "spayed_neutered": false,
        "house_trained": false,
        "declawed": false,
        "special_needs": false,
        "shots_current": false
      },
      "environment": {
        "children": false,
        "dogs": false,
        "cats": false
      },
      "tags": [],
      "name": "BONNIE",
      "description": "",
      "organization_animal_id": "A016198",
      "photos": [
        {
          "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/56688070/1/?bust=1660665013&width=100",
          "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/56688070/1/?bust=1660665013&width=300",
          "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/56688070/1/?bust=1660665013&width=600",
          "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/56688070/1/?bust=1660665013"
        }
      ],
      "primary_photo_cropped": {
        "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/56688070/1/?bust=1660665013&width=300",
        "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/56688070/1/?bust=1660665013&width=450",
        "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/56688070/1/?bust=1660665013&width=600",
        "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/56688070/1/?bust=1660665013"
      },
      "videos": [{ "href": "" }],
      "status": "adoptable",
      "status_changed_at": new Date("2022-08-16T13:09:34+0000"),
      "published_at": new Date("2022-08-16T13:09:34+0000"),
      "distance": 89.9531,
      "contact": {
        "email": "cfatheree@summitoh.net",
        "phone": "(330) 643-2845",
        "address": {
          "address1": "250 Opportunity Parkway",
          "address2": "",
          "city": "Akron",
          "state": "OH",
          "postcode": "44304",
          "country": "US"
        }
      },
      "_links": {
        "self": {
          "href": "/v2/animals/56688070"
        },
        "type": {
          "href": "/v2/types/cat"
        },
        "organization": {
          "href": "/v2/organizations/oh423"
        }
      }
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
