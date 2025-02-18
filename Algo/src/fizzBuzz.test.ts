import { fizzbuzz } from "./fizzBuzz";

test(`
    Number is negative number
    Given the number -3
    When I check its FizzBuzz value
    Then it should throw an error
`, () => {
  const givenNumber = -3;

  expect(() => fizzbuzz(givenNumber)).toThrow(
    "Argument must be a positive Integer"
  );
});

test(`
    Number is 0
    Given the number 0
    When I check its FizzBuzz value
    Then it should throw an error
`, () => {
  const givenNumber = 0;

  expect(() => fizzbuzz(givenNumber)).toThrow(
    "Argument must be a positive Integer"
  );
});

test(`
    Number is not an integer
    Given the number 1.1
    When I check its FizzBuzz value
    Then it should throw an error
`, () => {
  const givenNumber = 1.1;

  expect(() => fizzbuzz(givenNumber)).toThrow(
    "Argument must be a positive Integer"
  );
});
