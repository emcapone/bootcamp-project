import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-account-pet',
  templateUrl: './account-pet.component.html',
  styleUrls: ['./account-pet.component.css']
})
export class AccountPetComponent implements OnInit {

  newPetForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.newPetForm = this.fb.group({
      name: [''],
      breed: [''],
      color: [''],
      description: [''],
      microchip: [''],
      male: [''],
      female: [''],
      fixed: [''],
      weight: [''],
      birthday: [''],
      adoptionDay: [''],
      vetRecords: [''],
      petPhoto: [''],
      prescriptions: this.fb.array([this.newPrescription]),
      vaccines: this.fb.array([]),
      conditions: this.fb.array([])
    });
  }

  ngOnInit(): void {
  }

  prescriptions(): FormArray {
    return this.newPetForm.get('prescriptions') as FormArray;
  }
  newPrescription(): FormGroup {
    return this.fb.group({
      prescriptionName: '',
      prescriptionDoctor: '',
      prescriptionDue: '',
      prescriptionRefills: ''
    })
  }
  addPrescription() {
    this.prescriptions().push(this.newPrescription());
  }
  removePrescription(i:number) {
    this.prescriptions().removeAt(i);
  }

  createVaccine(): FormGroup {
    return this.fb.group({
      vaccineName: [''],
      vaccineAdministered: [''],
      vaccineDue: ['']
    })
  }
  createCondition(): FormGroup {
    return this.fb.group({
      conditionName: [''],
      conditionNotes: ['']
    })
  }

  onSubmit() {
    console.log(this.newPetForm.value);
  }

}
