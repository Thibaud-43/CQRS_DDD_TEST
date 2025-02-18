import { CommandBus } from "./App/CommandBus";
import { CreateFleetCommand } from "./App/Create/CreateFleetCommand";
import { CreateFleetCommandHandler } from "./App/Create/CreateFleetCommandHandler";
import { CreateVehicleCommand } from "./App/Create/CreateVehicleCommand";
import { CreateVehicleCommandHandler } from "./App/Create/CreateVehicleCommandHandler";
import { FindFleetByIdQuery } from "./App/Find/FindFleetByIdQuery";
import { FindFleetByIdQueryHandler } from "./App/Find/FindFleetByIdQueryHandler";
import { FindVehicleByIdQuery } from "./App/Find/FindVehicleByIdQuery";
import { FindVehicleByIdQueryHandler } from "./App/Find/FindVehicleByIdQueryHandler";
import { QueryBus } from "./App/QueryBus";
import { ParkVehicleCommand } from "./App/Update/ParkVehicleCommand";
import { ParkVehicleCommandHandler } from "./App/Update/ParkVehicleCommandHandler";
import { RegisterVehicleCommand } from "./App/Update/RegisterVehicleCommand";
import { RegisterVehicleCommandHandler } from "./App/Update/RegisterVehicleCommandHandler";
import { Fleet } from "./Domain/Aggregates/Fleet";
import { Vehicle } from "./Domain/Entities/Vehicle";
import { ConsoleLogger } from "./Infra/Logger";
import { FileFleetRepository } from "./Infra/Persistence/File/FileFleetRepository";
import { FileVehicleRepository } from "./Infra/Persistence/File/FileVehicleRepository";

export const commandBus = new CommandBus();
export const queryBus = new QueryBus();

const vehicleRepository = new FileVehicleRepository();
const fleetRepository = new FileFleetRepository(vehicleRepository);
const logger =
  process.env.ENABLE_ENHANCED_LOGS === "true"
    ? new ConsoleLogger()
    : {
        error() {},
        info() {},
        warn() {},
      };

// eslint-disable-next-line
function registerCommandHandler<T>(commandName: string, handler: any) {
  commandBus.registerHandler<T>(commandName, handler);
}

const registerQueryHandler = <TQuery, TResult>(
  queryName: string,
  // eslint-disable-next-line
  handler: any,
) => {
  queryBus.registerHandler<TQuery, TResult>(queryName, handler);
};

registerCommandHandler<CreateFleetCommand>(
  CreateFleetCommand.name,
  new CreateFleetCommandHandler(fleetRepository, logger),
);

registerCommandHandler<CreateVehicleCommand>(
  CreateVehicleCommand.name,
  new CreateVehicleCommandHandler(vehicleRepository, logger),
);

registerCommandHandler<RegisterVehicleCommand>(
  RegisterVehicleCommand.name,
  new RegisterVehicleCommandHandler(fleetRepository, vehicleRepository, logger),
);

registerCommandHandler<ParkVehicleCommand>(
  ParkVehicleCommand.name,
  new ParkVehicleCommandHandler(vehicleRepository, fleetRepository, logger),
);

registerQueryHandler<FindFleetByIdQuery, Fleet | undefined>(
  FindFleetByIdQuery.name,
  new FindFleetByIdQueryHandler(fleetRepository),
);

registerQueryHandler<FindVehicleByIdQuery, Vehicle | undefined>(
  FindVehicleByIdQuery.name,
  new FindVehicleByIdQueryHandler(vehicleRepository),
);
