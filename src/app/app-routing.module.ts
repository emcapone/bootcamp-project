import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NewPetComponent } from './new-pet/new-pet.component';
import { AccountPetsComponent } from './account-pets/account-pets.component';
import { ViewPetComponent } from './view-pet/view-pet.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'profile', component: AccountProfileComponent },
  { path: 'new-pet', component: NewPetComponent },
  { path: 'pets', component: AccountPetsComponent },
  { path: 'edit-pet/:id', component: EditPetComponent },
  { path: 'view-pet/:id', component: ViewPetComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
