interface Params {
  property: string;
  exist: boolean;
}

export default function presence (params: Params): string {
  const {
    property,
    exist = true,
  } = params;

  return `${property} must${ exist ? ' ' : ' not '}be present`;
}
