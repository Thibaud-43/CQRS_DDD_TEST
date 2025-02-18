export class PlateNumberError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class InvalidPlateNumberError extends PlateNumberError {
  constructor(value: string) {
    super(
      `Invalid plate number format: ${value}. Must match French plate number format (e.g., AA-123-AA or 123-ABC-12)`,
    );
    this.name = "InvalidPlateNumberError";
  }
}
