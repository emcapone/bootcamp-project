import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

import { Pet } from '../pet';
import { PetFormComponent } from '../pet-form/pet-form.component';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent implements OnInit {
  @ViewChild(PetFormComponent) form!: PetFormComponent;

  pet$ = this.petService.pet$;
  loaded : boolean = false;

  constructor(private petService: PetService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.petService.selectedPetChanged(Number(this.route.snapshot.paramMap.get('id')));
    let data: Pet | undefined;
    this.pet$
      .pipe(
        take(1)
      )
      .subscribe(pet => {
        if (pet) {
          this.form.setFormValues(pet);
        }
        this.loaded = true;
      });
  }

  submit(): void {
    const pet = this.form.onSubmit();
    if (pet) {
      pet.id = Number(this.route.snapshot.paramMap.get('id'));
      this.petService.updatePet(pet)
        .pipe(
          take(1)
        )
        .subscribe(_ => this.router.navigate(['view-pet', pet.id]));
    }
  }

  cancel() {
    this.router.navigate(['pets']);
  }
}
