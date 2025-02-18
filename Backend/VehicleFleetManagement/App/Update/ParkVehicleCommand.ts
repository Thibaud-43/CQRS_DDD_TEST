type Location = { latitude: number; longitude: number; altitude?: number };

export class ParkVehicleCommand {
  readonly vehicleId: string;
  readonly fleetId: string;
  readonly location: Location;
  constructor({
    vehicleId,
    fleetId,
    location,
  }: {
    vehicleId: string;
    fleetId: string;
    location: Location;
  }) {
    this.vehicleId = vehicleId;
    this.fleetId = fleetId;
    this.location = location;
  }
}
