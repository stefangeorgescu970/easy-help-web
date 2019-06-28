import { BaseLocation } from './../shared/models/shared/base-location';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

    constructor(private http: HttpClient) { }

    myheader = new HttpHeaders().set('Content-Type', 'application/json');

    getDonationCentersInCounty(county: string): Observable<BaseLocation[]> {
        return this.http
        .post(environment.apiUrl + '/locations/getDonationCentersInCounty', JSON.stringify({county: county}), {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<BaseLocation> = [];

                for (const obj of objArray) {
                    const newDC = new BaseLocation();
                    newDC.id = obj.id;
                    newDC.name = obj.name;
                    myList.push(newDC);
                }

                return myList;
            } else {
                const myList: Array<BaseLocation> = [];
                return myList;
            }
        }));
    }


    getHospitalsInCounty(county: string): Observable<BaseLocation[]> {
        return this.http
        .post(environment.apiUrl + '/locations/getHospitalsInCounty', JSON.stringify({county: county}), {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<BaseLocation> = [];

                for (const obj of objArray) {
                    const newHospital = new BaseLocation();
                    newHospital.id = obj.id;
                    newHospital.name = obj.name;
                    myList.push(newHospital);
                }

                return myList;
            } else {
                const myList: Array<BaseLocation> = [];
                return myList;
            }
        }));
    }
}
