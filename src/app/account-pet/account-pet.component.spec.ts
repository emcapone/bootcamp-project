import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPetComponent } from './account-pet.component';

describe('AccountPetComponent', () => {
  let component: AccountPetComponent;
  let fixture: ComponentFixture<AccountPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
