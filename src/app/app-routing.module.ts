import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPetComponent } from './account-pet/account-pet.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'profile', component: AccountProfileComponent },
  { path: 'new-pet', component: AccountPetComponent },
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
