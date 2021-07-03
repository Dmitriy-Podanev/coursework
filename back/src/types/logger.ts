import { LogLevel } from '../enum/log-level'

export declare namespace Logger {
  interface Service {
    log(level: LogLevel, message: string): void;
    error(message: string): void
    warn(message: string): void
    info(message: string): void
    http(message: string): void
    verbose(message: string): void
    debug(message: string): void
    silly(message: string): void
  }
}
