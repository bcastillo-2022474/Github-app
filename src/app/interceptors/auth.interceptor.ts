import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_API_URL, TOKEN} from "../constants";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
    console.log("interceptor created")
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("trying to intercept", request.url.startsWith(BASE_API_URL))
    if (!request.url.startsWith(BASE_API_URL)) return next.handle(request);

    const header = new HttpHeaders().set("Authorization", `Bearer ${TOKEN}`)
    console.log("intercepted");
    return next.handle(request.clone({headers: header}));
  }
}
