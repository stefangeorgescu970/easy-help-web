import { CreateHospital } from './../shared/models/admin/outgoing/create-hospital';
import { CreateDonationCenter } from './../shared/models/admin/outgoing/create-donation-center';
import { AdminDCPAccount } from '../shared/models/admin/incoming/admin-dcp-account';
import { AdminDoctorAccount } from '../shared/models/admin/incoming/admin-doctor-account';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BooleanServerResponse } from 'src/shared/models/shared/boolean-server-response';
import { ExtendedLocation } from 'src/shared/models/shared/extended-location';
import { IdResponse } from 'src/shared/models/shared/id-response';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

    constructor(private http: HttpClient) { }

    myheader = new HttpHeaders().set('Content-Type', 'application/json');

    getDoctorAccountRequests(): Observable<AdminDoctorAccount[]> {
        return this.http
        .post(environment.apiUrl + '/admin/doctorAccountRequests', {}, {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<AdminDoctorAccount> = [];

                for (const obj of objArray) {
                    const newDoctor = new AdminDoctorAccount();
                    newDoctor.id = obj.id;
                    newDoctor.firstName = obj.firstName;
                    newDoctor.lastName = obj.lastName;
                    newDoctor.email = obj.email;
                    newDoctor.county = obj.county;
                    newDoctor.dateOfBirth = new Date(obj.dateOfBirth);
                    newDoctor.locationName = obj.locationName;
                    newDoctor.locationPhone = obj.locationPhone;
                    myList.push(newDoctor);
                }

                return myList;
            } else {
                const myList: Array<AdminDoctorAccount> = [];
                return myList;
            }
        }));
    }

    getDcpAccountRequests(): Observable<AdminDCPAccount[]> {
        return this.http
        .post(environment.apiUrl + '/admin/dcpAccountRequests', {}, {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<AdminDCPAccount> = [];


                for (const obj of objArray) {
                    const newDcp = new AdminDCPAccount();
                    newDcp.id = obj.id;
                    newDcp.firstName = obj.firstName;
                    newDcp.lastName = obj.lastName;
                    newDcp.email = obj.email;
                    newDcp.county = obj.county;
                    newDcp.dateOfBirth = new Date(obj.dateOfBirth);
                    newDcp.locationName = obj.locationName;
                    newDcp.locationPhone = obj.locationPhone;
                    myList.push(newDcp);
                }

                return myList;

            } else {
                const myList: Array<AdminDCPAccount> = [];
                return myList;
            }
        }));
    }

    getDoctorAccounts(active: boolean): Observable<AdminDoctorAccount[]> {
        return this.http
        .post(environment.apiUrl + '/admin/doctorAccounts', JSON.stringify({param: active}), {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<AdminDoctorAccount> = [];

                for (const obj of objArray) {
                    const newDoctor = new AdminDoctorAccount();
                    newDoctor.id = obj.id;
                    newDoctor.firstName = obj.firstName;
                    newDoctor.lastName = obj.lastName;
                    newDoctor.email = obj.email;
                    newDoctor.county = obj.county;
                    newDoctor.dateOfBirth = new Date(obj.dateOfBirth);
                    newDoctor.locationName = obj.locationName;
                    newDoctor.locationPhone = obj.locationPhone;
                    myList.push(newDoctor);
                }

                return myList;

            } else {
                const myList: Array<AdminDoctorAccount> = [];
                return myList;
            }
        }));
    }

    getDcpAccounts(active: boolean): Observable<AdminDCPAccount[]> {
        return this.http
        .post(environment.apiUrl + '/admin/dcpAccounts', JSON.stringify({param: active}), {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<AdminDCPAccount> = [];

                for (const obj of objArray) {
                    const newDcp = new AdminDCPAccount();
                    newDcp.id = obj.id;
                    newDcp.firstName = obj.firstName;
                    newDcp.lastName = obj.lastName;
                    newDcp.email = obj.email;
                    newDcp.county = obj.county;
                    newDcp.dateOfBirth = new Date(obj.dateOfBirth);
                    newDcp.locationName = obj.locationName;
                    newDcp.locationPhone = obj.locationPhone;
                    myList.push(newDcp);
                }

                return myList;

            } else {
                const myList: Array<AdminDCPAccount> = [];
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


    getDonationCenters(): Observable<ExtendedLocation[]> {
        return this.http
        .post(environment.apiUrl + '/admin/getAllDonationCenters', {}, {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<ExtendedLocation> = [];

                for (const obj of objArray) {
                    const newDc = new ExtendedLocation();
                    newDc.id = obj.id;
                    newDc.name = obj.name;
                    newDc.longitude = obj.longitude;
                    newDc.latitude = obj.latitude;
                    newDc.address = obj.address;
                    newDc.county = obj.county;
                    newDc.phone = obj.phone;

                    myList.push(newDc);
                }

                return myList;
            } else {
                const myList: Array<ExtendedLocation> = [];
                return myList;
            }
        }));
    }

    addDonationCenter(dc: CreateDonationCenter): Observable<IdResponse> {
        return this.http
        .post(environment.apiUrl + '/admin/addDonationCenter', dc, {headers: this.myheader})
        .pipe(map((res: any) => {
            const response = new IdResponse();
            response.success = res.status;
            if (res.status === true) {
                response.newId = res.object.newId;
            } else {
                response.exception = res.exception;
            }
            return response;
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

    addHospital(hospital : CreateHospital): Observable<IdResponse> {
        return this.http
        .post(environment.apiUrl + '/admin/addHospital',hospital, {headers: this.myheader})
        .pipe(map((res: any) => {
            const response = new IdResponse();
            response.success = res.status;
            if (res.status === true) {
                response.newId = res.object.newId;
            } else {
                response.exception = res.exception;
            }
            return response;
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

    getHospitals(): Observable<ExtendedLocation[]> {
        return this.http
        .post(environment.apiUrl + '/admin/getAllHospitals', {}, {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<ExtendedLocation> = [];

                for (const obj of objArray) {
                    const newHospital = new ExtendedLocation();
                    newHospital.id = obj.id;
                    newHospital.name = obj.name;
                    newHospital.longitude = obj.longitude;
                    newHospital.latitude = obj.latitude;
                    newHospital.address = obj.address;
                    newHospital.county = obj.county;
                    newHospital.phone = obj.phone;

                    myList.push(newHospital);
                }

                return myList;
            } else {
                const myList: Array<ExtendedLocation> = [];
                return myList;
            }
        }));
    }
}
