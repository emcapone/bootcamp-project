import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appBirthdayValidator]'
})
export class BirthdayValidatorDirective {

  constructor() { }

}
export const BirthdayValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  let currentDate = new Date();
  let birthday = new Date(control.value);
  let age = currentDate.getFullYear() - birthday.getFullYear();
  if (!(currentDate.getMonth() >= birthday.getMonth() && currentDate.getDate() >= birthday.getDate())) {
    age--;
  }
  if ((control.value !== undefined) && (age < 16)) {
    return { 'birthday': true }
  }
  return null;
}
