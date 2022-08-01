import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

@Directive({
  selector: '[appPasswordMatchValidator]'
})
export class PasswordMatchValidatorDirective {

  constructor() { }

}

export const PasswordMatchValidator: ValidatorFn = (control: AbstractControl):

  ValidationErrors | null => {
  const password = control.get('newPassword');
  const duplicate = control.get('confirmNewPassword');
  if ((password?.value === "" || password?.value === null) && (duplicate?.value === "" || duplicate?.value === null)) {
    return null;
  }
  return password && duplicate && password.value === duplicate.value ? null : {
    passwordMatch: true
  };
};
