import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPetsComponent } from './account-pets.component';

describe('AccountPetsComponent', () => {
  let component: AccountPetsComponent;
  let fixture: ComponentFixture<AccountPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
