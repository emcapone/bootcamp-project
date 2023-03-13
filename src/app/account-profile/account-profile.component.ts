import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { AzureAdService } from '../azure-ad.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { PawssierUser } from '../pawssier-user';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent {
  userProfile$ = this.azureAdService.user$;

  //TO-DO: Use isLoading with future back-end observable
  isLoading: boolean = true;
  userID: string | null = null;
  profileForm!: FormGroup;

  constructor(private azureAdService: AzureAdService, private snackbar: MatSnackBar, private dialog: MatDialog) {
    this.profileForm = new FormGroup({
      'preferredFirstName': new FormControl(''),
      'username': new FormControl('')
    });
  }

  openDialog() {
    let dialog = this.dialog.open(ConfirmDialogComponent, {
      width: '50%',
      data: {
        title: 'Cancel Edits',
        message: 'Are you sure?'
      }
    });
    dialog.afterClosed().pipe(
      take(1)
    ).subscribe(res => {
      if (res) {
        this.reset();
      }
    });
  }

  reset(): void {
    this.profileForm.reset();
    this.isLoading = true;
  }

  getData(): void {
    if(this.userID === null) {
      this.reset();
    } else {
      // TO-DO: Fill with current values
      this.profileForm.controls['preferredFirstName'].setValue("Em");
      this.profileForm.controls['username'].setValue("catluvr12");
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      if (this.profileForm.controls['displayName'].dirty || this.profileForm.controls['preferredFirstName'].dirty) {
        if (this.userID) {
          let formValues = this.profileForm.value;
          let user: PawssierUser = {
            id: "1",
            preferredFirstName: formValues.preferredFirstName,
            username: formValues.displayName
          }
          /*TO-DO: send changes to back-end*/
        } else {
          alert("no user id");
        }
      } else {
        alert("no changes were made to save");
      }
    } else {
      alert("invalid");
    }
  }
}
