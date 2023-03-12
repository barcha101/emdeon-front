import {  Injectable, NgModule } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {environment} from './../../../environments/environment'
import { tap, catchError } from "rxjs/operators";
import { SnackBarService } from './snack-bar.service';
import { Router } from '@angular/router';

declare var document: any;

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private snackBarService: SnackBarService,
    private router: Router
    ) { }
    public requestConCount = 0;
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // this.requestConCount++;
    // console.log('requestConCount++');
    document.getElementById('loading').className = "loading";
    if (SessionStorageService.getValue('token') && req.url.includes(environment.apiUrlPrefix)) {
        req = req.clone({
          setHeaders: {
          Authorization: SessionStorageService.getValue('token')
          }
        });
    }
    return next.handle(req).pipe(
        tap(evt => {
            // this.requestConCount--;
            // console.log('requestConCount--');
            // if(!this.requestConCount){
              // document.getElementById('loading').className = "loading hidden";
            // }
            if (evt instanceof HttpResponse) {
              document.getElementById('loading').className = "loading hidden";
                if(evt.body && evt.body.message){
                  this.snackBarService.successMessage(evt.body.message);
                }
            }
        }),
        catchError((error: any) => {
            if(error instanceof HttpErrorResponse) {
              document.getElementById('loading').className = "loading hidden";
              if (error.status === 0) {
                this.snackBarService.errorMessage('Network error!');
              } else {
                if(error.error.message){
                  this.snackBarService.errorMessage(error.error.message.toString());
                } else if(error.error.error){
                  this.snackBarService.errorMessage(error.error.error.toString());
                } else if(error.error.error){
                  this.snackBarService.errorMessage('Something went wrong');
                } else {
                  this.snackBarService.errorMessage('Something went wrong');
                }
                if(error.status == 401){
                  // SessionStorageService.clear();
                  // this.router.navigate(['/login']);
                }
              }
            }
            // return of(error);
            throw error;
        }));
  }
}

@NgModule({
  providers: [
  { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ]
 })
 export class InterceptorModule { }
