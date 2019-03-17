import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public auth: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = this.auth.getToken();

        if (idToken) {

            const cloned = request.clone({
                setHeaders: {
                Authorization: `${idToken}`
                }
            });

            return next.handle(cloned);
        } else {
            return next.handle(request);
        }
    }
}
