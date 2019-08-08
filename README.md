# datavader
A library for object validation

## Install
npm i datavader

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
  age: {
    numericality: {
      lessThan: 80,
      greaterThanOrEqualTo: 70,
      isEven: true;
      isInteger: true,
    },
  }
  ...
}

validateByScheme(user, scheme);

// use addCustomValidator and addCustomOptions to define custom rule

const customValidator = ({firstName, lastName}) => {
  return firstName !== lastName;
}
  
const customOptions = (item) => {
  return {
    firstName: item.firstName,
    lastName: item.lastName,
  }
}

addCustomValidator('firstNameNotEqLastName', customValidator);
addCustomOptions('firstNameNotEqLastName', customOptions);

validate(user).check('firstName').with('firstNameNotEqLastName', {});

```

## Validators

### presence

validate([object]).check([property]).with('presence', [options])

|options|behavior|
|----|-------|
|{exist: true}|true if property is not null and its length > 0|
|{exist: true, allowNull: true}|true if property is null|
|{exist: true, allowBlank: true}|true if property is empty|
|{exist: false}|true if property is undefined or null or empty|

### absence

validate([object]).check([property]).with('absence', [options])

|options|behavior|
|----|-------|
|{exist: false}|true if property is undefined|
|{exist: true}|false if property is undefined|

### confirmation

validate([object]).check([property]).with('confirmation', {})

|options|behavior|
|----|-------|
|{}|true if object has property with same name and suffix *_confirmation* and its value === property value

### inclusion

validate([object]).check([property]).with('inclusion', [options])

|options|behavior|
|----|-------|
|{values: []}|true if property value includes in an array

### exclusion

validate([object]).check([property]).with('exclusion', [options])

|options|behavior|
|----|-------|
|{values: []}|true if property value does not include in an array

### length

validate([object]).check([property]).with('length', [options])

|options|behavior|
|----|-------|
|{in: 5}|true if length === 5
|{min: 5}|true if length >= 5
|{max: 5}|true if length < 5
|{min: 1, max: 5}|true if length >= 1 and < 5

### numericaly

validate([object]).check([property]).with('numericaly', [options])

|options|behavior|
|----|-------|
|{isInteger: true}|
|{isOdd: true}|
|{isEven: true}|
|{equalTo: 5}|
|{otherThan: 5}|
|{greaterThan: 5}|
|{greaterThanOrEqualTo: 5}|
|{lessThan: 5}|
|{lessThanOrEqualTo: 5}|


## Customization

You can create your own validator and register one with **addCustomValidator** method.

For expample let's create *isEmail* rule.

```js
const isEmailValidator = ({value, domains}) => {
  const reg = new RegExp(`^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(${domains.join('|')})\.com$`, 'ig');
  return reg.test(value)
}
```
Now you should register it as a validation rule.

```js
addCustomValidator('isEmail', isEmailValidator);
```
And ater that you can use it.
```js
validate(user).check('email').with('isEmail', {domains: ['wubba', 'lubba', 'dub']});
```

By default each validator gets the following parameters:

1. property value
2. and options from *with* method

You can change it with **addCustomOptions** method.

For example, look at the *confirmation* validator. It returns true if the object has property with a suffix *_confirmation*.

```js
const confirmation = (params) => {
  const {value, valueConfirmation} = params;
  return value === valueConfirmation;
}
```
To set the correct values into parameters we should create special method.
```js
const foo = (item, property, options) => {
  return {
    value: item[property],
    valueConfirmation: item[`${property}_confirmation`],
  }
}
```
...and register it by validator name.

```js
addCustomOptions('confirmation', foo);
```
