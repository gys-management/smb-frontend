import { Injectable } from '@angular/core';
import { LogLevel } from 'src/app/models/log-level';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  /**
   * The application log level. Populated from ```environment.logLevel```
   */
  static level: number;

  /**
   * Initializes the log level set in ```environment.ts```
   */
  constructor() {
    LoggerService.level = environment.logLevel;
  }

  static get debug() {
    // eslint-disable-next-line no-console
    return this.logging(LogLevel.DEBUG, console.debug);
  }

  static get error() {
    return this.logging(LogLevel.ERROR, console.error);
  }

  static get warn() {
    return this.logging(LogLevel.WARNING, console.warn);
  }

  static get log() {
    return this.logging(LogLevel.INFO, console.log);
  }

  /**Generic logging method to log based on logging level.
   * @param logLevel The level of the log.
   * @param func The log level function to be used to do the action logging.
   */
  private static logging(logLevel: LogLevel, func: () => void) {
    if (logLevel <= this.level) {
      return func.bind(console);
    } else {
      return () => { };
    }
  }
}
