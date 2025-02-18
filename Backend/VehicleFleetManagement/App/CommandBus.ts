import { CommandHandler } from "./CommandHandler";

export class CommandBus {
  // eslint-disable-next-line
  private handlers: Map<string, CommandHandler<any>> = new Map();

  registerHandler<TCommand>(
    commandName: string,
    handler: CommandHandler<TCommand>,
  ): void {
    this.handlers.set(commandName, handler);
  }

  async dispatch<TCommand extends { constructor: { name: string } }>(
    command: TCommand,
  ): Promise<{ id: string } | void> {
    const handler = this.handlers.get(command.constructor.name);

    if (!handler) {
      throw new Error(
        `Handler not found for command: ${command.constructor.name}`,
      );
    }

    return await handler.execute(command);
  }
}
