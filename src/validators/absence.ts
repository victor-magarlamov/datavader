interface Params {
  value: any;
  exist: boolean;
}

export default function absence (params: Params): boolean {
  try {
    const {value, exist = false} = params;

    if (!exist) return value === undefined;
    if (exist) return value !== undefined;
  } catch (e) {
    return false;
  }
}
