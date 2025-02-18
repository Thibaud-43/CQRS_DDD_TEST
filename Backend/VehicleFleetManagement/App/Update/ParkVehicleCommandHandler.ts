import { FleetNotFoundError } from "../../Domain/Exceptions/FleetErrors";
import { VehicleNotFoundError } from "../../Domain/Exceptions/VehiculeErrors";
import { IFleetRepository } from "../../Domain/Repositories/IFleetRepository";
import { IVehicleRepository } from "../../Domain/Repositories/IVehicleRepository";
import { Location as LocationVO } from "../../Domain/ValueObjects/Location";
import { CommandHandler } from "../CommandHandler";
import { Logger } from "../Logging/Logger";
import { ParkVehicleCommand } from "./ParkVehicleCommand";

export class ParkVehicleCommandHandler
  implements CommandHandler<ParkVehicleCommand>
{
  constructor(
    private readonly vehicleRepository: IVehicleRepository,
    private readonly fleetRepository: IFleetRepository,
    private readonly logger: Logger,
  ) {}

  public async execute({ vehicleId, fleetId, location }: ParkVehicleCommand) {
    this.logger.info("Handling ParkVehicleCommand", {
      vehicleId,
      fleetId,
      location,
    });

    const fleet = await this.fleetRepository.findById(fleetId);

    if (!fleet) {
      throw new FleetNotFoundError(fleetId);
    }

    const vehicle = await this.vehicleRepository.findById(vehicleId);
    if (!vehicle) {
      throw new VehicleNotFoundError(vehicleId);
    }

    const locationVO = new LocationVO(location);

    const vehicleParked = fleet.parkVehicle(vehicle, locationVO);

    await this.vehicleRepository.save(vehicleParked);

    this.logger.info("Vehicle parked succesfully", {
      vehicleId,
      fleetId,
      location,
    });

    return { id: vehicleId };
  }
}
