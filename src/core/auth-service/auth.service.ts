import { BooleanServerResponse } from 'src/shared/models/boolean-server-response/boolean-server-response';
import { RegisterDto } from './../../shared/models/accounts/register-dto/register-dto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as jwt from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileData } from 'src/shared/models/profile-data/profile-data';
import { LoginResult } from 'src/shared/models/login-result/login-result';

export const USER_NAME = 'current-user';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private http: HttpClient) { }

    myheader = new HttpHeaders().set('Content-Type', 'application/json');

    setUser(user: ProfileData): void {
        localStorage.setItem(USER_NAME, JSON.stringify(user));
    }

    getUser(): ProfileData {
        const userString = localStorage.getItem(USER_NAME);
        return JSON.parse(userString) as ProfileData;
    }

    login(email: string, password: string): Observable<LoginResult> {
        return this.http.post(environment.apiUrl + '/users/login',
                              JSON.stringify({email: email, password: password}),
                              {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const profile = new ProfileData(res.object.token, res.object.user.userType);
                this.setUser(profile);
                return new LoginResult(true, profile, null);
            } else {
                return new LoginResult(false, null, res.exception);
            }
        }));
    }

    register(data: RegisterDto): Observable<BooleanServerResponse> {
        return this.http.post(environment.apiUrl + '/users/register', data, {headers: this.myheader})
        .pipe(map((res: any) => {
            return new BooleanServerResponse(res.status);
        }));
    }

    logout(): Observable<string> {
        // return this.http.post(environment.apiUrl + '/logout', {headers: {}})
        // .pipe(map((res: any) => {
        //     localStorage.removeItem(USER_NAME);
        //     return res;
        // }));

        localStorage.removeItem(USER_NAME);
        return of('string');
    }
}
