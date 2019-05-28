import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RealLocation } from 'src/shared/models/locations/real-location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

    constructor(private http: HttpClient) { }

    myheader = new HttpHeaders().set('Content-Type', 'application/json');

    getDonationCentersInCounty(county: string): Observable<RealLocation[]> {
        return this.http
        .post(environment.apiUrl + '/locations/getDonationCentersInCounty', JSON.stringify({county: county}), {headers: this.myheader})
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


    getHospitalsInCounty(county: string): Observable<RealLocation[]> {
        return this.http
        .post(environment.apiUrl + '/locations/getHospitalsInCounty', JSON.stringify({county: county}), {headers: this.myheader})
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
