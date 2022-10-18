import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, filter, of, throwError } from 'rxjs';
import { BirthdayValidator } from '../shared/directives/birthday-validator.directive';
import { PasswordMatchValidator } from '../shared/directives/password-match-validator.directive';
import { PasswordValidator } from '../shared/directives/password-validator.directive';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {

  @Input() isLoading = false;
  @Input() success = false;
  @Input() error = false;

  signupForm!: FormGroup;
  password!: FormGroup;
  hideNew: boolean = true;
  hideConfirm: boolean = true;
  submitted: boolean = false;
  emailError: boolean = false;

  constructor(private userService: UserService, private router: Router) {
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
    this.submitted = true;
    if (this.signupForm.valid) {
      this.emailError = false;
      this.isLoading = true;
      let user: User = {
        firstName: this.firstName?.value,
        lastName: this.lastName?.value,
        birthday: this.birthday?.value,
        email: this.email?.value,
        password: this.password?.value
      }
      this.userService.signup(user).pipe(
        catchError(err => {
          if (err.status === 409) {
            this.isLoading = false;
            this.emailError = true;
            this.email?.setValue(undefined);
          } else {
            this.error = true;
            console.log(err);
          }
          return EMPTY;
        })
      ).subscribe(res => {
        if (res) {
          this.success = true;
          setTimeout(() => this.router.navigate(['pets']), 1000);
        }
      });
    }
  }

}
