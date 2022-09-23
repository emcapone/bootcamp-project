import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';

import { PetFormComponent } from './pet-form.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';

describe('PetFormComponent', () => {
  let component: PetFormComponent;
  let fixture: ComponentFixture<PetFormComponent>;
  let mockLocation, mockFormBuilder, mockFileUploadService;
  let formBuilder!: FormBuilder

  beforeEach(async () => {
    mockFileUploadService = jasmine.createSpyObj(['uploadPhoto', 'uploadPDF']);
    mockLocation = jasmine.createSpyObj(['back']);
    formBuilder = new FormBuilder();
    mockFormBuilder = {
      group: (input: any) => {
        return formBuilder.group(input);
      },
      array: (input: any[]) => { return formBuilder.array(input) }
    };

    await TestBed.configureTestingModule({
      imports: [
        MatCheckboxModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule
      ],
      providers: [
        { provide: Location, useValue: mockLocation },
        { provide: FormBuilder, useValue: mockFormBuilder }
      ],
      declarations: [PetFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
