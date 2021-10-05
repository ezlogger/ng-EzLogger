# Ng-EzLogger

NG-EzLogger is a logging library designed to simplify logging in angular to be simple as it can. The main intention of this library is to simplify logging while also keeping your code clean and readable.

## Installation

 ```shell
npm i ng-ez-logger
```
Once installed you need to import our main module in your app module 

```typescript
import {LoggingModule } from "ng-ez-logger";
```

Afterwards you'll need to add the configuration for the module, you will get to decide the log type between "Server" or "Console"

```typescript
imports :[
 LoggingModule.forRoot(
      {logMethod:"Server",serverUrl:'https://localhost:44312/api/Logger',
       })
  ],
  ```

## Configuration Options 

- `logMethod` {String}: Choose between `Console` or `Server`. Defaults to `Console`. This is a mandatory config option
- `serverUrl` {String}: Mandatory only if `Server` log method is selected.Enter URL for server side logging here.

## Usage
 
 This library has different tools used to simplify logging, Starting with our Log decorator

 ```typescript
 import {LogDecorator} from "ng-ez-logger";

 @LogDecorator()

  SampleMethod()
  {  
    .... 
  }

  ```
  Simply putting the decorator above a method would add Info log entries at the start and at the end of each method. In the case of a asynchronous function existing in the method. You can use our custom Log RXJS operator to log when the subscription is over.

```typescript
import {LogDecorator,log} from "ng-ez-logger";

 @LogDecorator()

  SampleMethod()
  {  
     this.httpService.get(URL).pipe(log("/Type Method Name here")).subscribe(res=>{
      console.log(res);
   })
  }
  ```

If you want the exit log for the method to be only printed when the subscription is done, you can simply pass true as a variable to the LogDecorator


```typescript
 import {LogDecorator,log} from "ng-ez-logger";

 @LogDecorator(true)

  SampleMethod()
  {  
     this.httpService.get(URL).pipe(log("/Type Method Name here")).subscribe(res=>{
      console.log(res);
   })
  }
  ```

  As for the error logging, our library has a global error handler to catch any error that occurs in the application automatically. Therefore you we have removed the need for any manual error logs.

  If you want to add any custom logs at different places, you can simply import our logging service and utilize the Warn,Info,Error methods as needed.  

  ```typescript
  import {LoggingService} from "ng-ez-logger";

  constructor(private loggingService: LoggingService)

  SampleMethod()
  {  
     this.loggingService.warn("/Warn Message");
     this.loggingService.info("/Info Message");
     this.loggingService.error("/Error Message");
  }
  ```

  ## Server Logging

  If you are planning to do server side logging , we have a ready made environment available to do so. It includes an API as well as an application to view the logs being added. Please go to the following github repo for instructions on how to setup our environment.

  https://github.com/ezlogger/EzLogger-Setup

  Incase you are intending on using your own API for development. This is the log model our library handles currently. 

  ```typescript

  class LogModel {
    message: string ;
    type : string ;
    logTime : Date ;
   }

  ```



