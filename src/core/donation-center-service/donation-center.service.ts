import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { RealLocation } from 'src/shared/models/locations/real-location';

@Injectable({
  providedIn: 'root'
})
export class DonationCenterService {

    constructor(private http: HttpClient) { }

    myheader = new HttpHeaders().set('Content-Type', 'application/json');

    getDonationCenters(): Observable<RealLocation[]> {
        return this.http
        .post(environment.apiUrl + '/donationCenter/getAll', {}, {headers: this.myheader})
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

    getDonationCentersInCounty(county: string): Observable<RealLocation[]> {
        return this.http
        .post(environment.apiUrl + '/donationCenter/getInCounty', JSON.stringify({county: county}), {headers: this.myheader})
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
