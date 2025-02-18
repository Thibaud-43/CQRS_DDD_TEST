import { Fleet } from "../Aggregates/Fleet";

export interface IFleetRepository {
  findById: (id: string) => Promise<Fleet | undefined>;
  save: (fleet: Fleet) => Promise<Fleet>;
}
