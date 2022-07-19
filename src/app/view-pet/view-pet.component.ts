import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

import { PetService } from '../pet.service';

@Component({
  selector: 'app-view-pet',
  templateUrl: './view-pet.component.html',
  styleUrls: ['./view-pet.component.css']
})
export class ViewPetComponent implements OnInit {

  pet$ = this.petService.pet$;
  displayVetRecords: boolean = false;

  constructor(private router: Router, private petService: PetService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.petService.selectedPetChanged(Number(this.route.snapshot.paramMap.get('id')));
  }

  delete() {
    this.petService.deletePet(Number(this.route.snapshot.paramMap.get('id')))
      .pipe(
        take(1)
      )
      .subscribe(_ => this.router.navigate(['pets']));
  }

  toggle() {
    this.displayVetRecords = !this.displayVetRecords
  }
}
