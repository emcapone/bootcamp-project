import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PetService } from '../pet.service';

import { AccountPetsComponent } from './account-pets.component';

describe('AccountPetsComponent', () => {
  let component: AccountPetsComponent;
  let fixture: ComponentFixture<AccountPetsComponent>;
  let mockPetService, mockPets$;

  beforeEach(async () => {
    mockPets$ = of([{
      id: 2, name: 'Some Name', breed: 'Chinchilla', color: 'Gray', description: 'calm',
      sex: 'Female', fixed: false, weight: 6, petPhoto: '/assets/default.png'
    },
    {
      id: 3, name: 'Some Name', breed: 'Chinchilla', color: 'Gray', description: 'calm',
      sex: 'Female', fixed: false, weight: 6, petPhoto: '/assets/default.png'
    },
    {
      id: 4, name: 'Some Name', breed: 'Chinchilla', color: 'Gray', description: 'calm',
      sex: 'Female', fixed: false, weight: 6, petPhoto: '/assets/default.png'
    }]);
    mockPetService = {
      pets$: mockPets$
    }
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule
      ],
      providers: [
        { provide: PetService, useValue: mockPetService }
      ],
      declarations: [AccountPetsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
