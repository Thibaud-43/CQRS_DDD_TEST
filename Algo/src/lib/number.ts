export const isMultipleOf = (multiple: number) => (numberToTest: number) => {
  return numberToTest % multiple === 0;
};

export const isPositiveInteger = (N: number) => {
  return Number.isInteger(N) && N > 0;
};
