import { Injectable } from "@angular/core";
import { LoggingService } from "./logging.service";

@Injectable()
export class DecoratorService {
     private static service: LoggingService | undefined = undefined;
     public constructor(service: LoggingService) {
         DecoratorService.service = service;
     }
     public static getService(): LoggingService {
         if(!DecoratorService.service) {
             throw new Error('DecoratorService not initialized');
         }
         return DecoratorService.service;
     }
}