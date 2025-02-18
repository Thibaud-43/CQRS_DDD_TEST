export class RegisterVehicleCommand {
  readonly vehicleId: string;
  readonly fleetId: string;
  constructor({ vehicleId, fleetId }: { vehicleId: string; fleetId: string }) {
    this.vehicleId = vehicleId;
    this.fleetId = fleetId;
  }
}
