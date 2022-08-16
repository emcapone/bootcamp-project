import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { UserService } from '../user.service';

import { AccountProfileComponent } from './account-profile.component';

describe('AccountProfileComponent', () => {
  let component: AccountProfileComponent;
  let fixture: ComponentFixture<AccountProfileComponent>;
  let mockMatSnackBar, mockMatDialog, mockUserService;

  beforeEach(async () => {
    mockMatSnackBar = jasmine.createSpyObj(['open']);
    mockMatDialog = jasmine.createSpyObj(['open', 'afterClosed']);
    mockMatDialog.afterClosed.and.returnValue(of());
    mockUserService = jasmine.createSpyObj(['getUser', 'updateUser']);
    mockUserService.getUser.and.returnValue(of());
    mockUserService.updateUser.and.returnValue(of());

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule
      ],
      providers: [
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: UserService, useValue: mockUserService },
        { provide: MatSnackBar, useValue: mockMatSnackBar }
      ],
      declarations: [AccountProfileComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccountProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
