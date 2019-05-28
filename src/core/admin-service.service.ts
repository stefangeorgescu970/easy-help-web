import { LocationResponse } from '../shared/models/locations/location-response';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DoctorAccount } from 'src/shared/models/accounts/doctor-account/doctor-account';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { DcpAccount } from 'src/shared/models/accounts/dcp-account/dcp-account';
import { BooleanServerResponse } from 'src/shared/models/boolean-server-response/boolean-server-response';
import { RealLocation } from 'src/shared/models/locations/real-location';

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
        .post(environment.apiUrl + '/admin/doctorAccounts', JSON.stringify({param: active}), {headers: this.myheader})
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
        .post(environment.apiUrl + '/admin/dcpAccounts', JSON.stringify({param: active}), {headers: this.myheader})
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

    acceptDoctorRequest(requestId: number): Observable<BooleanServerResponse> {
        return this.http
        .post(environment.apiUrl + '/admin/approveDoctorAccount', JSON.stringify({id: requestId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            let booleanResponse = new BooleanServerResponse(res.status)
            if(res.status === false){
                booleanResponse.exception = res.exception
            }
            return booleanResponse
        }));
    }

    declineDoctorRequest(requestId: number ): Observable<BooleanServerResponse> {
        return this.http
        .post(environment.apiUrl + '/admin/rejectDoctorAccount', JSON.stringify({id: requestId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            let booleanResponse = new BooleanServerResponse(res.status)
            if(res.status === false){
                booleanResponse.exception = res.exception
            }
            return booleanResponse
        }));
    }

    acceptDCPRequest(requestId: number): Observable<BooleanServerResponse> {
        return this.http
        .post(environment.apiUrl + '/admin/approveDcpAccount', JSON.stringify({id: requestId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            let booleanResponse = new BooleanServerResponse(res.status)
            if(res.status === false){
                booleanResponse.exception = res.exception
            }
            return booleanResponse
        }));
    }

    declineDCPRequest(requestId: number ): Observable<BooleanServerResponse> {
        return this.http
        .post(environment.apiUrl + '/admin/rejectDcpAccount', JSON.stringify({id: requestId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            let booleanResponse = new BooleanServerResponse(res.status)
            if(res.status === false){
                booleanResponse.exception = res.exception
            }
            return booleanResponse
        }));
    }

    deactivateDCPAccount(requestId: number ): Observable<BooleanServerResponse> {
        return this.http
        .post(environment.apiUrl + '/admin/deactivateDcpAccount', JSON.stringify({id: requestId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            let booleanResponse = new BooleanServerResponse(res.status)
            if(res.status === false){
                booleanResponse.exception = res.exception
            }
            return booleanResponse
        }));
    }

    deactivateDoctorAccount(requestId: number ): Observable<BooleanServerResponse> {
        return this.http
        .post(environment.apiUrl + '/admin/deactivateDoctorAccount', JSON.stringify({id: requestId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            let booleanResponse = new BooleanServerResponse(res.status)
            if(res.status === false){
                booleanResponse.exception = res.exception
            }
            return booleanResponse
        }));
    }

    sendTestPush(email: string): Observable<BooleanServerResponse> {
        return this.http
        .post(environment.apiUrl + '/admin/sendTestNotification', JSON.stringify({param: email}), {headers: this.myheader})
        .pipe(map((res: any) => {
            const booleanResponse = new BooleanServerResponse(res.status);
            if (res.status === false) {
                booleanResponse.exception = res.exception;
            }
            return booleanResponse;
        }));
    }


    getDonationCenters(): Observable<RealLocation[]> {
        return this.http
        .post(environment.apiUrl + '/admin/getAllDonationCenters', {}, {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<RealLocation> = [];

                for (const obj of objArray) {
                    const newDc = new RealLocation(obj.id, obj.name, obj.longitude, obj.latitude, obj.county, obj.address);
                    myList.push(newDc);
                }

                return myList;
            } else {
                const myList: Array<RealLocation> = [];
                return myList;
            }
        }));
    }

    addDonationCenter(dc : RealLocation): Observable<LocationResponse> {
        return this.http
        .post(environment.apiUrl + '/admin/addDonationCenter',dc, {headers: this.myheader})
        .pipe(map((res: any) => {
            let response = new LocationResponse(res.status)
            if(res.status === true){
                response.model = res.object
            }else{
                response.exception = res.exception
            }
            return response
        }));
    }

    removeDonationCenter(requestId: number ): Observable<BooleanServerResponse> {
        return this.http
        .post(environment.apiUrl + '/admin/removeDonationCenter', JSON.stringify({id: requestId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            let booleanResponse = new BooleanServerResponse(res.status)
            if(res.status === false){
                booleanResponse.exception = res.exception
            }
            return booleanResponse
        }));
    }

    populateTables() {
        this.http
        .get(environment.apiUrl + '/mocks/populateTables', {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === false) {
                alert(res.exception);
            } else {
                this.http
                .get(environment.apiUrl + '/mocks/populateTables2', {headers: this.myheader})
                .pipe(map((res: any) => {
                    if (res.status === false) {
                        alert(res.exception);
                    } else {
                        alert('tables populated');
                    }
                })).subscribe((internalRes: any) => {

                });
            }
        })).subscribe((internalRes: any) => {

        });
    }

    addHospital(hospital : RealLocation): Observable<LocationResponse> {
        return this.http
        .post(environment.apiUrl + '/admin/addHospital',hospital, {headers: this.myheader})
        .pipe(map((res: any) => {
            let response = new LocationResponse(res.status)
            if(res.status === true){
                response.model = res.object
            }else{
                response.exception = res.exception
            }
            return response
        }));
    }

    removeHospital(requestId: number ): Observable<BooleanServerResponse> {
        return this.http
        .post(environment.apiUrl + '/admin/removeHospital', JSON.stringify({id: requestId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            let booleanResponse = new BooleanServerResponse(res.status)
            if(res.status === false){
                booleanResponse.exception = res.exception
            }
            return booleanResponse
        }));
    }

    getHospitals(): Observable<RealLocation[]> {
        return this.http
        .post(environment.apiUrl + '/admin/getAllHospitals', {}, {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<RealLocation> = [];

                for (const obj of objArray) {
                    const newHospital = new RealLocation(obj.id, obj.name, obj.longitude, obj.latitude, obj.county, obj.address);
                    myList.push(newHospital);
                }

                return myList;
            } else {
                const myList: Array<RealLocation> = [];
                return myList;
            }
        }));
    }
}
