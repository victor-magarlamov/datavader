import * as validators from './validators/';

const primaryValidators: string[] = [
  'absence', 'presence',
]

const validator: {[key: string]: Function} = {
  ...validators,
}

const addValidatorRule = (rule: string, func: Function, isPrimary?: boolean): void => {
  validator[rule] = func;

  if (isPrimary) {
    primaryValidators.push(rule);
  }
}

const customOptions: {[key: string]: Function} = {
  confirmation: (item: any, property: string): any => {
    return {
      value: item[property],
      valueConfirmation: item[`${property}_confirmation`],
    }
  },
}

const addParameterRule = (rule: string, func: Function): void => {
  customOptions[rule] = func;
}

const validate = (item: any): any => {
  return {
    check (property: string): any {
      return {
        with (rule: string, options: any): boolean {
          let params: {[key: string]: any};

          try {
            params = customOptions[rule](item, property);
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

const checkProperty = (property: string, item: any, scheme: any, rules: string[]): string[] => {
  let errors: string[] = [];
  
  for (let rule of rules) {
    const result = validate(item)
      .check(property)
      .with(rule, scheme[property][rule]);

    if (!result) {
      errors.push(rule);

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

export {
  validate,
  validateByScheme,
  addValidatorRule,
  addParameterRule,
}
