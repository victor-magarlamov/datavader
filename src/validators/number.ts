interface Params {
  value: number;
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

export default function number (params: Params): boolean {
  try {
    const {
      value,
      isInteger, isOdd, isEven,
      equalTo, otherThan, 
      greaterThan, greaterThanOrEqualTo,
      lessThan, lessThanOrEqualTo,
    } = params;

    if (value === null || value === undefined) return true;
    
    if (isInteger && Math.floor(value) !== value) return false;
    if (isInteger === false && (value % 1) === 0) return false;
    
    if (isOdd && (value % 2) !== 1) return false;
    if (isOdd === false && (value % 2) === 1) return false;
    
    if (isEven && (value % 2) === 1) return false;
    if (isEven === false && (value % 2) !== 1) return false;
    
    if (equalTo && value !== equalTo) return false;
    if (otherThan && value === otherThan) return false;
    
    if (greaterThan && value <= greaterThan) return false;
    if (greaterThanOrEqualTo && value < greaterThanOrEqualTo) return false;
    
    if (lessThan && value >= lessThan) return false;
    if (lessThanOrEqualTo && value > lessThanOrEqualTo) return false;

    return true;
  } catch (e) {
    return false;
  }
}
