import { Component, OnInit, Query, Type } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PetfinderService } from '../../petfinder-service/petfinder.service';
import { take } from 'rxjs';
import { Parameters, Pets, Details } from '../../petfinder-service/models';

@Component({
  selector: 'app-petfinder-form',
  templateUrl: './petfinder-form.component.html',
  styleUrls: ['./petfinder-form.component.css']
})
export class PetfinderFormComponent implements OnInit {

  types!: Details[];
  breeds: string[] = [];
  resultsPage: number = 1;
  pets!: Pets;

  mainGroup = new FormGroup({
    type: new FormControl(null, Validators.required),
    location: new FormControl('', Validators.required),
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
    this.petfinder.getBreeds(this.types[this.selectedType]._links.breeds.href)
      .subscribe(res => {
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
      type: this.mainGroup.controls.type.value ? this.types[this.mainGroup.controls.type.value].name : '',
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
      page: this.resultsPage
    }
    this.petfinder.getPets(parameters).pipe(
      take(1)
    ).subscribe(res => this.pets = res);
  }

}
