import { Component } from '@angular/core';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-account-pets',
  templateUrl: './account-pets.component.html',
  styleUrls: ['./account-pets.component.css']
})
export class AccountPetsComponent{

  pets$ = this.petService.apiRequestListItem$;

  constructor(private petService: PetService) {
  }

}
