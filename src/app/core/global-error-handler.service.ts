import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
//import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error:any){
    const router = this.injector.get(Router);
    console.log(`Request URL ${router.url}`);

    if(error instanceof HttpErrorResponse){
      console.log('Backend returned status code:', error.status);
      console.log('Response Body:', error.message);
      //this.toastr.error("Error",  error.message);
      if(error.status === 401){
        router.navigate(['cli/login']);
      }

    } else {
      console.log('Error occured:', error.message);
      //this.toastr.error("Error", error.message);
    }

    //router.navigate(['error']);
  }
}
