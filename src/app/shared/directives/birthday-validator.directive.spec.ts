import { FormControl } from '@angular/forms';
import { BirthdayValidator, BirthdayValidatorDirective } from './birthday-validator.directive';

describe('BirthdayValidatorDirective', () => {
  it('should create an instance', () => {
    const directive = new BirthdayValidatorDirective();
    expect(directive).toBeTruthy();
  });

  describe('BirthdayValidator', () => {
    it('should return null if the birthday is at least 16 years ago', () => {
      const birthday = new FormControl(new Date('12-22-2000'));

      const validator = BirthdayValidator(birthday);

      expect(validator).toBeNull();
    });

    it('should return null if the birthday is empty', () => {
      const birthday = new FormControl();

      const validator = BirthdayValidator(birthday);

      expect(validator).toBeNull();
    });

    it('should return object { birthday : true } if the birthday is less than 16 years ago', () => {
      const birthday = new FormControl(new Date('02-12-2017'));

      const validator = BirthdayValidator(birthday);

      expect(validator).toEqual({ birthday : true });
    });
  });
});
