import { FormControl } from '@angular/forms';
import { PasswordValidator, PasswordValidatorDirective } from './password-validator.directive';

describe('PasswordValidatorDirective', () => {
  it('should create an instance', () => {
    const directive = new PasswordValidatorDirective();
    expect(directive).toBeTruthy();
  });

  describe('PasswordValidator', () => {
    it('should return null if the password is empty', () => {
      const password = new FormControl('');

      const validator = PasswordValidator(password);

      expect(validator).toBeNull();
    });

    it('should return null if the password is valid', () => {
      const password = new FormControl('Password123');

      const validator = PasswordValidator(password);

      expect(validator).toBeNull();
    });

    it('should return object { password: true } if the password has no capital letter', () => {
      const password = new FormControl('password123');

      const validator = PasswordValidator(password);

      expect(validator).toEqual({ password: true });
    });

    it('should return object { password: true } if the password has no number', () => {
      const password = new FormControl('Password');

      const validator = PasswordValidator(password);

      expect(validator).toEqual({ password: true });
    });

    it('should return object { password: true } if the password is less than 8 characters', () => {
      const password = new FormControl('Pass123');

      const validator = PasswordValidator(password);

      expect(validator).toEqual({ password: true });
    });
  })
});
