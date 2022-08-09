import { Component } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';

import { PetService } from '../pet.service';

@Component({
  selector: 'app-account-pets',
  templateUrl: './account-pets.component.html',
  styleUrls: ['./account-pets.component.css']
})
export class AccountPetsComponent {

  pets$ = this.petService.pets$
    .pipe(
      catchError(err => {
        console.log(err);
        return EMPTY;
      })
    );

  constructor(private petService: PetService) { }

}
