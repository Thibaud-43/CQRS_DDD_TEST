import { InvalidPlateNumberError } from "../Exceptions/PlateNumberError";

const FRENCH_PLATE_NUMBER_REGEX =
  /^[A-Z]{2}-\d{3}-[A-Z]{2}$|^\d{3}-[A-Z]{3}-\d{2}$/;

export class PlateNumber {
  private readonly value: string;

  constructor(value: string) {
    if (!this._isValid(value)) {
      throw new InvalidPlateNumberError(value);
    }
    this.value = value.toUpperCase();
  }

  private _isValid(value: string): boolean {
    return FRENCH_PLATE_NUMBER_REGEX.test(value.toUpperCase());
  }

  public equals(other: PlateNumber): boolean {
    return this.value === other.value;
  }

  public getValue(): string {
    return this.value;
  }
}
