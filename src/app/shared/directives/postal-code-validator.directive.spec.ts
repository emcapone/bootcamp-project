import { FormControl } from '@angular/forms';
import { PostalCodeValidator, PostalCodeValidatorDirective } from './postal-code-validator.directive';

describe('PostalCodeValidatorDirective', () => {
  it('should create an instance of the directive', () => {
    const directive = new PostalCodeValidatorDirective();
    expect(directive).toBeTruthy();
  });

  describe('PostalCodeValidator', () => {
    it('should return null if postal code is empty', () => {
      let control = new FormControl("");

      const validator = PostalCodeValidator(control);

      expect(validator).toBeNull();
    });

    it('should return null if postal code is valid', () => {
      let control = new FormControl("12345");

      const validator = PostalCodeValidator(control);

      expect(validator).toBeNull();
    });

    it('should return object { postalCode: true } if postal code is invalid', () => {
      let control = new FormControl("123456");

      const validator = PostalCodeValidator(control);

      expect(validator).toEqual({ postalCode: true });
    });
  })

});
