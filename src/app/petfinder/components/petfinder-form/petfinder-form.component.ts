import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PetfinderService } from '../../petfinder-service/petfinder.service';
import { take } from 'rxjs';
import { Parameters, PetfinderPets, TypesDetails } from '../../petfinder-service/models';
import { PostalCodeValidator } from 'src/app/shared/directives/postal-code-validator.directive';

@Component({
  selector: 'app-petfinder-form',
  templateUrl: './petfinder-form.component.html',
  styleUrls: ['./petfinder-form.component.css']
})
export class PetfinderFormComponent implements OnInit {

  types!: TypesDetails[];
  breeds: string[] = [];

  pets!: PetfinderPets | undefined;
  currentPage: number = 1;
  totalPages: number = 0;
  nextPageLink: string = '';
  previousPageLink: string = '';

  isLoading: boolean = true;

  mainGroup = new FormGroup({
    type: new FormControl(null, Validators.required),
    location: new FormControl('', [Validators.required, PostalCodeValidator]),
    distance: new FormControl("100", Validators.required)
  })
  get selectedType(): number {
    if (this.mainGroup.controls.type.value) {
      return this.mainGroup.controls.type.value;
    }
    return 0;
  }

  options = new FormGroup({
    breed: new FormControl(''),
    age: new FormControl(''),
    size: new FormControl(''),
    coat: new FormControl(''),
    color: new FormControl(''),
    gender: new FormControl(''),
    declawed: new FormControl(false),
    specialNeeds: new FormControl(false),
    goodWithChildren: new FormControl(false),
    goodWithDogs: new FormControl(false),
    goodWithCats: new FormControl(false),
    houseTrained: new FormControl(false)
  });

  constructor(private petfinder: PetfinderService) { }

  ngOnInit(): void {
    this.petfinder.getTypes().pipe(
      take(1)
    ).subscribe(res => {
      this.types = res.types;
    });
  }

  getBreeds() {
    this.petfinder.getBreeds(this.types[this.selectedType]._links.breeds.href).pipe(
      take(1)
    ).subscribe(res => {
      this.breeds = [];
      res.breeds.forEach(x => this.breeds.push(x.name));
    });
  }

  search() {
    if (this.mainGroup.invalid) {
      console.log('invalid form');
      return;
    }
    let parameters: Parameters = {
      type: (this.mainGroup.controls.type.value === null) ? '' : this.replaceChars(this.types[this.mainGroup.controls.type.value].name),
      breed: this.options.controls.breed.value || '',
      size: this.options.controls.size.value || '',
      gender: this.options.controls.gender.value || '',
      age: this.options.controls.age.value || '',
      color: this.options.controls.color.value || '',
      coat: this.options.controls.coat.value || '',
      good_with_children: this.options.controls.goodWithChildren.value || null,
      good_with_dogs: this.options.controls.goodWithDogs.value || null,
      good_with_cats: this.options.controls.goodWithCats.value || null,
      house_trained: this.options.controls.houseTrained.value || null,
      declawed: this.options.controls.declawed.value || null,
      special_needs: this.options.controls.specialNeeds.value || false,
      location: this.mainGroup.controls.location.value || '',
      distance: this.mainGroup.controls.distance.value || '',
      page: 1
    }
    this.petfinder.getPets(parameters).pipe(
      take(1)
    ).subscribe(res => {
      this.pets = res;
      this.totalPages = res.pagination.total_pages;
      if (res.pagination.total_pages > 1) {
        this.nextPageLink = res.pagination._links.next.href;
      }
      this.isLoading = false;
    });
  }

  previousPage(): void {
    this.isLoading = true;
    if (this.currentPage === 1) {
      return;
    }
    this.currentPage--;
    this.petfinder.getPetsLink(this.previousPageLink).pipe(
      take(1)
    ).subscribe(res => {
      this.pets = res;
      this.totalPages = res.pagination.total_pages;
      if (this.currentPage !== res.pagination.total_pages) {
        this.nextPageLink = res.pagination._links.next?.href;
      }
      if (this.currentPage !== 1) {
        this.previousPageLink = res.pagination._links.previous.href;
      }
      this.isLoading = false;
    });
  }

  nextPage(): void {
    this.isLoading = true;
    if (this.currentPage === this.totalPages) {
      return;
    }
    this.currentPage++;
    this.petfinder.getPetsLink(this.nextPageLink).pipe(
      take(1)
    ).subscribe(res => {
      this.pets = res;
      this.totalPages = res.pagination.total_pages;
      if (this.currentPage !== this.totalPages) {
        this.nextPageLink = res.pagination._links.next.href;
      }
      if (this.currentPage !== 1) {
        this.previousPageLink = res.pagination._links.previous.href;
      }
      this.isLoading = false;
    });
  }

  replaceChars(str: string | null): string {
    if (!str) {
      return "";
    }
    while (str.includes(' & ')) {
      str = str.replace(' & ', '-');
    }
    while (str.includes(', ')) {
      str = str.replace(', ', '-');
    }
    return str;
  }

}
