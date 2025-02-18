import { Given, When, Then } from "@cucumber/cucumber";
import { Location } from "../../Domain/ValueObjects/Location";
import assert from "assert";
import { plateNumber } from "./commonSteps";
import "./commonSteps";
import { ParkVehicleCommand } from "../Update/ParkVehicleCommand";
import { FindVehicleByIdQuery } from "../Find/FindVehicleByIdQuery";

const location = {
  latitude: 48.8584,
  longitude: 2.2945,
  altitude: 500,
};

Given("a location", function () {
  this.locationVO = new Location(location);
});

Given("my vehicle has been parked into this location", async function () {
  const parkVehicleCommand = new ParkVehicleCommand({
    vehicleId: plateNumber,
    fleetId: this.fleetId,
    location,
  });
  await this.commandBus.dispatch(parkVehicleCommand);
});

When("I park my vehicle at this location", async function () {
  const parkVehicleCommand = new ParkVehicleCommand({
    vehicleId: plateNumber,
    fleetId: this.fleetId,
    location,
  });
  await this.commandBus.dispatch(parkVehicleCommand);
});

When("I try to park my vehicle at this location", async function () {
  try {
    const parkVehicleCommand = new ParkVehicleCommand({
      vehicleId: plateNumber,
      fleetId: this.fleetId,
      location,
    });
    await this.commandBus.dispatch(parkVehicleCommand);
  } catch (error) {
    this.error = error;
  }
});

Then(
  "the known location of my vehicle should verify this location",
  async function () {
    const findVehicleByIdQuery = new FindVehicleByIdQuery(plateNumber);
    const vehicle = await this.queryBus.execute(findVehicleByIdQuery);
    const expectedLocation = new Location(location);
    assert.strictEqual(
      vehicle.getLocation().toString(),
      expectedLocation.toString(),
    );
  },
);

Then(
  "I should be informed that my vehicle is already parked at this location",
  function () {
    assert.strictEqual(
      this.error.message,
      "The Vehicle AB-123-CD is already parked at (48.8584, 2.2945, 500m)",
    );
  },
);
