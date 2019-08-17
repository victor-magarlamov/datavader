interface Params {
  property: string;
  values: (string | boolean | number)[];
}

export default function inclusion (params: Params): string {
  const { property, values } = params;

  return `${property} should be included in ${values}`;
}
