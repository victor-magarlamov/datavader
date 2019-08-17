interface Params {
  property: string;
  values: (string | boolean | number)[];
}

export default function exclusion (params: Params): string {
  const { property, values } = params;

  return `${property} must be different than ${values}`;
}
