import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetfinderFormComponent } from './petfinder-form.component';

describe('PetfinderFormComponent', () => {
  let component: PetfinderFormComponent;
  let fixture: ComponentFixture<PetfinderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetfinderFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetfinderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
