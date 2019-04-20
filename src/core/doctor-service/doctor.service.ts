import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BooleanServerResponse } from 'src/shared/models/boolean-server-response/boolean-server-response';
import { PatientData } from 'src/shared/models/patient/patient-data';


@Injectable({
    providedIn: 'root'
  })
  export class DoctorService {

    constructor(private http: HttpClient) { }

    myheader = new HttpHeaders().set('Content-Type', 'application/json');

    addPatient(patient: PatientData): Observable<BooleanServerResponse> {
        return this.http
        .post(environment.apiUrl + '/doctor/addPatient', JSON.stringify( { 
            ssn: patient.ssn,
            doctorId: patient.doctorId,
            bloodType: {
                groupLetter: patient.group,
                rh: patient.rh
            }
        }), {headers: this.myheader})
        .pipe(map((res: any) => {
            const booleanResponse = new BooleanServerResponse(res.status);
            if (res.status === false) {
                booleanResponse.exception = res.exception;
            }
            return booleanResponse;
        }));
    }

    getPatients(doctorId: number): Observable<PatientData[]> {
        return this.http
        .post(environment.apiUrl + '/doctor/seeMyPatients', JSON.stringify({id: doctorId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<PatientData> = [];

                for (const obj of objArray) {
                    const newPatient = new PatientData();
                    newPatient.ssn = obj.ssn;
                    newPatient.doctorId = obj.doctorId;
                    newPatient.group = obj.bloodType.groupLetter;
                    newPatient.rh = obj.bloodType.rh;
                    newPatient.id = obj.id;

                    myList.push(newPatient);
                }

                return myList;
            } else {
                const myList: Array<PatientData> = [];
                return myList;
            }
        }));
    }

    deletePatient(patientId: number): Observable<BooleanServerResponse> {
        return this.http
        .post(environment.apiUrl + '/doctor/deletePatient', JSON.stringify({id: patientId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            const booleanResponse = new BooleanServerResponse(res.status);
            if (res.status === false) {
                booleanResponse.exception = res.exception;
            }
            return booleanResponse;
        }));
    }
  }
