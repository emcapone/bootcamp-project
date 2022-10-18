import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NewPetComponent } from './new-pet/new-pet.component';
import { AccountPetsComponent } from './account-pets/account-pets.component';
import { ViewPetComponent } from './view-pet/view-pet.component';
import { CalendarContainerComponent } from './calendar/components/calendar-container/calendar-container.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PetfinderFormComponent } from './petfinder/components/petfinder-form/petfinder-form.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { PetsResolverService } from './account-pets/pets-resolver.service';
import { AuthGuard } from './auth.guard';
import { NoAuthGuard } from './no-auth.guard';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full'
  },
  {
    path: 'homepage',
    component: HomepageComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'petfinder',
        component: PetfinderFormComponent,
      },
      {
        path: 'profile',
        component: AccountProfileComponent,
      },
      {
        path: 'new-pet',
        component: NewPetComponent,
      },
      {
        path: 'pets',
        component: AccountPetsComponent,
        resolve: {
          pets: PetsResolverService
        },
      },
      {
        path: 'calendar',
        component: CalendarContainerComponent,
      },
      {
        path: 'bookmarks',
        component: BookmarksComponent,
      },
      {
        path: 'edit-pet/:id',
        component: EditPetComponent,
      },
      {
        path: 'view-pet/:id',
        component: ViewPetComponent,
      }
    ]
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
