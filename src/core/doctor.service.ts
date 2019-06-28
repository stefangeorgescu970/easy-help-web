import { ExtendedLocation } from './../shared/models/shared/extended-location';
import { DoctorDonationCommitment } from 'src/shared/models/doctor/incoming/doctor-donation-commitment';
import { DoctorDonationRequestDetails } from './../shared/models/doctor/incoming/doctor-donation-request-details';
import { DonationRequestCreate } from './../shared/models/doctor/outgoing/donation-request-create';
import { IdResponse } from './../shared/models/shared/id-response';
import { CreatePatient } from './../shared/models/doctor/outgoing/create-patient';
import { BloodType } from './../shared/models/shared/blood-type';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BooleanServerResponse } from 'src/shared/models/shared/boolean-server-response';
import { PatientLevel2 } from 'src/shared/models/doctor/incoming/patient-level-2';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
  })
  export class DoctorService {

    constructor(private http: HttpClient, private authService: AuthService) { }

    myheader = new HttpHeaders().set('Content-Type', 'application/json');

    addPatient(patient: CreatePatient): Observable<IdResponse> {
        return this.http
        .post(environment.apiUrl + '/doctor/addPatient', patient, {headers: this.myheader})
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

    getPatients(doctorId: number): Observable<PatientLevel2[]> {
        return this.http
        .post(environment.apiUrl + '/doctor/seeMyPatients', JSON.stringify({id: doctorId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<PatientLevel2> = [];

                for (const obj of objArray) {
                    const newPatient = new PatientLevel2();
                    newPatient.ssn = obj.ssn;

                    const bloodType = new BloodType();
                    bloodType.groupLetter = obj.bloodType.groupLetter;
                    bloodType.rh = obj.bloodType.rh;
                    newPatient.bloodType = bloodType;
                    newPatient.id = obj.id;

                    myList.push(newPatient);
                }

                return myList;
            } else {
                const myList: Array<PatientLevel2> = [];
                return myList;
            }
        }));
    }

    deletePatient(patientId: number): Observable<BooleanServerResponse> {
        return this.http
        .post(environment.apiUrl + '/doctor/deletePatient',
            JSON.stringify({id: patientId, userId: this.authService.getUser().id}),
            {headers: this.myheader})
        .pipe(map((res: any) => {
            const booleanResponse = new BooleanServerResponse(res.status);
            if (res.status === false) {
                booleanResponse.exception = res.exception;
            }
            return booleanResponse;
        }));
    }

    requestBlood(data: DonationRequestCreate): Observable<BooleanServerResponse> {
        return this.http
        .post(environment.apiUrl + '/doctor/requestBlood', data, {headers: this.myheader})
        .pipe(map((res: any) => {
            const booleanResponse = new BooleanServerResponse(res.status);
            if (res.status === false) {
                booleanResponse.exception = res.exception;
            }
            return booleanResponse;
        }));
    }

    getBloodRequests(doctorId: number): Observable<DoctorDonationRequestDetails[]> {
        return this.http
        .post(environment.apiUrl + '/doctor/seeMyBloodRequests', JSON.stringify({id: doctorId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<DoctorDonationRequestDetails> = [];

                for (const obj of objArray) {
                    const donReqDetails = new DoctorDonationRequestDetails();
                    donReqDetails.id = obj.id;
                    donReqDetails.patient.id = obj.patient.id;
                    donReqDetails.patient.ssn = obj.patient.ssn;
                    donReqDetails.separatedBloodType.component = obj.separatedBloodType.component;
                    donReqDetails.separatedBloodType.bloodType.groupLetter = obj.separatedBloodType.bloodType.groupLetter;
                    donReqDetails.separatedBloodType.bloodType.rh = obj.separatedBloodType.bloodType.rh;
                    donReqDetails.urgency = obj.urgency;
                    donReqDetails.status = obj.status;
                    donReqDetails.quantity = obj.quantity;

                    myList.push(donReqDetails);
                }

                return myList;
            } else {
                const myList: Array<DoctorDonationRequestDetails> = [];
                return myList;
            }
        }));
    }

    cancelRequest(requestId: number): Observable<BooleanServerResponse> {
        return this.http
        .post(environment.apiUrl + '/doctor/cancelBloodRequest',
            JSON.stringify({id: requestId, userId: this.authService.getUser().id}),
            {headers: this.myheader})
        .pipe(map((res: any) => {
            const booleanResponse = new BooleanServerResponse(res.status);
            if (res.status === false) {
                booleanResponse.exception = res.exception;
            }
            return booleanResponse;
        }));
    }

    getCommitments(requestId: number): Observable<DoctorDonationCommitment[]> {
        return this.http
        .post(environment.apiUrl + '/doctor/requestCommitments', JSON.stringify({id: requestId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<DoctorDonationCommitment> = [];

                for (const obj of objArray) {
                    const newCommitment = new DoctorDonationCommitment();
                    const donationCenter = obj.donationCenter;

                    const newDC = new ExtendedLocation();
                    newDC.id = donationCenter.id;
                    newDC.address = donationCenter.address;
                    newDC.county = donationCenter.county;
                    newDC.latitude = donationCenter.latitude;
                    newDC.longitude = donationCenter.longitude;
                    newDC.name = donationCenter.name;
                    newDC.phone = donationCenter.phone;

                    newCommitment.donationCenter = newDC;

                    newCommitment.id = obj.id;
                    newCommitment.status = obj.status;

                    newCommitment.storedBlood.separatedBloodType.bloodType.groupLetter = obj.storedBlood.separatedBloodType.bloodType.groupLetter;
                    newCommitment.storedBlood.separatedBloodType.bloodType.rh = obj.storedBlood.separatedBloodType.bloodType.rh;
                    newCommitment.storedBlood.separatedBloodType.component = obj.storedBlood.separatedBloodType.component;
                    newCommitment.storedBlood.daysUntilExpired = obj.storedBlood.daysUntilExpired;

                    myList.push(newCommitment);
                }

                return myList;
            } else {
                const myList: Array<DoctorDonationCommitment> = [];
                return myList;
            }
        }));
    }

    approveCommitment(commitmentId: number): Observable<string> {
        return this.http
        .post(environment.apiUrl + '/doctor/acceptCommitment',
            JSON.stringify({id: commitmentId, userId: this.authService.getUser().id}),
            {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                return res.object;
            }
            return undefined;
        }));
    }

    declineCommitment(commitmentId: number): Observable<BooleanServerResponse> {
        return this.http
        .post(environment.apiUrl + '/doctor/declineCommitment',
            JSON.stringify({id: commitmentId, userId: this.authService.getUser().id}),
            {headers: this.myheader})
        .pipe(map((res: any) => {
            const booleanResponse = new BooleanServerResponse(res.status);
            if (res.status === false) {
                booleanResponse.exception = res.exception;
            }
            return booleanResponse;
        }));
    }

    markCommitmentAsArrived(commitmentId: number): Observable<BooleanServerResponse> {
        return this.http
        .post(environment.apiUrl + '/doctor/commitmentArrived',
            JSON.stringify({id: commitmentId, userId: this.authService.getUser().id}),
            {headers: this.myheader})
        .pipe(map((res: any) => {
            const booleanResponse = new BooleanServerResponse(res.status);
            if (res.status === false) {
                booleanResponse.exception = res.exception;
            }
            return booleanResponse;
        }));
    }
}
