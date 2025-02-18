export interface CommandHandler<TCommand> {
  execute(command: TCommand): Promise<{ id: string }>;
}
