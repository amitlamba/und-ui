import {
  HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor,
  HttpRequest, HttpResponse
} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map"
import "rxjs/add/operator/catch"
import "rxjs/add/observable/throw"
import "rxjs/add/operator/retry"
import {Injectable, NgModule} from "@angular/core";
import {MessageService} from "../_services/message.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../_services/authentication.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService, private router: Router, private authenticationService: AuthenticationService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem("currentUser")) {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var token = currentUser && currentUser.token;
      const dupReq = req.clone({headers: req.headers.set('authorization', token)});
      console.log("Interceptor Dup Request");
      // console.log(dupReq);
      return next.handle(dupReq)
        // .retry(2)
        .map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && ~(event.status / 100) > 3) {
            console.info('HttpResponse::event =', event, ';');
          } else console.info('event =', event, ';');
          return event;
        })
        .catch((err: any, caught) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 403 || err.status === 401) {
              console.error('err.error =', err.error, ';');
              console.error("You are not logged in! Or you might have logged in into another machine, hence you have been logged out from this interface!!");
              this.messageService.addDangerMessage("You are not logged in! Or you might have logged in into another machine, hence you have been logged out from this interface!!");
              this.authenticationService.logout();
              this.router.navigate(['/login']);
            }
            console.error('err =', err, caught, ';');
            return Observable.throw(err);
          }
        });
    } else {
      console.log("Interceptor Request");
      // console.log(req);
      return next.handle(req);
    }
  }

}

@NgModule(
  {
    providers: [
      {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}
    ]
  }
)
export class InterceptorModule {
}
