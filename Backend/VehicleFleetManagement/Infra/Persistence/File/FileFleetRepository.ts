import { promises as fs } from "fs";
import path from "path";
import { Fleet } from "../../../Domain/Aggregates/Fleet";
import { FileVehicleRepository } from "./FileVehicleRepository";
import { Vehicle } from "../../../Domain/Entities/Vehicle";
import { IFleetRepository } from "../../../Domain/Repositories/IFleetRepository";

const FILE_PATH = path.join(process.cwd(), "data", "fleets.json");

type FleetRecord = { id: string; ownerId: string; vehicleIds: string[] };

export class FileFleetRepository implements IFleetRepository {
  constructor(private readonly vehicleRepository: FileVehicleRepository) {}

  private async readFile(): Promise<Record<string, FleetRecord>> {
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

  private async writeFile(data: Record<string, FleetRecord>): Promise<void> {
    await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  }

  public async findById(id: string): Promise<Fleet | undefined> {
    const fleets = await this.readFile();
    const fleetRecord = fleets[id];
    if (!fleetRecord) {
      return undefined;
    }
    const vehicles = (
      await Promise.all(
        fleetRecord.vehicleIds.map(async (vehicleId) =>
          this.vehicleRepository.findById(vehicleId),
        ),
      )
    ).filter((vehicle) => !!vehicle);

    const fleet = new Fleet({
      ownerId: fleetRecord.ownerId,
      id: fleetRecord.id,
      vehicles,
    });
    return fleet;
  }

  public async save(fleet: Fleet): Promise<Fleet> {
    const fleets = await this.readFile();
    const plateNumbers = fleet
      .getVehicles()
      .map((vehicle: Vehicle) => vehicle.getPlateNumber().getValue());

    const newFleet = {
      vehicleIds: plateNumbers,
      id: fleet.getId(),
      ownerId: fleet.getOwnerId(),
    };
    fleets[fleet.getId()] = newFleet;
    await this.writeFile(fleets);
    return fleet;
  }
}
