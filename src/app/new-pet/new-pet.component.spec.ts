import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Pet } from '../pet';
import { PetService } from '../pet.service';

import { NewPetComponent } from './new-pet.component';

describe('NewPetComponent', () => {
  let component: NewPetComponent;
  let fixture: ComponentFixture<NewPetComponent>;
  let mockMatDialog, mockPetService, mockRouter;

  @Component({
    selector: 'app-pet-form',
    template: '<div></div>'
  })
  class FakePetFormComponent {
    @Input() pet: Pet | null | undefined;
  }

  beforeEach(async () => {
    mockMatDialog = jasmine.createSpyObj(['open', 'afterClosed']);
    mockPetService = jasmine.createSpyObj(['addPet', 'refreshPets']);
    mockRouter = jasmine.createSpyObj(['navigate']);

    await TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: Router, useValue: mockRouter },
        { provide: PetService, useValue: mockPetService }
      ],
      declarations: [
        NewPetComponent,
        FakePetFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NewPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
