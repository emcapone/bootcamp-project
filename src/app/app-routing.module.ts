import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPetComponent } from './account-pet/account-pet.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'account-profile', component: AccountProfileComponent },
  { path: 'account-pet', component: AccountPetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
