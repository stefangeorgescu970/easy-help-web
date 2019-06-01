import { BooleanServerResponse } from 'src/shared/models/shared/boolean-server-response';
import { RegisterDto } from '../shared/models/shared/register-dto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileData } from 'src/shared/models/profile-data/profile-data';
import { LoginResult } from 'src/shared/models/login-result/login-result';

export const USER_KEY = 'current-user';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private http: HttpClient) { }

    myheader = new HttpHeaders().set('Content-Type', 'application/json');

    setUser(user: ProfileData): void {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    getUser(): ProfileData {
        const userString = localStorage.getItem(USER_KEY);
        return JSON.parse(userString) as ProfileData;
    }

    login(email: string, password: string): Observable<LoginResult> {
        return this.http.post(environment.apiUrl + '/users/login',
                              JSON.stringify({email: email, password: password}),
                              {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const profile = new ProfileData();
                profile.id = res.object.user.id;
                profile.token = res.object.token;
                profile.role = res.object.user.userType;
                profile.county = res.object.user.county;
                profile.email = res.object.user.email;
                profile.firstName = res.object.user.firstName;
                profile.lastName = res.object.user.lastName;
                profile.dateOfBirth = res.object.user.dateOfBirth;
                profile.ssn = res.object.user.ssn;
                profile.locationId = res.object.user.locationId;
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
            const booleanResponse = new BooleanServerResponse(res.status);
            if (res.status === false) {
                booleanResponse.exception = res.exception;
            }
            return booleanResponse;
        }));
    }

    logout(): Observable<BooleanServerResponse> {
        return this.http.post(environment.apiUrl + '/users/logout', JSON.stringify({id: this.getUser().id}), {headers: this.myheader})
        .pipe(map((res: any) => {
            const booleanResponse = new BooleanServerResponse(res.status);
            if (res.status === false) {
                booleanResponse.exception = res.exception;
            } else {
                localStorage.removeItem(USER_KEY);
            }
            return booleanResponse;

            // const br = new BooleanServerResponse(true);
            // localStorage.removeItem(USER_KEY);
            // return br;
        }));
    }
}
