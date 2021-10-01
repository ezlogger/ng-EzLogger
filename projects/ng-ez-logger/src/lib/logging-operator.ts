import { Injector, ReflectiveInjector } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { DecoratorService } from './decorator.service';
import { LoggingModule } from './logging.module';
import { LoggingService } from './logging.service';

export function log<T>(method?: string): OperatorFunction<T, T> {
    return function(source$: Observable<T>): Observable<T> {
  

      const loggingService = DecoratorService.getService();
      return source$.pipe(
        tap(
          (res) => {loggingService.info(`${method} has completed`);},
          (err) => {loggingService.info(`${method} has failed`)}
        )
      );
    }
  }