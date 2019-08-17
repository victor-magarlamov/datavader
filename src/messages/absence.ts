interface Params {
  property: string;
  exist: boolean;
}

export default function absence (params: Params): string {
  const {property, exist = false} = params;

  return `${property} should${ exist ? ' not ' : ' '}be absent`;
}
