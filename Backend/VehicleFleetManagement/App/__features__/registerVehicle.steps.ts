import { When, Then, Given } from "@cucumber/cucumber";
import assert from "assert";
import { plateNumber } from "./commonSteps";
import "./commonSteps";
import { RegisterVehicleCommand } from "../Update/RegisterVehicleCommand";
import { FindFleetByIdQuery } from "../Find/FindFleetByIdQuery";
import { FindVehicleByIdQuery } from "../Find/FindVehicleByIdQuery";

Given(
  "this vehicle has been registered into the other user's fleet",
  async function () {
    try {
      const registerVehicleCommand = new RegisterVehicleCommand({
        vehicleId: plateNumber,
        fleetId: this.otherFleetId,
      });

      await this.commandBus.dispatch(registerVehicleCommand);
    } catch (e) {
      this.error = e;
    }
  },
);

When("I try to register this vehicle into my fleet", async function () {
  try {
    const registerVehicleCommand = new RegisterVehicleCommand({
      vehicleId: plateNumber,
      fleetId: this.fleetId,
    });

    await this.commandBus.dispatch(registerVehicleCommand);
  } catch (e) {
    this.error = e;
  }
});

When("I register this vehicle into my fleet", async function () {
  try {
    const registerVehicleCommand = new RegisterVehicleCommand({
      vehicleId: plateNumber,
      fleetId: this.fleetId,
    });

    await this.commandBus.dispatch(registerVehicleCommand);
  } catch (e) {
    this.error = e;
  }
});

Then("this vehicle should be part of my vehicle fleet", async function () {
  const fleetByIdQuery = new FindFleetByIdQuery(this.fleetId);
  const fleet = await this.queryBus.execute(fleetByIdQuery);

  const vehicleByIdQuery = new FindVehicleByIdQuery(plateNumber);
  const vehicle = await this.queryBus.execute(vehicleByIdQuery);

  assert(fleet.hasVehicle(vehicle));
});

Then(
  "I should be informed this this vehicle has already been registered into my fleet",
  async function () {
    assert.strictEqual(
      this.error.message,
      `The fleet ${this.fleetId} has already registered the vehicle AB-123-CD`,
    );
  },
);
