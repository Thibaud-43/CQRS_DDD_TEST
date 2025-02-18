export class LocationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class InvalidLatitudeError extends LocationError {
  constructor(value: number) {
    super(
      `Invalid latitude value: ${value}. Must be between -90 and 90 degrees`,
    );
    this.value = value;
  }

  readonly value: number;
}

export class InvalidLongitudeError extends LocationError {
  constructor(value: number) {
    super(
      `Invalid longitude value: ${value}. Must be between -180 and 180 degrees`,
    );
    this.value = value;
  }

  readonly value: number;
}

export class InvalidAltitudeError extends LocationError {
  constructor(value: number) {
    super(
      `Invalid altitude value: ${value}. Must be between -500 and 9000 meters`,
    );
    this.value = value;
  }

  readonly value: number;
}
