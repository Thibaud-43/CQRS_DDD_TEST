export interface Logger {
  // eslint-disable-next-line
  info(message: string, context?: any): void;
  // eslint-disable-next-line
  warn(message: string, context?: any): void;
  // eslint-disable-next-line
  error(message: string, context?: any): void;
}
