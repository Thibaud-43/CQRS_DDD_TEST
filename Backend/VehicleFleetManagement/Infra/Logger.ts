import { Logger } from "../App/Logging/Logger";

export class ConsoleLogger implements Logger {
  private logger = console;

  constructor() {}

  // eslint-disable-next-line
  info(message: string, context?: any): void {
    this.logger.info(message, { context });
  }

  // eslint-disable-next-line
  warn(message: string, context?: any): void {
    this.logger.warn(message, { context });
  }

  // eslint-disable-next-line
  error(message: string, context?: any): void {
    this.logger.error(message, { context });
  }
}
