import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
});
