import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, last, Subscription, take, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { PetFormComponent } from '../pet-form/pet-form.component';
import { PetService } from '../pet.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent implements OnInit, OnDestroy {
  @ViewChild(PetFormComponent) form!: PetFormComponent;

  pet$ = this.petService.pet$;
  sub!: Subscription;

  constructor(private dialog: MatDialog, private petService: PetService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.petService.selectedPetChanged(Number(this.route.snapshot.paramMap.get('id')));
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  submit(): void {
    const pet = this.form.onSubmit();
    if (pet) {
      pet.id = Number(this.route.snapshot.paramMap.get('id'));
      this.sub = concat(
        this.form.petPhotoObs.pipe(
          tap(res => {
            if (res)
              pet.petPhoto = res
          })
        ),
        this.form.vetRecordsObs.pipe(
          tap(res => {
            if (res)
              pet.vetRecords = res
          })
        ),
        this.petService.updatePet(pet)
      ).pipe(
        last()
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
        title: 'Cancel Edits',
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
