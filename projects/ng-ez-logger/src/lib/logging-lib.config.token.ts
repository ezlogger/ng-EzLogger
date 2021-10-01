import { InjectionToken } from '@angular/core';
import { LoggingLibraryConfig } from './logging-lib.config';

export const LOGGING_LIB_CONFIG = new InjectionToken<LoggingLibraryConfig>(
  'LOGGING_LIB_CONFIG'
);