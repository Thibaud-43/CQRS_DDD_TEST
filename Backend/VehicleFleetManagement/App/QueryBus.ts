import { QueryHandler } from "./QueryHandler";

export class QueryBus {
  // eslint-disable-next-line
  private handlers: Map<string, QueryHandler<any, any>> = new Map();

  registerHandler<TQuery, TResult>(
    queryName: string,
    handler: QueryHandler<TQuery, TResult>,
  ): void {
    this.handlers.set(queryName, handler);
  }

  async execute<TQuery extends { constructor: { name: string } }, TResult>(
    query: TQuery,
  ): Promise<TResult> {
    const handler = this.handlers.get(query.constructor.name);

    if (!handler) {
      throw new Error(`Handler not found for query: ${query.constructor.name}`);
    }

    return handler.execute(query);
  }
}
