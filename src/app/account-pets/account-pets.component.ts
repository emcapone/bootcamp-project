import { Component, OnInit } from '@angular/core';

import { Pet } from '../pet';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-account-pets',
  templateUrl: './account-pets.component.html',
  styleUrls: ['./account-pets.component.css']
})
export class AccountPetsComponent implements OnInit {

  pets: Pet[] = [];

  constructor(private petService: PetService) { }

  ngOnInit(): void {
    this.getPets();
  }

  getPets(): void {
    this.petService.getPets().subscribe(pets => this.pets = pets);
  }

}
