import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { PetFormComponent } from '../pet-form/pet-form.component';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-new-pet',
  templateUrl: './new-pet.component.html',
  styleUrls: ['./new-pet.component.css']
})
export class NewPetComponent implements OnInit {
  @ViewChild(PetFormComponent) form!: PetFormComponent;

  constructor(private petService: PetService, private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    const pet = this.form.onSubmit();
    if (pet){
      pet.id = 5;
      this.petService.addPet(pet)
            .pipe(
              take(1)
            )
            .subscribe(_ => this.router.navigate(['view-pet', pet.id]));
    }
    return false;
  }

  cancel() {
    this.router.navigate(['pets']);
  }
}
