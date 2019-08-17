interface Params {
  property: string;
  is?: number;
  min?: number;
  max?: number;
}

export default function inclusion (params: Params): string {
  const { property, is, min, max } = params;

  if (is !== undefined) {
    return `${property} should be equal to ${is}`;
  }

  if (min !== undefined && max !== undefined) {
    return `${property} should be less than ${max} and great than ${min}`;
  }
  
  if (min !== undefined) {
    return `${property} should be great than ${min}`;
  }
  
  if (max !== undefined) {
    return `${property} should be less than ${max}`;
  }
}
