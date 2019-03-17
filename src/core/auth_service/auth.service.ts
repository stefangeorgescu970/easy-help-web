import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as jwt from 'jwt-decode';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const TOKEN_NAME = 'jwt_token';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private http: HttpClient) { }

    getToken(): string {
      return localStorage.getItem(TOKEN_NAME);
    }

    setToken(token: string): void {
      localStorage.setItem(TOKEN_NAME, token);
    }

getTokenExpirationDate(token: string): Date {
      const decoded = jwt(token);

      if (decoded.exp === undefined) { return null; }

      const date = new Date(0);
      date.setUTCSeconds(decoded.exp);
      return date;
    }

    isTokenExpired(token?: string): boolean {
      if (!token) { token = this.getToken(); }
      if (!token) { return true; }

      const date = this.getTokenExpirationDate(token);
      if (date === undefined) { return false; }
      return !(date.valueOf() > new Date().valueOf());
    }

    login(email: string, password: string): Observable<string> {
        const myheader = new HttpHeaders().set('Content-Type', 'application/json');

        return this.http.post(environment.apiUrl + '/login', JSON.stringify({email: email, password: password}), {headers: myheader})
        .pipe(map((res: any) => {
            this.setToken(res.token);
            return res.token;
        }));
    }

    logout(): Observable<string> {
        return this.http.post(environment.apiUrl + '/logout', {headers: {}})
        .pipe(map((res: any) => {
            return res;
        }));
    }
}
