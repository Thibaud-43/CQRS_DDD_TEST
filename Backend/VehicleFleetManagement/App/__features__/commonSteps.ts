import { Before, Given } from "@cucumber/cucumber";
import { CreateFleetCommandHandler } from "../Create/CreateFleetCommandHandler";
import { CreateVehicleCommandHandler } from "../Create/CreateVehicleCommandHandler";
import { RegisterVehicleCommand } from "../Update/RegisterVehicleCommand";
import { RegisterVehicleCommandHandler } from "../Update/RegisterVehicleCommandHandler";
import { ParkVehicleCommandHandler } from "../Update/ParkVehicleCommandHandler";
import { CreateFleetCommand } from "../Create/CreateFleetCommand";
import { CommandBus } from "../CommandBus";
import { CreateVehicleCommand } from "../Create/CreateVehicleCommand";
import { ParkVehicleCommand } from "../Update/ParkVehicleCommand";
import { QueryBus } from "../QueryBus";
import { FindFleetByIdQueryHandler } from "../Find/FindFleetByIdQueryHandler";
import { FindFleetByIdQuery } from "../Find/FindFleetByIdQuery";
import { Fleet } from "../../Domain/Aggregates/Fleet";
import { FindVehicleByIdQueryHandler } from "../Find/FindVehicleByIdQueryHandler";
import { FindVehicleByIdQuery } from "../Find/FindVehicleByIdQuery";
import { Vehicle } from "../../Domain/Entities/Vehicle";
import { Logger } from "../Logging/Logger";
import { FileVehicleRepository } from "../../Infra/Persistence/File/FileVehicleRepository";
import { FileFleetRepository } from "../../Infra/Persistence/File/FileFleetRepository";
import { InMemoryVehicleRepository } from "../../Infra/Persistence/InMemory/InMemoryVehicleRepository";
import { InMemoryFleetRepository } from "../../Infra/Persistence/InMemory/InMemoryFleetRepository";

export const userId = "1";
export const otherUserId = "2";
export const plateNumber = "AB-123-CD";

Before(function ({ pickle }) {
  const commandBus = new CommandBus();
  const queryBus = new QueryBus();

  const usePersistentRepository = pickle.tags.some(
    (t) => t.name === "@critical",
  );

  const peristentVehicleRepository = new FileVehicleRepository();
  const peristentFleetRepository = new FileFleetRepository(
    peristentVehicleRepository,
  );
  const inMemoryVehicleRepository = new InMemoryVehicleRepository();
  const inMemoryFleetRepository = new InMemoryFleetRepository();

  const vehicleRepository = usePersistentRepository
    ? peristentVehicleRepository
    : inMemoryVehicleRepository;

  const fleetRepository = usePersistentRepository
    ? peristentFleetRepository
    : inMemoryFleetRepository;

  const logger: Logger = {
    error() {},
    info() {},
    warn() {},
  };

  const createFleetCommandHandler = new CreateFleetCommandHandler(
    fleetRepository,
    logger,
  );

  commandBus.registerHandler<CreateFleetCommand>(
    CreateFleetCommand.name,
    createFleetCommandHandler,
  );

  const createVehicleCommandHandler = new CreateVehicleCommandHandler(
    vehicleRepository,
    logger,
  );

  commandBus.registerHandler<CreateVehicleCommand>(
    CreateVehicleCommand.name,
    createVehicleCommandHandler,
  );

  const registerVehicleCommandHandler = new RegisterVehicleCommandHandler(
    fleetRepository,
    vehicleRepository,
    logger,
  );

  commandBus.registerHandler<RegisterVehicleCommand>(
    RegisterVehicleCommand.name,
    registerVehicleCommandHandler,
  );

  const parkVehicleCommandHandler = new ParkVehicleCommandHandler(
    vehicleRepository,
    fleetRepository,
    logger,
  );

  commandBus.registerHandler<ParkVehicleCommand>(
    ParkVehicleCommand.name,
    parkVehicleCommandHandler,
  );

  const findFleetByIdQueryHandler = new FindFleetByIdQueryHandler(
    fleetRepository,
  );

  queryBus.registerHandler<FindFleetByIdQuery, Fleet | undefined>(
    FindFleetByIdQuery.name,
    findFleetByIdQueryHandler,
  );

  const findVehicleByIdQueryHandler = new FindVehicleByIdQueryHandler(
    vehicleRepository,
  );

  queryBus.registerHandler<FindVehicleByIdQuery, Vehicle | undefined>(
    FindVehicleByIdQuery.name,
    findVehicleByIdQueryHandler,
  );

  this.commandBus = commandBus;
  this.queryBus = queryBus;
});

Given("my fleet", async function () {
  const createFleetCommand = new CreateFleetCommand({
    ownerId: userId,
  });

  const fleet = await this.commandBus.dispatch(createFleetCommand);
  this.fleetId = fleet.id;
});

Given("a vehicle", async function () {
  const createVehicleCommand = new CreateVehicleCommand({
    plateNumber,
    type: "car",
  });
  await this.commandBus.dispatch(createVehicleCommand);
});

Given("I have registered this vehicle into my fleet", async function () {
  const registerVehicleCommand = new RegisterVehicleCommand({
    fleetId: this.fleetId,
    vehicleId: plateNumber,
  });
  await this.commandBus.dispatch(registerVehicleCommand);
});

Given("the fleet of another user", async function () {
  const createFleetCommand = new CreateFleetCommand({
    ownerId: otherUserId,
  });

  const fleet = await this.commandBus.dispatch(createFleetCommand);
  this.otherFleetId = fleet.id;
});
