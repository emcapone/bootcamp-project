import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Location, formatDate } from '@angular/common';

import { FileLink } from '../file-upload/file-upload-response';
import { Pet, Vaccine, Prescription, Condition } from '../pet';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css']
})
export class PetFormComponent implements OnInit {
  @Input() pet: Pet | null | undefined;

  newPetForm!: FormGroup;
  submitted: boolean;

  vetRecordsLink!: FileLink | undefined;
  petPhotoLink!: FileLink | undefined;

  constructor(private fb: FormBuilder, private location: Location) {
    this.submitted = false;
    this.vetRecordsLink = this.pet?.vetRecords;
    this.petPhotoLink = this.pet?.petPhoto;
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
      prescriptions: this.fb.array([]),
      vaccines: this.fb.array([]),
      conditions: this.fb.array([])
    });
  }

  ngOnInit(): void {
    if (this.pet) {
      this.setFormValues(this.pet);
    }
  }

  setPetPhoto(event: FileLink) {
    this.petPhotoLink = event;
  }

  setVetRecords(event: FileLink) {
    this.vetRecordsLink = event;
  }

  setFormValues(pet: Pet): void {
    this.newPetForm.controls['name'].setValue(pet.name);
    this.newPetForm.controls['breed'].setValue(pet.breed);
    this.newPetForm.controls['color'].setValue(pet.color);
    this.newPetForm.controls['description'].setValue(pet.description);
    this.newPetForm.controls['microchip'].setValue(pet.microchip);
    this.newPetForm.controls['sex'].setValue(pet.sex);
    this.newPetForm.controls['fixed'].setValue(pet.fixed);
    this.newPetForm.controls['weight'].setValue(pet.weight);
    this.newPetForm.controls['birthday'].setValue(pet.birthday ? formatDate(pet.birthday, 'yyyy-MM-dd', 'en-US') : '');
    this.newPetForm.controls['adoptionDay'].setValue(pet.adoptionDay ? formatDate(pet.adoptionDay, 'yyyy-MM-dd', 'en-US') : '');
    if (pet.prescriptions) {
      for (let prescription of pet.prescriptions) {
        this.prescriptions().push(this.newDataPrescription(prescription.name, prescription.doctor, prescription.due, prescription.refills));
      }
    }
    if (pet.vaccines) {
      for (let vaccine of pet.vaccines) {
        this.vaccines().push(this.newDataVaccine(vaccine.name, vaccine.dateAdministered, vaccine.dueDate));
      }
    }
    if (pet.conditions) {
      for (let condition of pet.conditions) {
        this.conditions().push(this.newDataCondition(condition.name, condition.notes));
      }
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

  //Prescriptions
  prescriptions(): FormArray {
    return this.newPetForm.get('prescriptions') as FormArray;
  }
  newDataPrescription(name: string, doctor: string, due: Date, refills: number): FormGroup {
    return this.fb.group({
      prescriptionName: [name, Validators.required],
      prescriptionDoctor: [doctor, Validators.required],
      prescriptionDue: [formatDate(due, 'yyyy-MM-dd', 'en-US'), Validators.required],
      prescriptionRefills: [refills, Validators.required]
    })
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
  newDataVaccine(name: string, dateAdministered: Date, dueDate: Date): FormGroup {
    return this.fb.group({
      vaccineName: [name, Validators.required],
      vaccineAdministered: [formatDate(dateAdministered, 'yyyy-MM-dd', 'en-US'), Validators.required],
      vaccineDue: [formatDate(dueDate, 'yyyy-MM-dd', 'en-US'), Validators.required],
    })
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
  newDataCondition(name: string, notes?: string): FormGroup {
    return this.fb.group({
      conditionName: [name, Validators.required],
      conditionNotes: [notes, Validators.required]
    })
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
    this.newPetForm.markAllAsTouched();
    if (this.newPetForm.invalid) { return false; }

    //save pet Photo DB Link
    // save vet records DB Link

    let formValues = this.newPetForm.value;
    let prescriptions: Prescription[] = [];
    let index = 0;
    formValues.prescriptions?.forEach((x: { prescriptionName: string; prescriptionDoctor: string; prescriptionDue: Date; prescriptionRefills: number; }) => {
      prescriptions.push({
        id: index++,
        name: x.prescriptionName,
        doctor: x.prescriptionDoctor,
        due: x.prescriptionDue,
        refills: x.prescriptionRefills
      })
    });
    let vaccines: Vaccine[] = [];
    index = 0;
    formValues.vaccines?.forEach((x: { vaccineName: string; vaccineAdministered: Date; vaccineDue: Date; }) => {
      vaccines.push({
        id: index++,
        name: x.vaccineName,
        dateAdministered: x.vaccineAdministered,
        dueDate: x.vaccineDue
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
      id: 0,
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
      vetRecords: this.vetRecordsLink,
      petPhoto: this.petPhotoLink,
      prescriptions: prescriptions,
      vaccines: vaccines,
      conditions: conditions
    };
    return pet;
  }

  goBack(): void {
    this.location.back();
  }
}
