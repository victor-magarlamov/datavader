import * as messages from '../messages';

describe('presence', () => {
  describe('when exists', () => {
    it('returns right message', () => {
      expect(messages.presence({property: 'name', exist: true})).toBe('name must be present');
    });
  });
  
  describe('when does not exist', () => {
    it('returns right message', () => {
      expect(messages.presence({property: 'name', exist: false})).toBe('name must not be present');
    });
  });
});

describe('absence', () => {
  describe('when doesn not exist', () => {
    it('returns right message', () => {
      expect(messages.absence({property: 'name', exist: false})).toBe('name should be absent');
    });
  });
  
  describe('when exists', () => {
    it('returns right message', () => {
      expect(messages.absence({property: 'name', exist: true})).toBe('name should not be absent');
    });
  });
});

describe('confirmation', () => {
  it('returns right message', () => {
    expect(messages.confirmation({property: 'name'})).toBe('name must be confirmed');
  });
});

describe('inclusion', () => {
  it('returns right message', () => {
    expect(messages.inclusion({property: 'name', values: [1,2,3]})).toBe('name should be included in 1,2,3');
  });
});

describe('exclusion', () => {
  it('returns right message', () => {
    expect(messages.exclusion({property: 'name', values: [1,2,3]})).toBe('name must be different than 1,2,3');
  });
});

describe('length', () => {
  it('returns right message if has wrong length', () => {
    expect(messages.length({property: 'name', is: 5})).toBe('name should be equal to 5');
  });
  
  it('returns right message if property is higher then min', () => {
    expect(messages.length({property: 'name', min: 1})).toBe('name should be great than 1');
  });

  it('returns right message if property is less then max', () => {
    expect(messages.length({property: 'name', max: 4})).toBe('name should be less than 4');
  });
  
  it('returns right message if property is in range', () => {
    expect(messages.length({property: 'name', max: 4, min: 0})).toBe('name should be less than 4 and great than 0');
  });
});

describe('number', () => {
  it('returns right message if it is not Integer', () => {
    expect(messages.number({property: 'name', isInteger: true})).toBe('name must be an integer');
  });
  
  it('returns right message if it is not odd', () => {
    expect(messages.number({property: 'name', isOdd: true})).toBe('name must be odd');
  });
  
  it('returns right message if it is not even', () => {
    expect(messages.number({property: 'name', isEven: true})).toBe('name must be even');
  });
  
  it('returns right message if it is not equal', () => {
    expect(messages.number({property: 'name', equalTo: 3})).toBe('name must be equal to 3');
  });
  
  it('returns right message if it is not other', () => {
    expect(messages.number({property: 'name', otherThan: 4})).toBe('name must be other than 4');
  });
  
  it('returns right message if it is not greater', () => {
    expect(messages.number({property: 'name', greaterThan: 4})).toBe('name must be greater than 4');
  });
  
  it('returns right message if it is not greater or equal', () => {
    expect(messages.number({property: 'name', greaterThanOrEqualTo: 5})).toBe('name must be greater or equal to 5');
  });
  
  it('returns right message if it is not less', () => {
    expect(messages.number({property: 'name', lessThan: 4})).toBe('name must be less than 4');
  });
  
  it('returns right message if it is not less or equal', () => {
    expect(messages.number({property: 'name', lessThanOrEqualTo: 3})).toBe('name must be less or equal to 3');
  });
});
