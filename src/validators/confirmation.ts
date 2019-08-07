interface Params {
  value: string;
  valueConfirmation: string;
}

export default function confirmation (params: Params): boolean {
  try {
    const {value, valueConfirmation} = params;

    return (!!value && value === valueConfirmation);
  } catch (e) {
    return false;
  }
}
