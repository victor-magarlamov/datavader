import * as validators from './validators/';
import * as messages from './messages/';

const primaryValidators: string[] = [
  'absence', 'presence',
]

const validator: {[key: string]: Function} = {
  ...validators,
}

const customParameters: {[key: string]: Function} = {
  confirmation: (item: any, property: string): any => {
    return {
      value: item[property],
      valueConfirmation: item[`${property}_confirmation`],
    }
  },
}

const errorMessages: {[key: string]: Function} = {
  ...messages,
}

const validate = (item: any): any => {
  return {
    check (property: string): any {
      return {
        with (rule: string, options: any): boolean {
          let params: {[key: string]: any};

          try {
            params = customParameters[rule](item, property);
          } catch (e) {
            params = {
              value: item[property],
              ...options
            }
          }

          return validator[rule](params);
        }
      }
    }
  }
}

const checkProperty = (
  property: string, item: any, scheme: any, rules: string[]
): string[] => {
  let errors: string[] = [];
  
  for (let rule of rules) {
    const options = scheme[property][rule];
    
    const result = validate(item)
      .check(property)
      .with(rule, options);

    if (!result) {
      let errorMessage = errorMessages[rule]({property, ...options});

      if (!errorMessage) {
        errorMessage = `${property} is invalid`;
      }

      errors.push(errorMessage);

      if (~primaryValidators.indexOf(rule)) {
        break;
      }
    }
  }

  return errors;
}

const sortRulesByPrimary = (item1: string, item2: string): number => {
  return (primaryValidators.indexOf(item2)) - primaryValidators.indexOf(item1);
}

const validateByScheme = (item: any, scheme: any): {[key: string]: string[]} => {
  const properties = Object.keys(scheme);
  let errors: {[key: string]: string[]} = {};

  for (let property of properties) {
    const rules = Object.keys(scheme[property]).sort(sortRulesByPrimary);

    let result = checkProperty(property, item, scheme, rules);

    if (result.length > 0) {
      errors[property] = result;
    }
  }

  return errors;
}

const addValidatorRule = (rule: string, func: Function, isPrimary?: boolean): void => {
  validator[rule] = func;

  if (isPrimary) {
    primaryValidators.push(rule);
  }
}

const addParameterRule = (rule: string, func: Function): void => {
  customParameters[rule] = func;
}

const addErrorMessage = (rule: string, func: Function): void => {
  errorMessages[rule] = func;
}

export {
  validate,
  validateByScheme,
  addValidatorRule,
  addParameterRule,
  addErrorMessage,
}
