import { promises as fs } from "fs";
import path from "path";
import { Vehicle, VehicleType } from "../../../Domain/Entities/Vehicle";
import { PlateNumber } from "../../../Domain/ValueObjects/PlateNumber";
import { Location } from "../../../Domain/ValueObjects/Location";
import { IVehicleRepository } from "../../../Domain/Repositories/IVehicleRepository";

const FILE_PATH = path.join(process.cwd(), "data", "vehicles.json");

type VehicleRecord = {
  plateNumber: {
    value: string;
  };
  type: VehicleType;
  location: {
    latitude?: number;
    longitude?: number;
    altitude?: number;
  };
};

export class FileVehicleRepository implements IVehicleRepository {
  private async readFile(): Promise<Record<string, VehicleRecord>> {
    try {
      const data = await fs.readFile(FILE_PATH, "utf-8");
      return JSON.parse(data);
      // eslint-disable-next-line
    } catch (error: any) {
      if (error.code === "ENOENT") {
        return {};
      }
      throw error;
    }
  }

  private async writeFile(data: Record<string, VehicleRecord>): Promise<void> {
    await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  }

  public async findById(id: string): Promise<Vehicle | undefined> {
    const vehicles = await this.readFile();

    const vehicleRecord = vehicles[id];
    if (!vehicleRecord) {
      return undefined;
    }
    const { latitude, longitude, altitude } = vehicleRecord.location;
    return new Vehicle({
      plateNumber: new PlateNumber(vehicleRecord.plateNumber.value),
      type: vehicleRecord.type,
      location:
        latitude && longitude
          ? new Location({ latitude, longitude, altitude })
          : undefined,
    });
  }

  public async save(vehicle: Vehicle): Promise<Vehicle> {
    const vehicles = await this.readFile();
    vehicles[vehicle.getPlateNumber().getValue()] = {
      location: {
        altitude: vehicle.getLocation()?.getAltitude(),
        latitude: vehicle.getLocation()?.getLatitude(),
        longitude: vehicle.getLocation()?.getLongitude(),
      },
      plateNumber: { value: vehicle.getPlateNumber().getValue() },
      type: vehicle.getType(),
    };
    await this.writeFile(vehicles);
    return vehicle;
  }
}
