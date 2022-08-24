import { FormControl, FormGroup } from '@angular/forms';
import { PasswordMatchValidator, PasswordMatchValidatorDirective } from './password-match-validator.directive';

describe('PasswordMatchValidatorDirective', () => {
  it('should create an instance', () => {
    const directive = new PasswordMatchValidatorDirective();
    expect(directive).toBeTruthy();
  });

  describe('PasswordMatchValidator', () => {
    it('should return null if the passwords match', () => {
      const controls = new FormGroup({
        newPassword: new FormControl('Password123'),
        confirmNewPassword: new FormControl('Password123')
      });

      const validator = PasswordMatchValidator(controls);

      expect(validator).toBeNull();
    });

    it('should return null if the newPassword and the confirmNewPassword controls are empty', () => {
      const controls = new FormGroup({
        newPassword: new FormControl(),
        confirmNewPassword: new FormControl()
      });

      const validator = PasswordMatchValidator(controls);

      expect(validator).toBeNull();
    })

    it('should return object { passwordMatch: true } if the passwords do not match', () => {
      const controls = new FormGroup({
        newPassword: new FormControl('Password123'),
        confirmNewPassword: new FormControl('Password456')
      });

      const validator = PasswordMatchValidator(controls);

      expect(validator).toEqual({ passwordMatch: true });
    });

    it('should return object { passwordMatch: true } if one control is empty', () => {
      const controls = new FormGroup({
        newPassword: new FormControl(''),
        confirmNewPassword: new FormControl('Password123')
      });

      const validator = PasswordMatchValidator(controls);

      expect(validator).toEqual({ passwordMatch: true });
    });
  })
});
