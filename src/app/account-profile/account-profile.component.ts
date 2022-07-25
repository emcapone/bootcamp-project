import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { tap, take } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { PasswordMatchValidator } from '../shared/directives/password-match-validator.directive';
import { User } from '../user';
import { UserService } from '../user.service';

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    if (control?.dirty && form?.invalid) {
      return true;
    }
    return false;
  }
}

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent implements OnInit {

  errorMatcher = new CrossFieldErrorMatcher();
  isLoading: boolean = true;
  userData!: User;
  settingsForm! : FormGroup;
  changePassword! : FormGroup;

  constructor(private dialog: MatDialog, private userService: UserService) {
    this.settingsForm = new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'birthday': new FormControl('', [Validators.required, this.birthdayValidator]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'currentPassword': new FormControl('', [Validators.required])
    });
    this.changePassword = new FormGroup({
      'newPassword': new FormControl('', [this.passwordValidator]),
      'confirmNewPassword': new FormControl()
    }, { validators: PasswordMatchValidator });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.userService.getUser(1).pipe(
      take(1),
      tap(user => this.userData = user)
    ).subscribe(_ => {
      this.fillData();
      this.isLoading = false;
    });
  }

  fillData(): void {
    if (this.userData) {
      this.firstName?.setValue(this.userData?.firstName);
      this.lastName?.setValue(this.userData?.lastName);
      this.birthday?.setValue(formatDate(this.userData?.birthday, 'yyyy-MM-dd', 'en-US'));
      this.email?.setValue(this.userData?.email);
    }
  }

  get firstName() {
    return this.settingsForm.get('firstName');
  }
  get lastName() {
    return this.settingsForm.get('lastName');
  }
  get birthday() {
    return this.settingsForm.get('birthday');
  }
  get email() {
    return this.settingsForm.get('email');
  }
  get newPassword() {
    return this.changePassword.get('newPassword');
  }
  get confirmNewPassword() {
    return this.changePassword.get('confirmNewPassword');
  }
  get currentPassword() {
    return this.settingsForm.get('currentPassword');
  }

  openDialog() {
    let dialog = this.dialog.open(ConfirmDialogComponent, {
      width: '50%',
      data: {
        title: 'Cancel Edits',
        message: 'Are you sure?'
      }
    });
    dialog.afterClosed().pipe(
      take(1)
    ).subscribe(res => {
      if (res) {
        this.reset();
      }
    });
  }

  reset(): void {
    this.settingsForm.reset();
    this.changePassword.reset();
    this.fillData();
  }

  onSubmit() {
    if (this.settingsForm.invalid && this.changePassword.invalid) {
      console.log("invalid");
    } else {
      console.log('valid');
      if (this.userData?.password === this.currentPassword?.value) {
        console.log('authenticated');
        let formValues = this.settingsForm.value;
        let user: User = {
            id: this.userData?.id,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            email: formValues.email,
            birthday: formValues.birthday,
            password: (this.newPassword?.value !== "" ? this.newPassword?.value as string : this.userData.password)
          }
        this.userService.updateUser(user).pipe(
          take(1)
        ).subscribe(_ => {
          this.getData();
          this.reset();
        });
      }
    }
  }

  birthdayValidator(control: AbstractControl): { [key: string]: boolean } | null {
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

  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value === null) {
      return { 'password': true };
    }
    let password = control.value as String;
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
  }

}
