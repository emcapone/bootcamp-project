import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appPostalCodeValidator]'
})
export class PostalCodeValidatorDirective {

  constructor() { }

}
export const PostalCodeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if(control.value === null || control.value === ""){
    return null;
  }
  if (isNaN(control.value) || (control.value.length !== 5)){
    return { postalCode: true };
  }
  return null;
}
