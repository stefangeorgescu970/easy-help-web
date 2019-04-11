import { DonorAccount } from './../../shared/models/accounts/donor-account/donor-account';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ProfileData } from 'src/shared/models/profile-data/profile-data';
import { BaseAccount } from 'src/shared/models/accounts/base-account';

@Injectable({
    providedIn: 'root'
  })
  export class DonorService {

    constructor(private http: HttpClient) { }

    myheader = new HttpHeaders().set('Content-Type', 'application/json');

    getDonorsByCounty(county: string): Observable<DonorAccount[]> {
      return this.http
      .post(environment.apiUrl + '/donor/getInCounty', JSON.stringify({county: county}), {headers: this.myheader})
      .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<DonorAccount> = [];

                for (const obj of objArray) {
                    const newDonor = new DonorAccount(obj.id, obj.email, obj.userType);
                    newDonor.canDonate = obj.canDonate;
                    newDonor.dateOfBirth = obj.dateOfBirth;
                    newDonor.firstName = obj.firstName;
                    newDonor.lastName = obj.lastName;
                    newDonor.group = obj.group;
                    newDonor.rh = obj.rh;
                    myList.push(newDonor);
                }
                return myList;
            } else {
                const myList: Array<DonorAccount> = [];
                return myList;
            }
        }));
    }
  }

