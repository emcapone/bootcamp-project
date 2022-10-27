import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PetListItem } from '../pet-list-item';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-account-pets',
  templateUrl: './account-pets.component.html',
  styleUrls: ['./account-pets.component.css']
})
export class AccountPetsComponent implements OnInit, OnDestroy{

  apiUrl = environment.apiUrl + '/';
  pets!: PetListItem[];
  sub!: Subscription;

  constructor(private petService: PetService) { }

  ngOnInit() {
    this.sub = this.petService.pets$.subscribe(pets => this.pets = pets);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
