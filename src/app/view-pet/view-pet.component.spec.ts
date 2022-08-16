import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { PetService } from '../pet.service';

import { ViewPetComponent } from './view-pet.component';

describe('ViewPetComponent', () => {
  let component: ViewPetComponent;
  let fixture: ComponentFixture<ViewPetComponent>;
  let mockMatDialog, mockPetService, mockRouter, mockActivatedRoute;
  let mockPet$;

  beforeEach(async () => {
    mockPet$ = of({
      id: 4, name: 'Some Name', breed: 'Chinchilla', color: 'Gray', description: 'calm',
      sex: 'Female', fixed: false, weight: 6, petPhoto: '/assets/default.png'
    });
    mockMatDialog = jasmine.createSpyObj(['open', 'afterClosed']);
    mockPetService = {
      selectedPetChanged: () => { },
      deletePet: () => { },
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
      imports: [
        MatTabsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: PetService, useValue: mockPetService }
      ],
      declarations: [ViewPetComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ViewPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
