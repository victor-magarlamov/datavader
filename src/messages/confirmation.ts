interface Params {
  property: string;
}

export default function presence (params: Params): string {
  const { property } = params;

  return `${property} must be confirmed`;
}
