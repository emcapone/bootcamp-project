import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { PasswordMatchValidatorDirective } from './directives/password-match-validator.directive';
import { PasswordValidatorDirective } from './directives/password-validator.directive';
import { BirthdayValidatorDirective } from './directives/birthday-validator.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PasswordMatchValidatorDirective,
    PasswordValidatorDirective,
    BirthdayValidatorDirective
  ],
  exports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
