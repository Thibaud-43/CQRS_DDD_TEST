import { isPositiveInteger } from "./lib/number";
import { displayRange } from "./lib/range";
import { computeFizzBuzzValue } from "./computeFizzBuzzValue";

export const fizzbuzz = (N: number) => {
  if (!isPositiveInteger(N)) {
    throw new Error("Argument must be a positive Integer");
  }

  displayRange({
    start: 1,
    end: N,
    transform: computeFizzBuzzValue,
  });
};

if (require.main === module) {
  const args = process.argv.slice(2);
  const number = parseInt(args[0], 10);

  fizzbuzz(number);
}
