import { DonationSplitResultsDto } from '../shared/models/donation/donation-split-results-dto/donation-split-results-dto';
import { DonationTestResultsDto } from '../shared/models/donation/donation-test-results-dto/donation-test-results-dto';
import { Donation } from 'src/shared/models/donation/donation/donation';
import { DonationCommitment } from 'src/shared/models/donation/donation-commitment/donation-commitment';
import { PatientData } from '../shared/models/patient/patient-data';
import { DonationRequestDetails } from 'src/shared/models/donation/request-details/donation-request-details';
import { DonationForm } from '../shared/models/donation/donation-form/donation-form';
import { DonorAccount } from 'src/shared/models/accounts/donor-account/donor-account';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { RealLocation } from 'src/shared/models/locations/real-location';
import { LocationResponse } from 'src/shared/models/locations/location-response';
import { BooleanServerResponse } from 'src/shared/models/boolean-server-response/boolean-server-response';
import { DonationBooking } from 'src/shared/models/donation/booking/donation-booking';
import { DoctorAccount } from 'src/shared/models/accounts/doctor-account/doctor-account';
import { StoredBlood } from 'src/shared/models/donation/stored-blood/stored-blood';

@Injectable({
  providedIn: 'root'
})
export class DonationCenterPersonnelService {

    constructor(private http: HttpClient) { }

    myheader = new HttpHeaders().set('Content-Type', 'application/json');

    cancelBooking(booking: DonationBooking): Observable<BooleanServerResponse> {
        return this.http
        .post(environment.apiUrl + '/dcp/cancelBooking', JSON.stringify({id: booking.id}), {headers: this.myheader})
        .pipe(map((res: any) => {
            const booleanResponse = new BooleanServerResponse(res.status);
            if (res.status === false) {
                booleanResponse.exception = res.exception;
            }
            return booleanResponse;
        }));
    }

    createDonationFromBooking(booking: DonationBooking, groupLetter: string, rh: boolean): Observable<BooleanServerResponse> {
        return this.http
        .post(environment.apiUrl + '/dcp/createDonation',
        JSON.stringify({bookingId: booking.id, groupLetter: groupLetter, rh: rh}), {headers: this.myheader})
        .pipe(map((res: any) => {
            const booleanResponse = new BooleanServerResponse(res.status);
            if (res.status === false) {
                booleanResponse.exception = res.exception;
            }
            return booleanResponse;
        }));
    }


