import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { Credentials } from '../credentials';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  @Input() isLoading = false;
  @Input() success = false;
  @Input() error = false;

  @Output()
  user_id: EventEmitter<number> = new EventEmitter();

  loginForm!: FormGroup;
  hide: boolean = true;
  submitted: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  reset(): void {
    this.submitted = false;
    this.error = false;
    this.isLoading = false;
    this.success = false;
    this.loginForm.reset();
  }

  login(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.isLoading = true;
      let credentials: Credentials = {
        email: this.email?.value,
        password: this.password?.value
      }
      this.userService.login(credentials).pipe(
        catchError(err => {
          if (err.status === 404) {
            this.isLoading = false;
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
