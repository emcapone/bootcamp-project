import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginFormComponent } from '../login-form/login-form.component';
import { SignupFormComponent } from '../signup-form/signup-form.component';

import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  @Component({
    selector: 'app-signup-form',
    template: '<div></div>'
  })
  class FakeSignupFormComponent { }

  @Component({
    selector: 'app-login-form',
    template: '<div></div>'
  })
  class FakeLoginFormComponent { }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatTabsModule,
        NoopAnimationsModule
      ],
      declarations: [
        HomepageComponent,
        FakeSignupFormComponent,
        FakeLoginFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initially render the login component once', () => {
    const tab = fixture.debugElement.queryAll(By.css('.mat-tab-label'))[0].nativeElement;

    tab.click();

    const loginComponentDE = fixture.debugElement.queryAll(By.directive(FakeLoginFormComponent));
    expect(loginComponentDE.length).toBe(1);
  });

  it('should render the signup component when the tab is selected', () => {
    const tab = fixture.debugElement.queryAll(By.css('.mat-tab-label'))[1].nativeElement;

    tab.click();

    const signupComponentDE = fixture.debugElement.queryAll(By.directive(FakeLoginFormComponent));
    expect(signupComponentDE.length).toBe(1);
  });
});
