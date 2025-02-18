import { Vehicle } from "../Entities/Vehicle";

export interface IVehicleRepository {
  findById: (id: string) => Promise<Vehicle | undefined>;
  save: (vehicle: Vehicle) => Promise<Vehicle>;
}
