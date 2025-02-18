import { Vehicle } from "../../Domain/Entities/Vehicle";
import { IVehicleRepository } from "../../Domain/Repositories/IVehicleRepository";
import { PlateNumber } from "../../Domain/ValueObjects/PlateNumber";
import { CommandHandler } from "../CommandHandler";
import { Logger } from "../Logging/Logger";
import { CreateVehicleCommand } from "./CreateVehicleCommand";

export class CreateVehicleCommandHandler
  implements CommandHandler<CreateVehicleCommand>
{
  constructor(
    private readonly vehicleRepository: IVehicleRepository,
    private readonly logger: Logger,
  ) {}

  public async execute({ plateNumber, type }: CreateVehicleCommand) {
    this.logger.info(`Handling CreateVehicleCommand`, { plateNumber, type });
    const vehicle = new Vehicle({
      plateNumber: new PlateNumber(plateNumber),
      type,
    });

    await this.vehicleRepository.save(vehicle);
    this.logger.info(`Vehicle created succesfully`, { plateNumber, type });
    return { id: plateNumber };
  }
}
