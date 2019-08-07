interface Params {
  value: any;
  exist: boolean;
  allowNull?: boolean;
  allowBlank?: boolean;
}

export default function presence (params: Params): boolean {
  try {
    const {
      value,
      exist = true,
      allowNull = false,
      allowBlank = false
    } = params;

    if (exist) {
      if (value === null && !allowNull) return false;
      if (value === null && allowNull) return true;
      if (value.length === 0 && !allowBlank) return false;

      return true;
    }

    return value === undefined || value === null || value.length === 0;
  } catch (e) {
    return false;
  }
}
