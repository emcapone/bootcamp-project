import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { Pet, Vaccine, Prescription, Condition } from '../pet';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css']
})
export class PetFormComponent implements OnInit {

  newPetForm!: FormGroup;
  submitted: boolean;
  pet!: Pet;
  update: boolean;
  private id: number;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private petService: PetService, private location: Location) {
    this.id = -1;
    this.update = false;
    this.submitted = false;
    this.newPetForm = this.fb.group({
      name: ['', Validators.required],
      breed: ['', Validators.required],
      color: ['', Validators.required],
      description: ['', Validators.required],
      microchip: [''],
      sex: ['', Validators.required],
      fixed: [''],
      weight: [''],
      birthday: [''],
      adoptionDay: [''],
      vetRecords: [''],
      petPhoto: ['', Validators.required],
      prescriptions: this.fb.array([]),
      vaccines: this.fb.array([]),
      conditions: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.getPet(this.id);
      this.update = true;
    }
  }

  getErrorMessage(s: string, s2?: string, num?: number) {
    if (s2 != undefined && num != undefined) {
      let subForm = this.newPetForm.get(s2) as FormArray;
      if (subForm.at(num).get(s)?.errors?.['required']) {
        return 'You must enter a value';
      }
    } else if (this.newPetForm.get(s)?.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  async getPet(id: number) {
    this.petService.getPet(id).subscribe(pet => this.pet = pet);
    await lastValueFrom(this.petService.getPet(id));
    this.fillForm();
  }
  get getPrescriptions(): FormArray {
    return this.newPetForm.get('prescriptions') as FormArray;
  }
  get getConditions(): FormArray {
    return this.newPetForm.get('conditions') as FormArray;
  }
  get getVaccines(): FormArray {
    return this.newPetForm.get('vaccines') as FormArray;
  }

  fillForm(): void {
    this.newPetForm = this.fb.group({
      name: [this.pet.name, Validators.required],
      breed: [this.pet.breed, Validators.required],
      color: [this.pet.color, Validators.required],
      description: [this.pet.description, Validators.required],
      microchip: [this.pet.microchip],
      sex: [this.pet.sex, Validators.required],
      fixed: [this.pet.fixed],
      weight: [this.pet.weight],
      birthday: [(this.pet.birthday) ? formatDate(this.pet.birthday, 'yyyy-MM-dd', 'en-US') : ''],
      adoptionDay: [(this.pet.adoptionDay) ? formatDate(this.pet.adoptionDay, 'yyyy-MM-dd', 'en-US') : ''],
      vetRecords: [''], // TO-DO
      petPhoto: [''], // TO-DO
      prescriptions: this.fb.array([]),
      vaccines: this.fb.array([]),
      conditions: this.fb.array([])
    });
    this.pet.prescriptions?.forEach(x => {
      (this.newPetForm.get('prescriptions') as FormArray)
        .push(this.fb.group({
          prescriptionName: [x.name, Validators.required],
          prescriptionDoctor: [x.doctor, Validators.required],
          prescriptionDue: [formatDate(x.due, 'yyyy-MM-dd', 'en-US'), Validators.required],
          prescriptionRefills: [x.refills, Validators.required],
        }))
    });
    this.pet.vaccines?.forEach(x => {
      (this.newPetForm.get('vaccines') as FormArray)
        .push(this.fb.group({
          vaccineName: [x.name, Validators.required],
          vaccineAdministered: [formatDate(x.dateAdministered, 'yyyy-MM-dd', 'en-US'), Validators.required],
          vaccineDue: [formatDate(x.dueDate, 'yyyy-MM-dd', 'en-US'), Validators.required],
        }))
    });
    this.pet.conditions?.forEach(x => {
      (this.newPetForm.get('conditions') as FormArray)
        .push(this.fb.group({
          conditionName: [x.name, Validators.required],
          conditionNotes: [x.notes, Validators.required],
        }))
    });
  }

  //Prescriptions
  prescriptions(): FormArray {
    return this.newPetForm.get('prescriptions') as FormArray;
  }
  newPrescription(): FormGroup {
    return this.fb.group({
      prescriptionName: ['', Validators.required],
      prescriptionDoctor: ['', Validators.required],
      prescriptionDue: ['', Validators.required],
      prescriptionRefills: ['', Validators.required]
    })
  }
  addPrescription() {
    this.prescriptions().push(this.newPrescription());
  }
  removePrescription(i: number) {
    this.prescriptions().removeAt(i);
  }
  //Vaccines
  vaccines(): FormArray {
    return this.newPetForm.get('vaccines') as FormArray;
  }
  newVaccine(): FormGroup {
    return this.fb.group({
      vaccineName: ['', Validators.required],
      vaccineAdministered: ['', Validators.required],
      vaccineDue: ['', Validators.required]
    })
  }
  addVaccine() {
    this.vaccines().push(this.newVaccine());
  }
  removeVaccine(i: number) {
    this.vaccines().removeAt(i);
  }
  //Conditions
  conditions(): FormArray {
    return this.newPetForm.get('conditions') as FormArray;
  }
  newCondition(): FormGroup {
    return this.fb.group({
      conditionName: ['', Validators.required],
      conditionNotes: ['']
    })
  }
  addCondition() {
    this.conditions().push(this.newCondition());
  }
  removeCondition(i: number) {
    this.conditions().removeAt(i);
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.newPetForm.value);
    if (this.newPetForm.invalid) { return false; }

    let formValues = this.newPetForm.value;
    let prescriptions: Prescription[] = [];
    let index = 0;
    formValues.prescriptions?.forEach((x: { name: string; prescribingDoctor: string; dueDate: Date; refills: number; }) => {
      prescriptions.push({
        id: index++,
        name: x.name,
        doctor: x.prescribingDoctor,
        due: x.dueDate,
        refills: x.refills
      })
    });
    let vaccines: Vaccine[] = [];
    index = 0;
    formValues.vaccines?.forEach((x: { name: string; dateAdministered: Date; dueDate: Date; }) => {
      vaccines.push({
        id: index++,
        name: x.name,
        dateAdministered: x.dateAdministered,
        dueDate: x.dueDate
      })
    });
    let conditions: Condition[] = [];
    index = 0;
    formValues.conditions.forEach((x: { conditionName: string; conditionNotes: string; }) => {
      conditions.push({
        id: index++,
        name: x.conditionName,
        notes: x.conditionNotes
      })
    });
    let pet: Pet = {
      id: this.id,
      name: formValues.name,
      breed: formValues.breed,
      color: formValues.color,
      description: formValues.description,
      microchip: formValues.microchip,
      sex: formValues.sex,
      fixed: formValues.fixed,
      weight: formValues.weight,
      birthday: formValues.birthday,
      adoptionDay: formValues.adoptionDay,
      vetRecords: formValues.vetRecords,
      petPhoto: formValues.petPhoto,
      prescriptions: prescriptions,
      vaccines: vaccines,
      conditions: conditions
    };
    if (this.newPetForm.valid) {
      if (this.update){
        this.petService.updatePet(pet)
          .subscribe(() => this.goBack());
      } else {
        this.petService.addPet(pet)
          .subscribe(() => this.goBack());
      }
    };
    return false;
  }

  goBack(): void {
    this.location.back();
  }
}
