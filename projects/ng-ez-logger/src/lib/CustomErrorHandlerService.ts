import { HttpErrorResponse } from '@angular/common/http';
import {ErrorHandler, Injectable} from '@angular/core';
import { LoggingService } from './logging.service';
@Injectable()
export class CustomErrorHandlerService extends ErrorHandler {

    constructor(private loggingService:LoggingService) {
        super();
    }

    handleError(error: any) {
         let errorMessage : string;
        if(error instanceof HttpErrorResponse) {
            errorMessage = `${error?.status} : Undefined HTTP error`;
            if(error.message) {
            errorMessage = `${error?.status} : ${error?.message}`
            }
            if (error.error.title || error.error.error) {
             errorMessage = `${error?.status} : ${JSON.stringify(error?.error)}`  
            }
        } else {
         errorMessage = error;
        } 
        
        this.loggingService.error(`Error has occured ${errorMessage}`);
        super.handleError(error);
    }


}