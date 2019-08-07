import * as validators from './validators/';

const validator: {[key: string]: Function} = {
  ...validators,
}

const addCustomValidator = (rule: string, func: Function): void => {
  validator[rule] = func;
}

const customOptions: {[key: string]: Function} = {
  confirmation: (item: any, property: string): any => {
    return {
      value: item[property],
      valueConfirmation: item[`${property}_confirmation`],
    }
  },
}

const addCustomOptions = (rule: string, func: Function): void => {
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

const validateByScheme = (item: any, validationScheme: any): {[key: string]: string[]} => {
  const properties = Object.keys(validationScheme);
  let errors: {[key: string]: string[]} = {};

  for (let property of properties) {
    const rules = Object.keys(validationScheme[property]);

    for (let rule of rules) {
      const result = validate(item).check(property).with(rule, validationScheme[property][rule]);
      
      if (!result) {
        if (!errors[property]) {
          errors[property] = [];
        }

        errors[property].push(rule);
      }
    }
  }

  return errors;
}

export {
  validate,
  validateByScheme,
  addCustomValidator,
  addCustomOptions,
}
