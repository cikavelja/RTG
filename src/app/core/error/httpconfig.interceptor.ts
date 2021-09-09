import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//import { ToastrService } from 'ngx-toastr';

import { SecurityService } from '../../security/security.service';
import { LoaderserviceService } from '../../shared/loaderservice.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(    
        //private tostr: ToastrService,
        private security: SecurityService,
        public loaderService: LoaderserviceService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show();
        // return next.handle(req).pipe(
        //     finalize(() => this.loaderService.hide())
        // );
        return next.handle(request).pipe(
            
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                    // this.errorDialogService.openDialog(event);
                    this.loaderService.hide();
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                //this.errorDialogService.openDialog(data);
                this.loaderService.hide();
                console.log('Error--->>>', data);
                if (error.status === 401) {
                    this.security.redirecttologin();
                }
                return throwError(error);

            }));
    }
}