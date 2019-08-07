interface Params {
  value: string | any[];
  is?: number;
  min?: number;
  max?: number;
}

export default function length (params: Params): boolean {
  try {
    const {value, is, min, max} = params;

    if (is) return value.length === is;
    if (min && max) return (value.length >= min && value.length < max);
    if (min) return value.length >= min;
    if (max) return value.length < max;

    return value.length > 0;
  } catch (e) {
    return false;
  }
}
