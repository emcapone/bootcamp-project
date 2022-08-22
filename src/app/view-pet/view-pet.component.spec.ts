import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, pipe } from 'rxjs';
import { Pet } from '../pet';
import { PetService } from '../pet.service';

import { ViewPetComponent } from './view-pet.component';

describe('ViewPetComponent', () => {
  let component: ViewPetComponent;
  let fixture: ComponentFixture<ViewPetComponent>;
  let mockMatDialog, mockPetService: any, mockRouter, mockActivatedRoute;

  beforeEach(async () => {
    mockMatDialog = jasmine.createSpyObj(['open', 'afterClosed']);
    mockPetService = jasmine.createSpyObj(['selectedPetChanged', 'deletePet', 'refreshPets'], {
      'pet$': of({
        id: 4, name: 'Some Name', breed: 'Chinchilla', color: 'Gray', description: 'calm',
        sex: 'Female', fixed: false, weight: 6, petPhoto: '/assets/default.png'
      })
    });
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

  it('should render the pet name in an h1 tag', () => {
    fixture.componentInstance.pet$ = mockPetService.pet$;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Some Name');
  });

  describe('deletePet', () => {
    it('should delete correct pet from the service', () => {
      mockPetService.deletePet.and.returnValue(of());
      fixture.detectChanges();
      fixture.componentInstance.delete();

      expect(mockPetService.deletePet).toHaveBeenCalledWith(4);
    })
  });

});
