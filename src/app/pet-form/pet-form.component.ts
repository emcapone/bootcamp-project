import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css']
})
export class PetFormComponent implements OnInit {

  newPetForm: FormGroup;
  submitted: boolean;

  constructor(private fb: FormBuilder) {
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

  ngOnInit(): void { }

  get getPrescriptions(): FormArray {
    return this.newPetForm.get('prescriptions') as FormArray;
  }
  get getConditions(): FormArray {
    return this.newPetForm.get('conditions') as FormArray;
  }
  get getVaccines(): FormArray {
    return this.newPetForm.get('vaccines') as FormArray;
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
  }

}
