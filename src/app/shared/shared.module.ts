import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { PasswordMatchValidatorDirective } from './directives/password-match-validator.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PasswordMatchValidatorDirective
  ],
  exports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
