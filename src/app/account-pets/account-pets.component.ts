import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PetListItem } from '../pet-list-item';

@Component({
  selector: 'app-account-pets',
  templateUrl: './account-pets.component.html',
  styleUrls: ['./account-pets.component.css']
})
export class AccountPetsComponent implements OnInit{

  apiUrl = environment.apiUrl + '/';
  pets!: PetListItem[];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.pets = this.activatedRoute.snapshot.data['pets'];
  }

}
