interface Params {
  property: string;
  isInteger?: boolean;
  isOdd?: boolean;
  isEven?: boolean;
  equalTo?: number;
  otherThan?: number;
  greaterThan?: number; 
  greaterThanOrEqualTo?: number;
  lessThan?: number;
  lessThanOrEqualTo?: number;
}

export default function number (params: Params): string {
  const {
    property,
    isInteger, isOdd, isEven,
    equalTo, otherThan, 
    greaterThan, greaterThanOrEqualTo,
    lessThan, lessThanOrEqualTo,
  } = params;

  let conditions = [];

  if (isInteger) {
    conditions.push('an integer');
  }

  if (isOdd) {
    conditions.push('odd');
  }
  
  if (isEven) {
    conditions.push('even');
  }

  if (equalTo) {
    conditions.push(`equal to ${equalTo}`);
  }
  
  if (otherThan) {
    conditions.push(`other than ${otherThan}`);
  }
  
  if (greaterThan) {
    conditions.push(`greater than ${greaterThan}`);
  }
  
  if (lessThan) {
    conditions.push(`less than ${lessThan}`);
  }
  
  if (greaterThanOrEqualTo) {
    conditions.push(`greater or equal to ${greaterThanOrEqualTo}`);
  }
  
  if (lessThanOrEqualTo) {
    conditions.push(`less or equal to ${lessThanOrEqualTo}`);
  }

  return `${property} must be ${conditions}`;
}
