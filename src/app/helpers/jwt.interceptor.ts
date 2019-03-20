import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../../core/auth_service/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(public auth: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.auth.getUser();

        if (currentUser) {

            const cloned = request.clone({
                setHeaders: {
                Authorization: `${currentUser.token}`
                }
            });

            return next.handle(cloned);
        } else {
            return next.handle(request);
        }
    }
}
