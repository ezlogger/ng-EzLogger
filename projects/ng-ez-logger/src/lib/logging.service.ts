import { Inject, Injectable, Injector } from '@angular/core';
import { LoggingLibraryConfig } from './logging-lib.config';
import { LOGGING_LIB_CONFIG } from './logging-lib.config.token';
import { HttpClient } from '@angular/common/http';
import { LogModel } from './log.model';
import { take } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class LoggingService {

  private isConsole: boolean = true;

  constructor(@Inject(LOGGING_LIB_CONFIG) private loggingLibraryConfig: LoggingLibraryConfig, private httpService: HttpClient) {

    if (this.loggingLibraryConfig.logMethod === 'Console') {
      this.isConsole = true;
    } else if (this.loggingLibraryConfig.logMethod === 'Server') {
      this.isConsole = false;
    } else {
      this.isConsole = true;
    }

  }

  warn(message: string) {
    if (this.isConsole) {
      console.warn(this.getTime() + message)
    } else {
      if (this.loggingLibraryConfig.serverUrl) {
        this.httpService.post(this.loggingLibraryConfig.serverUrl, this.getLogObject(message, 'warn')).pipe(take(1)).subscribe(res => { });
      } else {
        console.error("ServerUrl is missing")
      }
    }
  }

  error(message: string) {
    if (this.isConsole) {
      console.error(this.getTime() + message);
    } else {
      if (this.loggingLibraryConfig.serverUrl) {
        this.httpService.post(this.loggingLibraryConfig.serverUrl, this.getLogObject(message, 'error')).pipe(take(1)).subscribe(res => { });
      } else {
        console.error("ServerUrl is missing")
      }
    }
  }

  info(message: string) {
    if (this.isConsole) {
      console.info(this.getTime() + message)
    } else {
      if (this.loggingLibraryConfig.serverUrl) {
        this.httpService.post(this.loggingLibraryConfig.serverUrl, this.getLogObject(message, 'info')).pipe(take(1)).subscribe(res => { })
      } else {
        console.error("ServerUrl is missing")
      }
    }
  }

  private getConfig() {
    return this.loggingLibraryConfig;
  }

  private getTime(): string {
    let timeString = `[${new Date().toUTCString()}]`;
    return timeString
  }

  private getLogObject(message: string, type: string): LogModel {
    let newLog: LogModel = new LogModel();
    newLog.message = message;
    newLog.type = type;
    newLog.logTime = new Date();

    return newLog;
  }
}
