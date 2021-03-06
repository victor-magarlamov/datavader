import { validate, addValidatorRule, addParameterRule } from '../.';

describe('addParameterRule', () => {
  const customValidator = ({value1, value2}: any) => {
    try {
      return value1 !== value2;
    } catch (e) {
      return false;
    }
  }
  
  const customOptions = (item: any) => {
    return {
      value1: item.firstName,
      value2: item.lastName,
    }
  }

  beforeAll(() => {
    addValidatorRule('names', customValidator);
    addParameterRule('names', customOptions);
  });

  it('is valid', () => {
    const item = {firstName: 'Rick', lastName: 'Sanchez'};

    expect(validate(item).check('firstName').with('names', {})).toBe(true);
  });

  it('is invalid', () => {
    const item = {firstName: 'Rick', lastName: 'Rick'};
    
    expect(validate(item).check('firstName').with('names', {})).toBe(false);
  });
});
