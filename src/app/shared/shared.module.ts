import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { PasswordMatchValidatorDirective } from './directives/password-match-validator.directive';
import { PasswordValidatorDirective } from './directives/password-validator.directive';
import { BirthdayValidatorDirective } from './directives/birthday-validator.directive';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { PostalCodeValidatorDirective } from './directives/postal-code-validator.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PasswordMatchValidatorDirective,
    PasswordValidatorDirective,
    BirthdayValidatorDirective,
    TimeFormatPipe,
    PostalCodeValidatorDirective
  ],
  exports: [
    CommonModule,
    MaterialModule,
    TimeFormatPipe
  ]
})
export class SharedModule { }
