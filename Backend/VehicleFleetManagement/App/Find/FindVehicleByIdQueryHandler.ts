import { Vehicle } from "../../Domain/Entities/Vehicle";
import { IVehicleRepository } from "../../Domain/Repositories/IVehicleRepository";
import { QueryHandler } from "../QueryHandler";
import { FindVehicleByIdQuery } from "./FindVehicleByIdQuery";

export class FindVehicleByIdQueryHandler
  implements QueryHandler<FindVehicleByIdQuery, Vehicle | undefined>
{
  constructor(private readonly vehicleRepository: IVehicleRepository) {}
  async execute(query: FindVehicleByIdQuery): Promise<Vehicle | undefined> {
    return this.vehicleRepository.findById(query.id);
  }
}
