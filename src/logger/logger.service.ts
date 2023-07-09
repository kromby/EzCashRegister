import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  log(message: string, context: string) {
    this.logger.log(message, context);
  }

  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}