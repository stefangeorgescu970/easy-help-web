import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { RealLocation } from 'src/shared/models/locations/real-location';
import { LocationResponse } from 'src/shared/models/locations/location-response';
import { BooleanServerResponse } from 'src/shared/models/boolean-server-response/boolean-server-response';

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

    addDonationCenter(hospital : RealLocation): Observable<LocationResponse> {
        return this.http
        .post(environment.apiUrl + '/donationCenter/add',hospital, {headers: this.myheader})
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
        .post(environment.apiUrl + '/donationCenter/remove', JSON.stringify({id: requestId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            let booleanResponse = new BooleanServerResponse(res.status)
            if(res.status === false){
                booleanResponse.exception = res.exception
            }
            return booleanResponse
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
