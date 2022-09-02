import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BirthdayValidator } from '../shared/directives/birthday-validator.directive';
import { PasswordMatchValidator } from '../shared/directives/password-match-validator.directive';
import { PasswordValidator } from '../shared/directives/password-validator.directive';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {

  signupForm!: FormGroup;
  password!: FormGroup;
  hideNew: boolean = true;
  hideConfirm: boolean = true;
  submitted: boolean = false;
  emailError: boolean = false;

  constructor() {
    this.signupForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required]),
      'lastName': new FormControl('', [Validators.required]),
      'birthday': new FormControl('', [Validators.required, BirthdayValidator]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormGroup({
        'newPassword': new FormControl('', [Validators.required, PasswordValidator]),
        'confirmNewPassword': new FormControl('', [Validators.required])
      }, { validators: PasswordMatchValidator })
    });
  }

  get passwordGroup() {
    return this.signupForm.get('password') as FormGroup;
  }
  get firstName() {
    return this.signupForm.get('firstName');
  }
  get lastName() {
    return this.signupForm.get('lastName');
  }
  get birthday() {
    return this.signupForm.get('birthday');
  }
  get email() {
    return this.signupForm.get('email');
  }
  get newPassword() {
    return this.signupForm.get('password')?.get('newPassword');
  }
  get confirmNewPassword() {
    return this.signupForm.get('password')?.get('confirmNewPassword');
  }

  signup(): void {
    //If valid, check with API that email is available for an account then submit
    this.submitted = true;
    if (this.signupForm.invalid) {
      console.log('invalid');
      return;
    }
    console.log('valid');
  }

}
