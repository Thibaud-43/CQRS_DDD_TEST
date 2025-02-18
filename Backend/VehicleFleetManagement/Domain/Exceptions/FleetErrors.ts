export class FleetError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class FleetNotFoundError extends FleetError {
  constructor(fleetId: string) {
    super(`Fleet ${fleetId} not found`);
  }
}

export class VehicleNotInFleetError extends FleetError {
  constructor(plateNumber: string, fleetId: string) {
    super(`The vehicle ${plateNumber} doesn't belong to fleet ${fleetId}`);
  }
}

export class VehicleAlreadyInFleetError extends FleetError {
  constructor(fleetId: string, plateNumber: string) {
    super(
      `The fleet ${fleetId} has already registered the vehicle ${plateNumber}`,
    );
  }
}

export class UnauthorizedFleetOperationError extends FleetError {
  constructor({ fleetId, userId }: { fleetId: string; userId: string }) {
    super(`The userId ${userId} is not the owner of the fleet ${fleetId}`);
  }
}
