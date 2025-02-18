import { Fleet } from "../../Domain/Aggregates/Fleet";
import { IFleetRepository } from "../../Domain/Repositories/IFleetRepository";
import { QueryHandler } from "../QueryHandler";
import { FindFleetByIdQuery } from "./FindFleetByIdQuery";

export class FindFleetByIdQueryHandler
  implements QueryHandler<FindFleetByIdQuery, Fleet | undefined>
{
  constructor(private readonly fleetRepository: IFleetRepository) {}
  async execute(query: FindFleetByIdQuery): Promise<Fleet | undefined> {
    return this.fleetRepository.findById(query.id);
  }
}
