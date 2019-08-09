import * as validators from '../validators';

describe('presence', () => {
  describe('when exists', () => {
    const exist = true;

    it('returns true if value is not null', () => {
      expect(validators.presence({value: 'string', exist})).toBe(true);
    });
    
    it('returns false if value is null', () => {
      expect(validators.presence({value: null, exist})).toBe(false);
    });
    
    it('returns true if value is null and allowNull', () => {
      expect(validators.presence({value: null, exist, allowNull: true})).toBe(true);
    });
    
    it('returns false if value is empty', () => {
      expect(validators.presence({value: '', exist})).toBe(false);
    });
    
    it('returns true if value is empty and allowBlank', () => {
      expect(validators.presence({value: '', exist, allowBlank: true})).toBe(true);
    });

    it('returns false if value is undefined', () => {
      expect(validators.presence({value: undefined, exist})).toBe(false);
    });
  });
  
  describe('when does not exist', () => {
    const exist = false;
    
    it('returns true if value is null', () => {
      expect(validators.presence({value: null, exist})).toBe(true);
    });
    
    it('returns true if value is undefined', () => {
      expect(validators.presence({value: undefined, exist})).toBe(true);
    });
    
    it('returns true if value is empty', () => {
      expect(validators.presence({value: '', exist})).toBe(true);
    });
    
    it('returns false if value is not empty', () => {
      expect(validators.presence({value: 1, exist})).toBe(false);
    });
  });
});

describe('absence', () => {
  const validationObject: {[key: string]: any} = {
    name: 'name'
  };

  describe('when doesn not exist', () => {
    const exist = false;
    
    it('returns true if value is undefined', () => {
      expect(validators.absence({value: validationObject['key'], exist})).toBe(true);
    });
    
    it('returns false if value is not undefined', () => {
      expect(validators.absence({value: validationObject['name'], exist})).toBe(false);
    });
  });
  
  describe('when exists', () => {
    const exist = true;
    
    it('returns true if value is undefined', () => {
      expect(validators.absence({value: validationObject['key'], exist})).toBe(false);
    });
    
    it('returns false if value is not undefined', () => {
      expect(validators.absence({value: validationObject['name'], exist})).toBe(true);
    });
  });
});

describe('confirmation', () => {
  const value = '1234';
  const valueConfirmation = '1234';
  const wrongConfirm = '1235';

  it('returns true if value has confiramtion', () => {
    expect(validators.confirmation({value, valueConfirmation})).toBe(true);
  });

  it('returns false if value has no confirmation', () => {
    expect(validators.confirmation({value, valueConfirmation: wrongConfirm})).toBe(false);
  });
  
  it('returns false if value is null', () => {
    expect(validators.confirmation({value: null, valueConfirmation})).toBe(false);
  });
  
  it('returns false if value is undefined', () => {
    expect(validators.confirmation({value: undefined, valueConfirmation})).toBe(false);
  });
  
  it('returns false if confirmation is null', () => {
    expect(validators.confirmation({value, valueConfirmation: null})).toBe(false);
  });
});

describe('inclusion', () => {
  it('returns true if value is in values', () => {
    expect(validators.inclusion({value: 1, values: [1,2,3]})).toBe(true);
  });
  
  it('returns false if value is not in values', () => {
    expect(validators.inclusion({value: 10, values: [1,2,3]})).toBe(false);
  });
});

describe('exclusion', () => {
  it('returns true if value is not in values', () => {
    expect(validators.exclusion({value: '10', values: ['1', '2' , '3']})).toBe(true);
  });
  
  it('returns false if value is in values', () => {
    expect(validators.exclusion({value: 1, values: [1,2,3]})).toBe(false);
  });
});

describe('length', () => {
  it('returns true if has right length', () => {
    expect(validators.length({value: [1,2,3], is: 3})).toBe(true);
  });
  
  it('returns false if has wrong lenght', () => {
    expect(validators.length({value: 'abs', is: 5})).toBe(false);
  });
  
  it('returns true if value is higher then min', () => {
    expect(validators.length({value: 'abs', min: 1})).toBe(true);
  });
  
  it('returns false if value is less then min', () => {
    expect(validators.length({value: 'abs', min: 4})).toBe(false);
  });
  
  it('returns true if value is less then max', () => {
    expect(validators.length({value: 'abs', max: 4})).toBe(true);
  });
  
  it('returns false if value is higher then max', () => {
    expect(validators.length({value: 'abs', max: 3})).toBe(false);
  });
  
  it('returns true if value is in range', () => {
    expect(validators.length({value: 'abs', max: 4, min: 0})).toBe(true);
  });
});

describe('number', () => {
  it('returns true if is Integer', () => {
    expect(validators.number({value: 50, isInteger: true})).toBe(true);
  });
  
  it('returns false if is not Integer', () => {
    expect(validators.number({value: 50.1, isInteger: true})).toBe(false);
  });
  
  it('returns true if is not Integer and isInteger is false', () => {
    expect(validators.number({value: 50.1, isInteger: false})).toBe(true);
  });
  
  it('returns true if is odd', () => {
    expect(validators.number({value: 3, isOdd: true})).toBe(true);
  });
  
  it('returns false if is not odd', () => {
    expect(validators.number({value: 2, isOdd: true})).toBe(false);
  });
  
  it('returns true if is not odd and isOdd is false', () => {
    expect(validators.number({value: 2, isOdd: false})).toBe(true);
  });
  
  it('returns true if is even', () => {
    expect(validators.number({value: 2, isEven: true})).toBe(true);
  });
  
  it('returns false if is not even', () => {
    expect(validators.number({value: 3, isEven: true})).toBe(false);
  });
  
  it('returns true if is not even and isEven is false', () => {
    expect(validators.number({value: 3, isEven: false})).toBe(true);
  });
  
  it('returns true if is equal', () => {
    expect(validators.number({value: 3, equalTo: 3})).toBe(true);
  });
  
  it('returns false if is not equal', () => {
    expect(validators.number({value: 4, equalTo: 3})).toBe(false);
  });
  
  it('returns true if is other', () => {
    expect(validators.number({value: 3, otherThan: 4})).toBe(true);
  });
  
  it('returns false if is not other', () => {
    expect(validators.number({value: 4, otherThan: 4})).toBe(false);
  });
  
  it('returns true if is greater', () => {
    expect(validators.number({value: 4, greaterThan: 3})).toBe(true);
  });
  
  it('returns false if is not greater', () => {
    expect(validators.number({value: 4, greaterThan: 4})).toBe(false);
  });
  
  it('returns true if is greater or equal', () => {
    expect(validators.number({value: 4, greaterThanOrEqualTo: 4})).toBe(true);
  });
  
  it('returns false if is not greater or equal', () => {
    expect(validators.number({value: 4, greaterThanOrEqualTo: 5})).toBe(false);
  });
  
  it('returns true if is less', () => {
    expect(validators.number({value: 4, lessThan: 5})).toBe(true);
  });
  
  it('returns false if is not less', () => {
    expect(validators.number({value: 4, lessThan: 4})).toBe(false);
  });
  
  it('returns true if is less or equal', () => {
    expect(validators.number({value: 4, lessThanOrEqualTo: 4})).toBe(true);
  });
  
  it('returns false if is not less or equal', () => {
    expect(validators.number({value: 4, lessThanOrEqualTo: 3})).toBe(false);
  });
});
