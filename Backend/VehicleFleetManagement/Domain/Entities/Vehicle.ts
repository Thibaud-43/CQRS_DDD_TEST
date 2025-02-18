import { VehicleAlreadyParkedAtThisLocationError } from "../Exceptions/VehiculeErrors";
import { Location } from "../ValueObjects/Location";
import { PlateNumber } from "../ValueObjects/PlateNumber";

export type VehicleType = "car" | "truck" | "motocycle" | "bike";

type VehicleConstructorParameters = {
  type: VehicleType;
  plateNumber: PlateNumber;
  location?: Location;
};

export class Vehicle {
  private readonly plateNumber: PlateNumber;
  private readonly type: VehicleType;
  private location?: Location;

  constructor({ plateNumber, type, location }: VehicleConstructorParameters) {
    this.plateNumber = plateNumber;
    this.type = type;
    this.location = location;
  }

  public park(newLocation: Location): Vehicle {
    if (this.location && newLocation.equals(this.location)) {
      throw new VehicleAlreadyParkedAtThisLocationError(
        this.getPlateNumber().getValue(),
        newLocation.toString(),
      );
    }
    this.location = newLocation;
    return this;
  }

  public isParkedAt(location: Location): boolean {
    return !!this.location?.equals(location);
  }

  public getPlateNumber(): PlateNumber {
    return this.plateNumber;
  }

  public getType(): VehicleType {
    return this.type;
  }

  public getLocation(): Location | undefined {
    return this.location;
  }
  public equals(vehicle: Vehicle): boolean {
    return this.plateNumber.equals(vehicle.plateNumber);
  }
}
