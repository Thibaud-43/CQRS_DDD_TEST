import { randomUUID } from "crypto";
import { Vehicle } from "../Entities/Vehicle";
import {
  VehicleAlreadyInFleetError,
  VehicleNotInFleetError,
} from "../Exceptions/FleetErrors";
import { Location } from "../ValueObjects/Location";

type FleetConstructorParameters = {
  ownerId: string;
  id?: string;
  vehicles?: Vehicle[];
};

export class Fleet {
  private id: string;
  private ownerId: string;
  private vehicles: Vehicle[];

  constructor({ ownerId, id, vehicles }: FleetConstructorParameters) {
    this.id = id || randomUUID();
    this.ownerId = ownerId;
    this.vehicles = vehicles || [];
  }

  public parkVehicle(vehicle: Vehicle, location: Location): Vehicle {
    if (!this.hasVehicle(vehicle)) {
      throw new VehicleNotInFleetError(
        vehicle.getPlateNumber().getValue(),
        this.id,
      );
    }
    return vehicle.park(location);
  }

  public registerVehicle(vehicle: Vehicle): Vehicle {
    if (this.hasVehicle(vehicle)) {
      throw new VehicleAlreadyInFleetError(
        this.id,
        vehicle.getPlateNumber().getValue(),
      );
    }
    this.vehicles = [...this.vehicles, vehicle];
    return vehicle;
  }

  public getId(): string {
    return this.id;
  }

  public getOwnerId(): string {
    return this.ownerId;
  }

  public getVehicles(): Vehicle[] {
    return this.vehicles;
  }

  public hasVehicle(vehicle: Vehicle): boolean {
    return this.vehicles.some((currentVehicle) =>
      vehicle.equals(currentVehicle),
    );
  }
}
