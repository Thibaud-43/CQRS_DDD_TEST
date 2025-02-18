export class CreateFleetCommand {
  readonly ownerId: string;
  constructor({ ownerId }: { ownerId: string }) {
    this.ownerId = ownerId;
  }
}
