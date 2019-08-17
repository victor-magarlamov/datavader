import { validateByScheme } from '../.';

jest.mock('data');

describe('validateByScheme', () => {
  const {user, rightQualities, wrongQualities} = require('data');
  
  const scheme = {
    name: {
      length: {
        min: 1,
        max: user.name.length + 1,
      },
      presence: {exist: true},
    },
    lastName: {
      absence: {},
    },
    age: {
      number: {
        lessThan: user.age + 10,
        greaterThanOrEqualTo: user.age,
        isEven: true,
        isOdd: false,
        isInteger: true,
      },
    },
    password: {
      confirmation: {},
    },
    email: {
      presence: {exist: true},
    },
    quality: {
      presence: {exist: true},
      inclusion: {values: rightQualities},
    },
    catchphrase: {
      presence: {exist: true},
      length: {min: 3},
    },
    relatives: {
      presence: {exist: true},
      length: {is: user.relatives.length}
    },
  };
  
  const invalidScheme = {
    name: {
      length: {max: user.name.length},
    },
    lastName: {
      presence: {exist: true},
    },
    age: {
      number: {lessThan: user.age},
    },
    quality: {
      inclusion: {values: wrongQualities},
      length: {is: user.quality.length + 1},
    },
    relatives: {
      length: {is: user.relatives + 1},
    },
  };

  it('has no errors', () => {
    expect(validateByScheme(user, scheme)).toEqual({});
  }); 
  
  it('has errors', () => {
    expect(Object.keys(validateByScheme(user, invalidScheme))).toEqual(Object.keys(invalidScheme));
  });

  describe('if primary validator gets error', () => {
    const validateNameScheme = {
      name: {
        length: {min: 3},
        presence: {exist: true},
      }
    }

    it('has only primary validator error', () => {
      expect(validateByScheme({}, validateNameScheme)).toEqual({name: ['name must be present']});
    });
  });
});
