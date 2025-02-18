import {
  InvalidLatitudeError,
  InvalidLongitudeError,
  InvalidAltitudeError,
} from "../Exceptions/LocationErrors";

type Latitude = number;
type Longitude = number;
type Altitude = number;

type LocationConstructorParameters = {
  latitude: Latitude;
  longitude: Longitude;
  altitude?: Altitude;
};

export class Location {
  private readonly latitude: number;
  private readonly longitude: number;
  private readonly altitude: number;

  constructor({
    altitude = 0,
    latitude,
    longitude,
  }: LocationConstructorParameters) {
    this._validateLatitude(latitude);
    this._validateLongitude(longitude);
    this._validateAltitude(altitude);

    this.altitude = altitude;
    this.longitude = longitude;
    this.latitude = latitude;
  }

  public getLatitude(): Latitude {
    return this.latitude;
  }

  public getLongitude(): Longitude {
    return this.longitude;
  }

  public getAltitude(): Altitude {
    return this.altitude;
  }

  private _validateLatitude(latitude: Latitude): void {
    if (latitude < -90 || latitude > 90) {
      throw new InvalidLatitudeError(latitude);
    }
  }

  private _validateLongitude(longitude: Longitude): void {
    if (longitude < -180 || longitude > 180) {
      throw new InvalidLongitudeError(longitude);
    }
  }

  private _validateAltitude(altitude: Altitude): void {
    if (altitude < -500 || altitude > 9000) {
      throw new InvalidAltitudeError(altitude);
    }
  }

  public equals(other: Location): boolean {
    return (
      this.latitude === other.latitude &&
      this.longitude === other.longitude &&
      this.altitude === other.altitude
    );
  }

  public toString(): string {
    return `(${this.latitude}, ${this.longitude}, ${this.altitude}m)`;
  }
}
