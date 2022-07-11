import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetFormComponent } from './pet-form/pet-form.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'profile', component: AccountProfileComponent },
  { path: 'new-pet', component: PetFormComponent },
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
