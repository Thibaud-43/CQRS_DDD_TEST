import { computeFizzBuzzValue } from "./computeFizzBuzzValue";

test(`
    Number is neither a multiple of 3 nor 5
    Given the number 1
    When I check its FizzBuzz value
    Then the result should be 1
`, () => {
  const givenNumber = 1;
  const expectedFizzBuzzOutput = 1;
  const actualFizzBuzzOutput = computeFizzBuzzValue(givenNumber);
  expect(actualFizzBuzzOutput).toBe(expectedFizzBuzzOutput);
});

test(`
    Number is neither a multiple of 3 nor 5
    Given the number 2
    When I check its FizzBuzz value
    Then the result should be 2
`, () => {
  const givenNumber = 2;
  const expectedFizzBuzzOutput = 2;
  const actualFizzBuzzOutput = computeFizzBuzzValue(givenNumber);
  expect(actualFizzBuzzOutput).toBe(expectedFizzBuzzOutput);
});

test(`
    Number is a multiple of 3
    Given the number 3
    When I check its FizzBuzz value
    Then the result should be "Fizz"
`, () => {
  const givenNumber = 3;
  const expectedFizzBuzzOutput = "Fizz";
  const actualFizzBuzzOutput = computeFizzBuzzValue(givenNumber);
  expect(actualFizzBuzzOutput).toBe(expectedFizzBuzzOutput);
});

test(`
    Number is a multiple of 3
    Given the number 6
    When I check its FizzBuzz value
    Then the result should be "Fizz"
`, () => {
  const givenNumber = 6;
  const expectedFizzBuzzOutput = "Fizz";
  const actualFizzBuzzOutput = computeFizzBuzzValue(givenNumber);
  expect(actualFizzBuzzOutput).toBe(expectedFizzBuzzOutput);
});

test(`
    Number is a multiple of 5
    Given the number 5
    When I check its FizzBuzz value
    Then the result should be "Buzz"
`, () => {
  const givenNumber = 5;
  const expectedFizzBuzzOutput = "Buzz";
  const actualFizzBuzzOutput = computeFizzBuzzValue(givenNumber);
  expect(actualFizzBuzzOutput).toBe(expectedFizzBuzzOutput);
});

test(`
    Number is a multiple of 5
    Given the number 10
    When I check its FizzBuzz value
    Then the result should be "Buzz"
`, () => {
  const givenNumber = 10;
  const expectedFizzBuzzOutput = "Buzz";
  const actualFizzBuzzOutput = computeFizzBuzzValue(givenNumber);
  expect(actualFizzBuzzOutput).toBe(expectedFizzBuzzOutput);
});

test(`
    Number is a multiple of 3 and 5
    Given the number 15
    When I check its FizzBuzz value
    Then the result should be "FizzBuzz"
`, () => {
  const givenNumber = 15;
  const expectedFizzBuzzOutput = "FizzBuzz";
  const actualFizzBuzzOutput = computeFizzBuzzValue(givenNumber);
  expect(actualFizzBuzzOutput).toBe(expectedFizzBuzzOutput);
});

test(`
    Number is a multiple of 3 and 5
    Given the number 30
    When I check its FizzBuzz value
    Then the result should be "FizzBuzz"
`, () => {
  const givenNumber = 30;
  const expectedFizzBuzzOutput = "FizzBuzz";
  const actualFizzBuzzOutput = computeFizzBuzzValue(givenNumber);
  expect(actualFizzBuzzOutput).toBe(expectedFizzBuzzOutput);
});
