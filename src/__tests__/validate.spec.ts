import { validate } from '../.';

jest.mock('data');

describe('validate', () => {
  const user = require('data').user;

  describe('presence', () => {
    it('is valid when presence is true', () => {
      expect(validate(user).check('name').with('presence', {})).toBe(true);
    });
    
    it('is invalid when presence is false', () => {
      expect(validate(user).check('name').with('presence', {exist: false})).toBe(false);
    });
  });

  describe('absence', () => {
    it('is valid when presence is false', () => {
      expect(validate(user).check('lastname').with('absence', {})).toBe(true);
    });
    
    it('is invalid when presence is true', () => {
      expect(validate(user).check('lastname').with('absence', {exist: true})).toBe(false);
    });
  });

  describe('confirmation', () => {
    it('is valid', () => {
      expect(validate(user).check('password').with('confirmation', {})).toBe(true);
    });
    
    it('is invalid when confirmation is wrong', () => {
      expect(validate(user).check('email').with('confirmation', {})).toBe(false);
    });
    
    it('is invalid when has no confiramtion', () => {
      expect(validate(user).check('name').with('confirmation', {})).toBe(false);
    });
  });

  describe('inclusion', () => {
    const {rightQualities, wrongQualities} = require('data');

    it('is valid', () => {
      expect(validate(user).check('quality').with('inclusion', {values: rightQualities})).toBe(true);
    });
    
    it('is invalid', () => {
      expect(validate(user).check('quality').with('inclusion', {values: wrongQualities})).toBe(false);
    });
  });
  
  describe('exclusion', () => {
    const {wrongQualities: rightQualities, rightQualities: wrongQualities} = require('data');

    it('is valid', () => {
      expect(validate(user).check('quality').with('exclusion', {values: rightQualities})).toBe(true);
    });
    
    it('is invalid', () => {
      expect(validate(user).check('quality').with('exclusion', {values: wrongQualities})).toBe(false);
    });
  });
  
  describe('length', () => {
    it('is valid', () => {
      expect(validate(user).check('relatives').with('length', {is: user.relatives.length})).toBe(true);
    });
    
    it('is invalid', () => {
      expect(validate(user).check('relatives').with('length', {is: user.relatives.length + 1})).toBe(false);
    });
  });
  
  describe('numericality', () => {
    it('is valid when age is Integer', () => {
      expect(validate(user).check('age').with('numericality', {isInteger: true})).toBe(true);
    });
    
    it('is invalid when age is Integer', () => {
      expect(validate(user).check('age').with('numericality', {isInteger: false})).toBe(false);
    });
    
    it('is valid when age is even', () => {
      expect(validate(user).check('age').with('numericality', {isEven: true})).toBe(true);
    });
    
    it('is invalid when age is odd', () => {
      expect(validate(user).check('age').with('numericality', {isOdd: true})).toBe(false);
    });
    
    it('is valid when age is equal', () => {
      expect(validate(user).check('age').with('numericality', {equalTo: user.age})).toBe(true);
    });
    
    it('is valid when age is otherThan', () => {
      expect(validate(user).check('age').with('numericality', {otherThan: user.age + 1})).toBe(true);
    });
    
    it('is valid when age is greaterThan', () => {
      expect(validate(user).check('age').with('numericality', {greaterThan: user.age - 5})).toBe(true);
    });
    
    it('is valid when age is greaterThanOrEqualTo', () => {
      expect(validate(user).check('age').with('numericality', {greaterThan: user.age - 5})).toBe(true);
    });
    
    it('is valid when age is lessThan', () => {
      expect(validate(user).check('age').with('numericality', {lessThan: user.age + 10})).toBe(true);
    });
    
    it('is valid when age is lessThanOrEqualTo', () => {
      expect(validate(user).check('age').with('numericality', {lessThanOrEqualTo: user.age + 10})).toBe(true);
    });
  });
});
