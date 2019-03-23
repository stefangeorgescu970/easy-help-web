import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DoctorAccount } from 'src/shared/models/accounts/doctor-account/doctor-account';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { DcpAccount } from 'src/shared/models/accounts/dcp-account/dcp-account';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

    constructor(private http: HttpClient) { }

    myheader = new HttpHeaders().set('Content-Type', 'application/json');

    getDoctorAccountRequests(): Observable<DoctorAccount[]> {
        return this.http
        .post(environment.apiUrl + '/admin/doctorAccountRequests', {}, {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<DoctorAccount> = [];


                for (const obj of objArray) {
                    const newDoctor = new DoctorAccount(obj.id, obj.email, obj.userType);
                    myList.push(newDoctor);
                }

                return myList;

            } else {
                const myList: Array<DoctorAccount> = [];
                return myList;
            }
        }));
    }

    getDcpAccountRequests(): Observable<DcpAccount[]> {
        return this.http
        .post(environment.apiUrl + '/admin/dcpAccountRequests', {}, {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<DoctorAccount> = [];


                for (const obj of objArray) {
                    const newDcp = new DcpAccount(obj.id, obj.email, obj.userType);
                    myList.push(newDcp);
                }

                return myList;

            } else {
                const myList: Array<DcpAccount> = [];
                return myList;
            }
        }));
    }

    getDoctorAccounts(active: boolean): Observable<DoctorAccount[]> {
        return this.http
        .post(environment.apiUrl + '/admin/doctorAccounts', JSON.stringify({active: active}), {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<DoctorAccount> = [];

                for (const obj of objArray) {
                    const newDoctor = new DoctorAccount(obj.id, obj.email, obj.userType);
                    myList.push(newDoctor);
                }

                return myList;

            } else {
                const myList: Array<DoctorAccount> = [];
                return myList;
            }
        }));
    }

    getDcpAccounts(active: boolean): Observable<DcpAccount[]> {
        return this.http
        .post(environment.apiUrl + '/admin/dcpAccounts', JSON.stringify({active: active}), {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<DcpAccount> = [];

                for (const obj of objArray) {
                    const newDcp = new DcpAccount(obj.id, obj.email, obj.userType);
                    myList.push(newDcp);
                }

                return myList;

            } else {
                const myList: Array<DcpAccount> = [];
                return myList;
            }
        }));
    }
}
