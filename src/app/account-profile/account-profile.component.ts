import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap, take } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { BirthdayValidator } from '../shared/directives/birthday-validator.directive';
import { PasswordMatchValidator } from '../shared/directives/password-match-validator.directive';
import { PasswordValidator } from '../shared/directives/password-validator.directive';
import { User } from '../user';
import { UserService } from '../user.service';

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    if (control?.dirty && form?.invalid && form?.dirty) {
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

  @ViewChild('settingsFormDirective') settingsFormDirective!: FormGroupDirective;
  @ViewChild('passwordFormDirective') passwordFormDirective!: FormGroupDirective;

  errorMatcher = new CrossFieldErrorMatcher();
  isLoading: boolean = true;
  userData!: User;
  settingsForm!: FormGroup;
  passwordForm!: FormGroup;
  hideCurrent: boolean = true;
  hideNew: boolean = true;
  hideConfirm: boolean = true;

  constructor(private snackbar: MatSnackBar, private dialog: MatDialog, private userService: UserService) {
    this.settingsForm = new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'birthday': new FormControl('', [Validators.required, BirthdayValidator]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'currentPassword': new FormControl('', [Validators.required]),
    });
    this.passwordForm = new FormGroup({
      'newPassword': new FormControl('', [PasswordValidator]),
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
    });
  }

  fillData(): void {
    if (this.userData) {
      this.firstName?.setValue(this.userData?.firstName);
      this.lastName?.setValue(this.userData?.lastName);
      this.birthday?.setValue(formatDate(this.userData?.birthday, 'yyyy-MM-dd', 'en-US'));
      this.email?.setValue(this.userData?.email);
      this.isLoading = false;
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
    return this.passwordForm.get('newPassword');
  }
  get confirmNewPassword() {
    return this.passwordForm.get('confirmNewPassword');
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
        this.fillData();
      }
    });
  }

  reset(): void {
    this.settingsFormDirective.resetForm();
    this.passwordFormDirective.resetForm();
    this.isLoading = true;
  }

  onSubmit() {
    if (this.settingsForm.invalid) {
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
          password: ((this.newPassword?.value !== "" && this.newPassword?.value !== null) ? this.newPassword?.value as string : this.userData.password)
        }
        this.userService.updateUser(user).pipe(
          take(1)
        ).subscribe(_ => {
          this.reset();
          this.getData();
          this.snackbar.open('Changes Saved', 'Close', {
            duration: 3000,
            horizontalPosition: 'start',
            verticalPosition: 'bottom'
          });
        });
      } else {
        console.log('wrong password');
      }
    }
  }

}
