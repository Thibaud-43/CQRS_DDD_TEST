import { Fleet } from "../../../Domain/Aggregates/Fleet";
import { IFleetRepository } from "../../../Domain/Repositories/IFleetRepository";

export class InMemoryFleetRepository implements IFleetRepository {
  private readonly fleets: Record<string, Fleet> = {};
  constructor() {}
  public findById(id: string): Promise<Fleet | undefined> {
    const fleet = this.fleets[id];
    return Promise.resolve(fleet);
  }

  public save(fleet: Fleet): Promise<Fleet> {
    this.fleets[fleet.getId()] = fleet;
    return Promise.resolve(fleet);
  }
}
