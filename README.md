# datavader
A library for object validation

## Install

## Usage

```js
import { validate, validateByScheme, addCustomValidator, addCustomOptions } from 'datavader';

// it will be tested

const user = {
  name: 'Rick',
  age: 70,
  password: 'rikitikitavibitch',
  password_confirmation: 'rikitikitavibitch',
  email: 'lickmyballs@bitch.com',
  quality: 'alcoholic',
  catchphrase: 'wubba lubba dub-dub',
  relatives: ['morty', 'summer', 'beth']
};

// use validate method to сheck a single property

validate(user).check('name').with('presence', {exist: true});
validate(user).check('age').with('numericality', {greaterThan: 60});
validate(user).check('quality').with('exclusion', {values: ['kind', 'gentle']});

// use validateByScheme method to validate the whole object
const scheme = {
  name: {
    presence: {exist: true},
    length: {
      min: 1,
      max: 10,
    },
  },
  lastName: {
    absence: {},
  },
  age: {
    numericality: {
      lessThan: 80,
      greaterThanOrEqualTo: 70,
      isEven: true;
      isInteger: true,
    },
  }
}

validateByScheme(user, scheme);
```
