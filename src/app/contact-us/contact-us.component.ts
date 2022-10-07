import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, EMPTY } from 'rxjs';
import { MessageService } from './message.service';
import { Message } from './message';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  contactForm!: FormGroup;
  submitted = false;
  isLoading = false;
  success = false;
  error = false;

  constructor(private messageService: MessageService) {
    this.contactForm = new FormGroup({
      category: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }
  get category() {
    return this.contactForm.get('category');
  }
  get subject() {
    return this.contactForm.get('subject');
  }
  get body() {
    return this.contactForm.get('body');
  }
  get email() {
    return this.contactForm.get('email');
  }

  reset(): void {
    this.submitted = false;
    this.isLoading = false;
    this.success = false;
    this.error = false;
  }

  submit(): void {
    this.submitted = true;
    if(this.contactForm.valid) {
      this.isLoading = true;
      let message: Message = {
        email: this.email?.value,
        category: this.category?.value,
        subject: this.subject?.value,
        body: this.body?.value
      };
      this.messageService.postMessage(message).pipe(
        catchError(_ => {
          this.error = true;
          return EMPTY;
        })
      ).subscribe(res => {
        if(res) {
          this.success = true;
        }
      });
      setTimeout(() => this.success = true, 2000);
    }
  }

}
