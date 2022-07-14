import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Pet } from '../pet';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-view-pet',
  templateUrl: './view-pet.component.html',
  styleUrls: ['./view-pet.component.css']
})
export class ViewPetComponent implements OnInit {

  private id: number;
  pet!: Pet;
  displayVetRecords: boolean=false;

  constructor(private petService: PetService, private route: ActivatedRoute, private location: Location) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {
    this.getPet(this.id);
  }

  getPet(id: number): void {
    this.petService.getPet(id).subscribe(pet => this.pet = pet);
  }

  delete(){
    this.petService.deletePet(this.id).subscribe();
    this.goBack();
  }
  goBack(): void {
    this.location.back();
  }
  toggle(){
    this.displayVetRecords = !this.displayVetRecords
  }
}
