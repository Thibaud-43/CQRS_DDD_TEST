import { Vehicle } from "../../../Domain/Entities/Vehicle";
import { IVehicleRepository } from "../../../Domain/Repositories/IVehicleRepository";

export class InMemoryVehicleRepository implements IVehicleRepository {
  private readonly vehicles: Record<string, Vehicle> = {};
  constructor() {}
  public findById(id: string): Promise<Vehicle | undefined> {
    const vehicle = this.vehicles[id];
    return Promise.resolve(vehicle);
  }

  public save(vehicle: Vehicle): Promise<Vehicle> {
    this.vehicles[vehicle.getPlateNumber().getValue()] = vehicle;
    return Promise.resolve(vehicle);
  }
}
