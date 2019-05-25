import { DonationSplitResultsDto } from './../../shared/models/donation/donation-split-results-dto/donation-split-results-dto';
import { DonorAccount } from 'src/shared/models/accounts/donor-account/donor-account';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Donation } from 'src/shared/models/donation/donation/donation';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { DonationTestResultsDto } from 'src/shared/models/donation/donation-test-results-dto/donation-test-results-dto';
import { BooleanServerResponse } from 'src/shared/models/boolean-server-response/boolean-server-response';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

    constructor(private http: HttpClient) { }

    myheader = new HttpHeaders().set('Content-Type', 'application/json');

    getDonationsAwaitingTestResult(donationCenterId: number): Observable<Donation[]> {
        return this.http
        .post(environment.apiUrl + '/donation/getWaitingForTestResults', JSON.stringify({id: donationCenterId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<Donation> = [];

                for (const obj of objArray) {
                    const newDonation = new Donation();
                    newDonation.date = new Date(obj.date);

                    const donorObj = obj.donorAccountDTO;
                    const newDonor = new DonorAccount(donorObj.id, donorObj.email, donorObj.userType);
                    newDonor.canDonate = donorObj.canDonate;
                    newDonor.dateOfBirth = donorObj.dateOfBirth;
                    newDonor.firstName = donorObj.firstName;
                    newDonor.lastName = donorObj.lastName;
                    newDonor.group = donorObj.bloodGroupLetter;
                    newDonor.county = donorObj.county;
                    newDonor.rh = donorObj.rh;
                    newDonor.ssn = donorObj.ssn;
                    newDonation.donor = newDonor;

                    newDonation.id = obj.id;

                    myList.push(newDonation);
                }

                return myList;
            } else {
                const myList: Array<Donation> = [];

                return myList;
            }
        }));
    }

    getDonationsAwaitingSplitResult(donationCenterId: number): Observable<Donation[]> {
        return this.http
        .post(environment.apiUrl + '/donation/getWaitingForSplitResults', JSON.stringify({id: donationCenterId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<Donation> = [];

                for (const obj of objArray) {
                    const newDonation = new Donation();
                    newDonation.date = new Date(obj.date);

                    const donorObj = obj.donorAccountDTO;
                    const newDonor = new DonorAccount(donorObj.id, donorObj.email, donorObj.userType);
                    newDonor.canDonate = donorObj.canDonate;
                    newDonor.dateOfBirth = donorObj.dateOfBirth;
                    newDonor.firstName = donorObj.firstName;
                    newDonor.lastName = donorObj.lastName;
                    newDonor.group = donorObj.bloodGroupLetter;
                    newDonor.county = donorObj.county;
                    newDonor.rh = donorObj.rh;
                    newDonor.ssn = donorObj.ssn;
                    newDonation.donor = newDonor;

                    newDonation.id = obj.id;

                    myList.push(newDonation);
                }

                return myList;
            } else {
                const myList: Array<Donation> = [];

                return myList;
            }
        }));
    }

    addTestResults(data: DonationTestResultsDto): Observable<BooleanServerResponse> {
        return this.http
        .post(environment.apiUrl + '/donation/addTestResult', data,  {headers: this.myheader})
        .pipe(map((res: any) => {
            const booleanResponse = new BooleanServerResponse(res.status);
            if (res.status === false) {
                booleanResponse.exception = res.exception;
            }
            return booleanResponse;
        }));
    }

    addSplitResults(data: DonationSplitResultsDto): Observable<BooleanServerResponse> {
        return this.http
        .post(environment.apiUrl + '/donation/addSplitResults', data,  {headers: this.myheader})
        .pipe(map((res: any) => {
            const booleanResponse = new BooleanServerResponse(res.status);
            if (res.status === false) {
                booleanResponse.exception = res.exception;
            }
            return booleanResponse;
        }));
    }
}
