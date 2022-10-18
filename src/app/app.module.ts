import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { PetFormComponent } from './pet-form/pet-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NewPetComponent } from './new-pet/new-pet.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AccountPetsComponent } from './account-pets/account-pets.component';
import { ViewPetComponent } from './view-pet/view-pet.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SharedModule } from './shared/shared.module';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { CalendarComponent } from './calendar/components/calendar/calendar.component';
import { CalendarContainerComponent } from './calendar/components/calendar-container/calendar-container.component';
import { EventFormComponent } from './calendar/components/event-form/event-form.component';
import { ViewEventComponent } from './calendar/components/view-event/view-event.component';
import { PetfinderFormComponent } from './petfinder/components/petfinder-form/petfinder-form.component';
import { PetfinderPetComponent } from './petfinder/components/petfinder-pet/petfinder-pet.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountProfileComponent,
    PetFormComponent,
    PageNotFoundComponent,
    NewPetComponent,
    EditPetComponent,
    MainNavComponent,
    AccountPetsComponent,
    ViewPetComponent,
    ConfirmDialogComponent,
    CalendarComponent,
    CalendarContainerComponent,
    EventFormComponent,
    ViewEventComponent,
    HomepageComponent,
    LoginFormComponent,
    SignupFormComponent,
    PetfinderFormComponent,
    PetfinderPetComponent,
    BookmarksComponent,
    FileUploadComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
