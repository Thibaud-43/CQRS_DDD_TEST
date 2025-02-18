import { FleetNotFoundError } from "../../Domain/Exceptions/FleetErrors";
import { VehicleNotFoundError } from "../../Domain/Exceptions/VehiculeErrors";
import { IFleetRepository } from "../../Domain/Repositories/IFleetRepository";
import { IVehicleRepository } from "../../Domain/Repositories/IVehicleRepository";
import { CommandHandler } from "../CommandHandler";
import { Logger } from "../Logging/Logger";
import { RegisterVehicleCommand } from "./RegisterVehicleCommand";

export class RegisterVehicleCommandHandler
  implements CommandHandler<RegisterVehicleCommand>
{
  constructor(
    private readonly fleetrepository: IFleetRepository,
    private readonly vehicleRepository: IVehicleRepository,
    private readonly logger: Logger,
  ) {}

  async execute({ vehicleId, fleetId }: RegisterVehicleCommand) {
    this.logger.info("Handling RegisterVehicleCommand", {
      vehicleId,
      fleetId,
    });
    const fleet = await this.fleetrepository.findById(fleetId);
    if (!fleet) {
      throw new FleetNotFoundError(fleetId);
    }
    const vehicle = await this.vehicleRepository.findById(vehicleId);
    if (!vehicle) {
      throw new VehicleNotFoundError(vehicleId);
    }

    fleet.registerVehicle(vehicle);

    await this.fleetrepository.save(fleet);

    this.logger.info("Vehicle registered succesfully", {
      vehicleId,
      fleetId,
    });
    return { id: fleet.getId() };
  }
}
