import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, Subscription, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { PetFormComponent } from '../pet-form/pet-form.component';
import { PetService } from '../pet.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Pet } from '../pet';

@Component({
  selector: 'app-new-pet',
  templateUrl: './new-pet.component.html',
  styleUrls: ['./new-pet.component.css']
})
export class NewPetComponent implements OnDestroy {
  @ViewChild(PetFormComponent) form!: PetFormComponent;

  sub: Subscription | undefined;

  constructor(private dialog: MatDialog, private petService: PetService, private router: Router) { }

  ngOnDestroy(): void {
    if (this.sub)
      this.sub.unsubscribe();
  }

  submit() {
    let pet = this.form.onSubmit() as Pet;
    if (pet) {
      pet.id = undefined;

      this.sub = this.petService.addPet(pet).pipe(
        concatMap(resPet => {
          pet.id = resPet.id
          this.form.petPhotoComponent.petId = resPet.id;
          return this.form.petPhotoComponent.createObservable();
        }),
        concatMap(petPhoto => {
          pet.petPhoto = petPhoto;
          this.form.vetRecordComponent.petId = pet.id;
          return this.form.vetRecordComponent.createObservable();
        }),
        concatMap(vetRecord => {
          pet.vetRecords = vetRecord;
          return this.petService.updatePet(pet);
        })
      ).subscribe(_ => {
        this.petService.refreshPets();
        this.router.navigate(['view-pet', pet.id])
      });

    }
  }

  cancel() {
    this.router.navigate(['pets']);
  }

  openDialog() {
    let dialog = this.dialog.open(ConfirmDialogComponent, {
      width: '50%',
      data: {
        title: 'Cancel New Pet Profile',
        message: 'Are you sure?'
      }
    });
    dialog.afterClosed().pipe(
      take(1)
    ).subscribe(res => {
      if (res) {
        this.cancel();
      }
    });
  }
}
