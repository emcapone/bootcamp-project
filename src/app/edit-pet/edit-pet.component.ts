import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { PetFormComponent } from '../pet-form/pet-form.component';
import { PetService } from '../pet.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent implements OnInit {
  @ViewChild(PetFormComponent) form!: PetFormComponent;

  pet$ = this.petService.pet$;
  loaded : boolean = false;

  constructor(private dialog: MatDialog, private petService: PetService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.petService.selectedPetChanged(Number(this.route.snapshot.paramMap.get('id')));
  }

  submit(): void {
    const pet = this.form.onSubmit();
    if (pet) {
      pet.id = Number(this.route.snapshot.paramMap.get('id'));
      this.petService.updatePet(pet)
        .pipe(
          take(1)
        )
        .subscribe(_ => {
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
      if(res){
        this.cancel();
      }
    });
  }
}
