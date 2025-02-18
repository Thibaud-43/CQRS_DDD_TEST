export class VehicleError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class VehicleNotFoundError extends VehicleError {
  constructor(vehicleId: string) {
    super(`Vehicle ${vehicleId} not found`);
  }
}

export class VehicleAlreadyParkedAtThisLocationError extends VehicleError {
  constructor(vehicleId: string, locationString: string) {
    super(`The Vehicle ${vehicleId} is already parked at ${locationString}`);
  }
}
