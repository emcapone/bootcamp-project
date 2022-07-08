import { Component, OnInit } from '@angular/core';
import { PETS } from '../mock-pets';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent implements OnInit {

  pets = PETS; 
  
  constructor() { }

  ngOnInit(): void {
  }

}
