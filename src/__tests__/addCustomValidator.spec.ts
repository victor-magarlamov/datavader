import { validate, addCustomValidator } from '../.';

describe('addCustomValidator', () => {
  const customValidator = ({value, min}: any) => {
    try {
      return value.length >= min;
    } catch (e) {
      return false;
    }
  }

  beforeAll(() => {
    addCustomValidator('minPasswordLength', customValidator);
  });

  it('is valid', () => {
    expect(validate({password: 'qwerty'}).check('password').with('minPasswordLength', {min: 4})).toBe(true);
  });

  it('is invalid', () => {
    expect(validate({password: 'qwerty'}).check('password').with('minPasswordLength', {min: 14})).toBe(false);
  });
});
