interface Params {
  value: string | boolean | number;
  values: (string | boolean | number)[];
}

export default function exclusion (params: Params): boolean {
  try {
    const {value, values} = params;

    return (values.indexOf(value) === -1);
  } catch (e) {
    return false;
  }
}
