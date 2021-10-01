import { ErrorHandler, Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggingService } from './logging.service';
import { CustomErrorHandlerService } from './CustomErrorHandlerService';
import { LOGGING_LIB_CONFIG } from './logging-lib.config.token';
import { LoggingLibraryConfig } from './logging-lib.config';
import { DecoratorService } from './decorator.service';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ], 
  providers:[DecoratorService,LoggingService]
})


export class LoggingModule { 

  public constructor(service: DecoratorService) {
    // ^^^ forces an instance to be created
  
  }

  static forRoot(loggingLibraryConfig:LoggingLibraryConfig ): ModuleWithProviders<LoggingModule> {
    return {
      ngModule: LoggingModule ,
      providers: [
        {
          provide: LOGGING_LIB_CONFIG,
          useValue: loggingLibraryConfig
        },
         
        {provide: ErrorHandler, useClass: CustomErrorHandlerService}
      ]
    };
  }
}