    getBookingsAtDonationCenter(donationCenterId: number): Observable<DonationBooking[]> {
        return this.http
        .post(environment.apiUrl + '/dcp/getDCBookings', JSON.stringify({id: donationCenterId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<DonationBooking> = [];

                for (const obj of objArray) {
                    const newBooking = new DonationBooking();
                    newBooking.bookingDate = new Date(obj.bookingDate);
                    newBooking.id = obj.id;

                    const donorObj = obj.donor;
                    const newDonor = new DonorAccount(donorObj.id, donorObj.email, donorObj.userType);
                    newDonor.canDonate = donorObj.canDonate;
                    newDonor.dateOfBirth = donorObj.dateOfBirth;
                    newDonor.firstName = donorObj.firstName;
                    newDonor.lastName = donorObj.lastName;
                    newDonor.group = donorObj.bloodGroupLetter;
                    newDonor.county = donorObj.county;
                    newDonor.rh = donorObj.rh;
                    newDonor.ssn = donorObj.ssn;
                    newBooking.donor = newDonor;

                    const donationForm = new DonationForm();
                    const donationFormObj = donorObj.donationForm;

                    if(donationFormObj !== null) {
                        donationForm.generalGoodHealth = donationFormObj.generalGoodHealth;
                        donationForm.recentLossOfWeight = donationFormObj.recentLossOfWeight;
                        donationForm.recentInexplicableFever = donationFormObj.recentInexplicableFever;
                        donationForm.recentStomatoTreatmentOrVaccine = donationFormObj.recentStomatoTreatmentOrVaccine;
                        donationForm.currentDrugTreatment = donationFormObj.currentDrugTreatment;
                        donationForm.sexWithHIVOrHepatitisLast12Months = donationFormObj.sexWithHIVOrHepatitisLast12Months;
                        donationForm.sexWithPersonWhoInjectsDrugsLast12Months = donationFormObj.sexWithPersonWhoInjectsDrugsLast12Months;
                        donationForm.sexWithProstituteLast12Months = donationFormObj.sexWithProstituteLast12Months;
                        donationForm.sexWithMultiplePartnersLast12Months = donationFormObj.sexWithMultiplePartnersLast12Months;
                        donationForm.injectedDrugs = donationFormObj.injectedDrugs;
                        donationForm.acceptedMoneyOrDrugsForSex = donationFormObj.acceptedMoneyOrDrugsForSex;
                        donationForm.changedSexPartnerLast6Months = donationFormObj.changedSexPartnerLast6Months;
                        donationForm.surgeryOrInvestigationsLast12Months = donationFormObj.surgeryOrInvestigationsLast12Months;
                        donationForm.tattoosOrPiercingsLast12Months = donationFormObj.tattoosOrPiercingsLast12Months;
                        donationForm.transfusionLast12Months = donationFormObj.transfusionLast12Months;
                        donationForm.beenPregnant = donationFormObj.beenPregnant;
                        donationForm.bornLivedTraveledAbroad = donationFormObj.bornLivedTraveledAbroad;
                        donationForm.prisonLastYear = donationFormObj.prisonLastYear;
                        donationForm.exposedHepatitis = donationFormObj.exposedHepatitis;
                        donationForm.sufferFromSet1 = donationFormObj.sufferFromSet1;
                        donationForm.sufferFromSet2 = donationFormObj.sufferFromSet2;
                        donationForm.sufferFromSet3 = donationFormObj.sufferFromSet3;
                        donationForm.sufferFromSet4 = donationFormObj.sufferFromSet4;
                        donationForm.sufferFromSet5 = donationFormObj.sufferFromSet5;
                        donationForm.sufferFromSet6 = donationFormObj.sufferFromSet6;
                        donationForm.sufferFromSet7 = donationFormObj.sufferFromSet7;
                        donationForm.smoker = donationFormObj.smoker;
                        donationForm.beenRefused = donationFormObj.beenRefused;
                        donationForm.requireAttentionPostDonation = donationFormObj.requireAttentionPostDonation;
    
                        donationForm.numberOfPartnersLast6Months = donationFormObj.numberOfPartnersLast6Months;
    
                        donationForm.birthDate = donationFormObj.birthDate;
                        donationForm.lastMenstruation = donationFormObj.lastMenstruation;
                        donationForm.lastAlcoholUse = donationFormObj.lastAlcoholUse;
                        donationForm.travelWhere = donationFormObj.travelWhere;
                        donationForm.travelWhen = donationFormObj.travelWhen;
                        donationForm.alcoholDrank = donationFormObj.alcoholDrank;
                        donationForm.alcoholQuantity = donationFormObj.alcoholQuantity;
    
                        newBooking.donor.donationForm = donationForm;
                    }

                    myList.push(newBooking);
                }

                return myList;
            } else {
                const myList: Array<DonationBooking> = [];
                return myList;
            }
        }));
    }

    getBloodRequests(donationCenterId: number): Observable<DonationRequestDetails[]> {
        return this.http
        .post(environment.apiUrl + '/dcp/seeAllBloodRequests', JSON.stringify({id: donationCenterId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<DonationRequestDetails> = [];

                for (const obj of objArray) {
                    const donReqDetails = new DonationRequestDetails();
                    donReqDetails.id = obj.id;
                    donReqDetails.quantity = obj.quantity;
                    donReqDetails.urgency = obj.urgency;
                    donReqDetails.status = obj.status;

                    donReqDetails.component = obj.separatedBloodType.component;
                    
                    donReqDetails.distance = obj.distance;

                    myList.push(donReqDetails);
                }

                return myList;
            } else {
                const myList: Array<DonationRequestDetails> = [];
                return myList;
            }
        }));
    }

    getBloodInDonationCenter(donationCenterId: number): Observable<StoredBlood[]> {
        return this.http
        .post(environment.apiUrl + '/dcp/getAvailableBloodInDC', JSON.stringify({id: donationCenterId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<StoredBlood> = [];

                for (const obj of objArray) {
                    const newStoredBlood = new StoredBlood();
                    newStoredBlood.id = obj.id;
                    newStoredBlood.quantity = obj.amount;
                    newStoredBlood.component = obj.separatedBloodType.component;
                    newStoredBlood.rh = obj.separatedBloodType.bloodType.rh;
                    newStoredBlood.group = obj.separatedBloodType.bloodType.groupLetter;

                    myList.push(newStoredBlood);
                }

                return myList;
            } else {
                const myList: Array<StoredBlood> = [];
                return myList;
            }
        }));
    }

    commitBlood(donationCenterId: number, bloodId: number, requestId: number): Observable<BooleanServerResponse> {
        return this.http
        .post(environment.apiUrl + '/dcp/commitToBloodRequest', 
              JSON.stringify({donationCenterId: donationCenterId, storedBloodId: bloodId, donationRequestId: requestId}), 
              {headers: this.myheader})
        .pipe(map((res: any) => {
            const booleanResponse = new BooleanServerResponse(res.status);
            if (res.status === false) {
                booleanResponse.exception = res.exception;
            }
            return booleanResponse;
        }));
    }

    getCommitments(locationId: number): Observable<DonationCommitment[]> {
        return this.http
        .post(environment.apiUrl + '/dcp/getCommitments', JSON.stringify({id: locationId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<DonationCommitment> = [];

                for (const obj of objArray) {
                    const newCommitment = new DonationCommitment();
                    
                    newCommitment.status = obj.status;
                    newCommitment.id = obj.id;
                    newCommitment.urgency = obj.urgency;
                    newCommitment.storedBloodIdentifier = obj.storedBloodIdentifier;

                    myList.push(newCommitment);
                }

                return myList;
            } else {
                const myList: Array<DonationCommitment> = [];
                return myList;
            }
        }));
    }

    shipCommitment(commitmentId: number): Observable<BooleanServerResponse> {
        return this.http
        .post(environment.apiUrl + '/dcp/shipCommitment', JSON.stringify({id: commitmentId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            const booleanResponse = new BooleanServerResponse(res.status);
            if (res.status === false) {
                booleanResponse.exception = res.exception;
            }
            return booleanResponse;
        }));
    }

    getDonationsAwaitingTestResult(donationCenterId: number): Observable<Donation[]> {
        return this.http
        .post(environment.apiUrl + '/dcp/getWaitingForTestResults', JSON.stringify({id: donationCenterId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<Donation> = [];

                for (const obj of objArray) {
                    const newDonation = new Donation();
                    newDonation.date = new Date(obj.date);

                    const donorObj = obj.donor;
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
        .post(environment.apiUrl + '/dcp/getWaitingForSplitResults', JSON.stringify({id: donationCenterId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<Donation> = [];

                for (const obj of objArray) {
                    const newDonation = new Donation();
                    newDonation.date = new Date(obj.date);

                    const donorObj = obj.donor;
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
        .post(environment.apiUrl + '/dcp/addTestResult', data,  {headers: this.myheader})
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
        .post(environment.apiUrl + '/dcp/addSplitResults', data,  {headers: this.myheader})
        .pipe(map((res: any) => {
            const booleanResponse = new BooleanServerResponse(res.status);
            if (res.status === false) {
                booleanResponse.exception = res.exception;
            }
            return booleanResponse;
        }));
    }

    getDonorsByCounty(county: string): Observable<DonorAccount[]> {
        return this.http
        .post(environment.apiUrl + '/dcp/getDonorsInCounty', JSON.stringify({county: county}), 
        {headers: this.myheader})
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
  
      filterDonors(county: string, canDonate: boolean, bloodGroup: string): Observable<DonorAccount[]> {
          return this.http
          .post(environment.apiUrl + '/dcp/filterDonors', JSON.stringify({county: county , canDonate: canDonate, groupLetter: bloodGroup}), 
          {headers: this.myheader})
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
