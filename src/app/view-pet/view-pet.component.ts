import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

import { PetService } from '../pet.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-pet',
  templateUrl: './view-pet.component.html',
  styleUrls: ['./view-pet.component.css']
})
export class ViewPetComponent implements OnInit {

  apiUrl = environment.apiUrl + '/';
  pet$ = this.petService.pet$;
  displayVetRecords: boolean = false;

  constructor(private dialog: MatDialog, private router: Router, private petService: PetService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.petService.selectedPetChanged(Number(this.route.snapshot.paramMap.get('id')));
  }

  delete() {
    this.petService.deletePet(Number(this.route.snapshot.paramMap.get('id')))
      .pipe(
        take(1)
      )
      .subscribe(_ => {
        this.petService.refreshPets();
        this.router.navigate(['pets'])
      });
  }

  toggle() {
    this.displayVetRecords = !this.displayVetRecords
  }

  openDialog(name: string) {
    let dialog = this.dialog.open(ConfirmDialogComponent, {
      width: '50%',
      data: {
        title: 'Delete Profile: ' + name,
        message: 'This action cannot be undone. Are you sure?'
      }
    });
    dialog.afterClosed().pipe(
      take(1)
    ).subscribe(res => {
      if(res){
        this.delete();
      }
    });
  }
}
