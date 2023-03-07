import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { PetFormComponent } from './pet-form/pet-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NewPetComponent } from './new-pet/new-pet.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AccountPetsComponent } from './account-pets/account-pets.component';
import { ViewPetComponent } from './view-pet/view-pet.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SharedModule } from './shared/shared.module';
import { HomepageComponent } from './homepage/homepage.component';
import { CalendarComponent } from './calendar/components/calendar/calendar.component';
import { CalendarContainerComponent } from './calendar/components/calendar-container/calendar-container.component';
import { EventFormComponent } from './calendar/components/event-form/event-form.component';
import { ViewEventComponent } from './calendar/components/view-event/view-event.component';
import { PetfinderFormComponent } from './petfinder/components/petfinder-form/petfinder-form.component';
import { PetfinderPetComponent } from './petfinder/components/petfinder-pet/petfinder-pet.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { AzureAdService } from './azure-ad.service';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

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
    PetfinderFormComponent,
    PetfinderPetComponent,
    BookmarksComponent,
    FileUploadComponent,
    ContactUsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    SharedModule,
    MsalModule.forRoot(new PublicClientApplication(
      {
        auth: {
          clientId: 'b3471f4b-bb28-4df5-9d75-2c8823d47d32',
          authority: 'https://login.microsoftonline.com/common',
          redirectUri: 'http://localhost:4200/'
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: isIE
        }
      }
    ),
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: ['user.read']
        }
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          ['https://graph.microsoft.com/v1.0/me', ['user.Read']],
          ['https://localhost:7007', ['api://c18d76c3-3121-420a-acdf-b31e13ab2952/access_as_user']]
        ])
      }
    )
  ],
  providers: [
    MsalGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    AzureAdService
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
