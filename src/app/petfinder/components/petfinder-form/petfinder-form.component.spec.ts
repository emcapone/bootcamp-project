import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';
import { PetfinderService } from '../../petfinder-service/petfinder.service';

import { PetfinderFormComponent } from './petfinder-form.component';

describe('PetfinderFormComponent', () => {
  let component: PetfinderFormComponent;
  let fixture: ComponentFixture<PetfinderFormComponent>;
  let mockPetfinderService;

  beforeEach(async () => {
    mockPetfinderService = {
      getBreeds: () => { return of(['Short-hair', 'Long-hair', 'Siamese']) },
      getTypes: () => { return of(['Dog', 'Cat', 'Rabbit']) },
      getPets: () => { return of() },
      getPetsLink: () => { return of() },
    }
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule
      ],
      providers: [
        { provide: PetfinderService, useValue: mockPetfinderService }
      ],
      declarations: [PetfinderFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PetfinderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('replaceChars', () => {
    it('should replace stand-alone ampersands with a dash', () => {
      const testString = 'This is a test. This & that are too.';

      const result = component.replaceChars(testString);

      expect(result).toBe('This is a test. This-that are too.');
    });
    it('should replace commas followed with a space with a dash', () => {
      const testString = 'This is a test, and that is too.'

      const result = component.replaceChars(testString);

      expect(result).toBe('This is a test-and that is too.');
    });
    it('should return an empty string if the input is null', () => {
      const testString = null;

      const result = component.replaceChars(testString);

      expect(result).toBe('');
    });
  });
});
