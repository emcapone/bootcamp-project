import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]'
})
export class PasswordValidatorDirective {

  constructor() { }

}

export const PasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.value;
  if (password === null || password === "") {
    return null;
  }
  let capitalsValid = false;
  let numbersValid = false;
  let capitals = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  for (let x of capitals) {
    if (password.includes(x)) {
      capitalsValid = true;
    }
  }
  if (!capitalsValid) {
    return { 'password': true };
  }
  for (let x of numbers) {
    if (password.includes(x)) {
      numbersValid = true;
    }
  }
  if (!numbersValid) {
    return { 'password': true };
  }
  if ((password !== undefined) && (password.length < 8)) {
    return { 'password': true };
  }
  return null;
};
