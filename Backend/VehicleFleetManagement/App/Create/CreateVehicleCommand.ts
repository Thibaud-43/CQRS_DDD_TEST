import { VehicleType } from "../../Domain/Entities/Vehicle";

export class CreateVehicleCommand {
  readonly plateNumber: string;
  readonly type: VehicleType;
  constructor({
    plateNumber,
    type,
  }: {
    plateNumber: string;
    type: VehicleType;
  }) {
    this.plateNumber = plateNumber;
    this.type = type;
  }
}
