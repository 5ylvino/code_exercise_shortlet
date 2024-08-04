import { ConsoleLogger } from '@nestjs/common';
import { FileSystem } from './plugins/localization';

export class LoggerService extends ConsoleLogger {
  constructor() {
    super();
  }

  log(message: any, stack?: string, context?: string) {
    FileSystem.log(message, stack || context);
    super.log(message, stack || context);
  }

  fatal(message: any, stack?: string, context?: string) {
    FileSystem.log(message, stack || context);
    super.fatal(message, stack || context);
  }

  error(message: any, stack?: string, context?: string) {
    FileSystem.log(message, stack || context);
    super.error(message, stack || context);
  }

  warn(message: any, stack?: string, context?: string) {
    FileSystem.log(message, stack || context);
    super.warn(message, stack || context);
  }

  debug(message: any, stack?: string, context?: string) {
    FileSystem.log(message, stack || context);
    super.debug(message, stack || context);
  }

  verbose(message: any, stack?: string, context?: string) {
    FileSystem.log(message, stack || context);
    super.verbose(message, stack || context);
  }
}
