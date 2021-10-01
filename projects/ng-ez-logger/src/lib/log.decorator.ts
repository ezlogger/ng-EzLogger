import { DecoratorService } from "./decorator.service";
import { LoggingService } from "./logging.service";

export function LogDecorator<T>(isSub: boolean=false): Function {
    return function(target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>): TypedPropertyDescriptor<Function> {
      const originalMethod = descriptor?.value;
     
      descriptor.value = function LogWrapper(): any | false {
        let loggingService =  DecoratorService.getService();
        loggingService.info(`[${this.constructor.name}]Entering ${propertyKey} method`)  
        let value = originalMethod?.apply(this,arguments);
        if(!isSub){loggingService.info(`[${this.constructor.name}]Exit ${propertyKey} method`)};
        return value
       
      };
  
      return descriptor;
    };
  }
  