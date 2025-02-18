import { isMultipleOf } from "./lib/number";

export type FizzBuzzValue = number | "Fizz" | "Buzz" | "FizzBuzz";

export const computeFizzBuzzValue = (n: number): FizzBuzzValue => {
  const isMultipleOfThree = isMultipleOf(3)(n);
  const isMultipleOfFive = isMultipleOf(5)(n);

  if (isMultipleOfThree && isMultipleOfFive) {
    return "FizzBuzz";
  }
  if (isMultipleOfThree) {
    return "Fizz";
  }
  if (isMultipleOfFive) {
    return "Buzz";
  }
  return n;
};
