import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetfinderPetComponent } from './petfinder-pet.component';

describe('PetfinderPetComponent', () => {
  let component: PetfinderPetComponent;
  let fixture: ComponentFixture<PetfinderPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetfinderPetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetfinderPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
