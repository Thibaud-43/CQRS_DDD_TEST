#!/usr/bin/env node
import { program } from "commander";
import { CreateFleetCommand } from "../App/Create/CreateFleetCommand";
import { commandBus } from "../app";
import { RegisterVehicleCommand } from "../App/Update/RegisterVehicleCommand";
import { ParkVehicleCommand } from "../App/Update/ParkVehicleCommand";
import { CreateVehicleCommand } from "../App/Create/CreateVehicleCommand";

program
  .command("create <userId>")
  .description("Create a fleet for a user")
  .action(async (ownerId) => {
    const command = new CreateFleetCommand({ ownerId });
    const fleetId = (await commandBus.dispatch(command))?.id;
    console.log({ fleetId });
  });

program
  .command("create-vehicle <plateNumber> <type>")
  .description("Create a vehicle")
  .action(async (plateNumber, type) => {
    const command = new CreateVehicleCommand({ plateNumber, type });
    const vehicleId = (await commandBus.dispatch(command))?.id;
    console.log({ vehicleId });
  });

program
  .command("register-vehicle <fleetId> <vehiclePlateNumber>")
  .description("Register a vehicle in a fleet")
  .action(async (fleetId, vehiclePlateNumber) => {
    const command = new RegisterVehicleCommand({
      fleetId,
      vehicleId: vehiclePlateNumber,
    });
    const vehicleId = await commandBus.dispatch(command);
    console.log({ vehicleId });
  });

program
  .command("localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]")
  .description("Update vehicle location")
  .action(async (fleetId, vehiclePlateNumber, lat, lng, alt) => {
    const command = new ParkVehicleCommand({
      fleetId,
      vehicleId: vehiclePlateNumber,
      location: { latitude: lat, longitude: lng, altitude: alt },
    });
    await commandBus.dispatch(command);
    console.log(
      `Vehicle ${vehiclePlateNumber} location updated in fleet ${fleetId}`,
    );
  });

program.parse(process.argv);
