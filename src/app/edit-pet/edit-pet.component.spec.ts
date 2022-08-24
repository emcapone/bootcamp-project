import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Pet } from '../pet';
import { PetService } from '../pet.service';

import { EditPetComponent } from './edit-pet.component';

describe('EditPetComponent', () => {
  let component: EditPetComponent;
  let fixture: ComponentFixture<EditPetComponent>;
  let mockMatDialog, mockPetService, mockRouter, mockActivatedRoute;
  let mockPet$;

  @Component({
    selector: 'app-pet-form',
    template: '<div></div>'
  })
  class FakePetFormComponent {
    @Input() pet: Pet | null | undefined;
  }

  beforeEach(async () => {
    mockPet$ = of({
      id: 4, name: 'Some Name', breed: 'Chinchilla', color: 'Gray', description: 'calm',
      sex: 'Female', fixed: false, weight: 6, petPhoto: '/assets/default.png'
    });
    mockMatDialog = jasmine.createSpyObj(['open', 'afterClosed']);
    mockPetService = {
      selectedPetChanged: () => { },
      updatePet: () => { },
      refreshPets: () => { },
      pet$: mockPet$
    };
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => { return '4' }
        }
      }
    }

    await TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: PetService, useValue: mockPetService }
      ],
      declarations: [
        EditPetComponent,
        FakePetFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
