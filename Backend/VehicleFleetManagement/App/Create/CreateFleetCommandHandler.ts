import { Fleet } from "../../Domain/Aggregates/Fleet";
import { IFleetRepository } from "../../Domain/Repositories/IFleetRepository";
import { CommandHandler } from "../CommandHandler";
import { Logger } from "../Logging/Logger";
import { CreateFleetCommand } from "./CreateFleetCommand";

export class CreateFleetCommandHandler
  implements CommandHandler<CreateFleetCommand>
{
  constructor(
    private readonly fleetRepository: IFleetRepository,
    private readonly logger: Logger,
  ) {}

  public async execute({ ownerId }: CreateFleetCommand) {
    this.logger.info(`Handling CreateFleetCommand`, { ownerId });
    const fleet = new Fleet({ ownerId });

    const fleetCreated = await this.fleetRepository.save(fleet);
    this.logger.info(`Fleet create succesfully`, {
      ownerId,
      fleetId: fleet.getId(),
    });
    return { id: fleetCreated.getId() };
  }
}
