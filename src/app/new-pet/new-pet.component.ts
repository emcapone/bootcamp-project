import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { PetFormComponent } from '../pet-form/pet-form.component';
import { PetService } from '../pet.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-pet',
  templateUrl: './new-pet.component.html',
  styleUrls: ['./new-pet.component.css']
})
export class NewPetComponent implements OnInit {
  @ViewChild(PetFormComponent) form!: PetFormComponent;

  constructor(private dialog: MatDialog, private petService: PetService, private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    const pet = this.form.onSubmit();
    if (pet) {
      pet.id = 5;
      this.petService.addPet(pet)
        .pipe(
          take(1)
        )
        .subscribe(_ => {
          this.petService.refreshPets();
          this.router.navigate(['view-pet', pet.id]);
        });
    }
    return false;
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
      if(res){
        this.cancel();
      }
    });
  }
}
