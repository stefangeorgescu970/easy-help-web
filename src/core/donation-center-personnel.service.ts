import { ExtendedLocation } from 'src/shared/models/shared/extended-location';
import { SeparatedBloodType } from './../shared/models/shared/separated-blood-type';
import { StoredBlood } from 'src/shared/models/donation/stored-blood/stored-blood';
import { DcpDonorAccount } from './../shared/models/dcp/incoming/dcp-donor-account';
import { DcpDonationRequestDetails } from './../shared/models/dcp/incoming/dcp-donation-request-details';
import { DonationSplitResultsDto } from '../shared/models/dcp/outgoing/donation-split-results-dto/donation-split-results-dto';
import { DonationTestResultsDto } from '../shared/models/dcp/outgoing/donation-test-results-dto';
import { DonationForm } from '../shared/models/shared/donation-form';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BooleanServerResponse } from 'src/shared/models/shared/boolean-server-response';
import { DcpDonationBooking } from 'src/shared/models/dcp/incoming/dcp-donation-booking';
import { DcpDonation } from 'src/shared/models/dcp/incoming/dcp-donation';
import { StoredBloodLevel1 } from 'src/shared/models/dcp/incoming/stored-blood-level1';
import { DcpDonationCommitment } from 'src/shared/models/dcp/incoming/dcp-donation-commitment';

@Injectable({
  providedIn: 'root'
})
export class DonationCenterPersonnelService {

    constructor(private http: HttpClient) { }

    myheader = new HttpHeaders().set('Content-Type', 'application/json');

    cancelBooking(booking: DcpDonationBooking): Observable<BooleanServerResponse> {
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

    createDonationFromBooking(booking: DcpDonationBooking, groupLetter: string, rh: boolean): Observable<BooleanServerResponse> {
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


    getBookingsAtDonationCenter(donationCenterId: number): Observable<DcpDonationBooking[]> {
        return this.http
        .post(environment.apiUrl + '/dcp/getDCBookings', JSON.stringify({id: donationCenterId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<DcpDonationBooking> = [];

                for (const obj of objArray) {
                    const newBooking = new DcpDonationBooking();
                    newBooking.bookingDate = new Date(obj.bookingDate);
                    newBooking.id = obj.id;

                    const donorObj = obj.donor;
                    const newDonor = new DcpDonorAccount();
                    newDonor.canDonate = donorObj.canDonate;
                    newDonor.dateOfBirth = new Date(donorObj.dateOfBirth);
                    newDonor.firstName = donorObj.firstName;
                    newDonor.lastName = donorObj.lastName;
                    newDonor.email = donorObj.email;
                    if (donorObj.bloodType !== null) {
                      newDonor.bloodType.groupLetter = donorObj.bloodType.groupLetter;
                      newDonor.bloodType.rh = donorObj.bloodType.rh;
                    }
                    newDonor.id = donorObj.id;
                    newDonor.isMale = donorObj.isMale;
                    newBooking.donor = newDonor;
                    const donationFormObj = obj.donationForm;

                    if(donationFormObj !== null) {
                        const donationForm = new DonationForm();
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
    
                        newBooking.donationForm = donationForm;
                    }

                    myList.push(newBooking);
                }

                return myList;
            } else {
                const myList: Array<DcpDonationBooking> = [];
                return myList;
            }
        }));
    }

    getBloodRequests(donationCenterId: number): Observable<DcpDonationRequestDetails[]> {
        return this.http
        .post(environment.apiUrl + '/dcp/seeAllBloodRequests', JSON.stringify({id: donationCenterId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<DcpDonationRequestDetails> = [];

                for (const obj of objArray) {
                    const donReqDetails = new DcpDonationRequestDetails();
                    donReqDetails.id = obj.id;
                    donReqDetails.quantity = obj.quantity;
                    donReqDetails.urgency = obj.urgency;
                    donReqDetails.status = obj.status;
                    donReqDetails.distance = obj.distance;
                    donReqDetails.hasCommitted = obj.hasCommitted;

                    donReqDetails.hospital.id = obj.hospital.id;
                    donReqDetails.hospital.name = obj.hospital.name;
                    donReqDetails.hospital.address = obj.hospital.address;
                    donReqDetails.hospital.county = obj.hospital.county;
                    donReqDetails.hospital.longitude = obj.hospital.longitude;
                    donReqDetails.hospital.latitude = obj.hospital.latitude;
                    donReqDetails.hospital.phone = obj.hospital.phone;

                    donReqDetails.separatedBloodType.component = obj.separatedBloodType.component;
                    donReqDetails.separatedBloodType.bloodType.groupLetter = obj.separatedBloodType.bloodType.groupLetter;
                    donReqDetails.separatedBloodType.bloodType.rh = obj.separatedBloodType.bloodType.rh;

                    myList.push(donReqDetails);
                }

                return myList;
            } else {
                const myList: Array<DcpDonationRequestDetails> = [];
                return myList;
            }
        }));
    }

    getBloodInDonationCenter(donationCenterId: number): Observable<StoredBloodLevel1[]> {
        return this.http
        .post(environment.apiUrl + '/dcp/getAvailableBloodInDC', JSON.stringify({id: donationCenterId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<StoredBloodLevel1> = [];

                for (const obj of objArray) {
                    const newStoredBlood = new StoredBloodLevel1();
                    newStoredBlood.id = obj.id;
                    newStoredBlood.amount = obj.amount;
                    newStoredBlood.bagIdentifier = obj.bagIdentifier;
                    newStoredBlood.separatedBloodType.component = obj.separatedBloodType.component;
                    newStoredBlood.separatedBloodType.bloodType.rh = obj.separatedBloodType.bloodType.rh;
                    newStoredBlood.separatedBloodType.bloodType.groupLetter = obj.separatedBloodType.bloodType.groupLetter;

                    myList.push(newStoredBlood);
                }

                return myList;
            } else {
                const myList: Array<StoredBloodLevel1> = [];
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

    getCommitments(locationId: number): Observable<DcpDonationCommitment[]> {
        return this.http
        .post(environment.apiUrl + '/dcp/getCommitments', JSON.stringify({id: locationId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<DcpDonationCommitment> = [];

                for (const obj of objArray) {
                    const newCommitment = new DcpDonationCommitment();
                    
                    newCommitment.id = obj.id;
                    newCommitment.storedBlood.id = obj.storedBlood.id;
                    newCommitment.storedBlood.separatedBloodType.component = obj.storedBlood.separatedBloodType.component;
                    newCommitment.storedBlood.separatedBloodType.bloodType.rh = obj.storedBlood.separatedBloodType.bloodType.rh;
                    newCommitment.storedBlood.separatedBloodType.bloodType.groupLetter = obj.storedBlood.separatedBloodType.bloodType.groupLetter;
                    newCommitment.storedBlood.amount = obj.storedBlood.amount;
                    newCommitment.storedBlood.bagIdentifier = obj.storedBlood.bagIdentifier;
                    
                    const hospObj = obj.destinationHospital;

                    newCommitment.destinationHospital.id = hospObj.id;
                    newCommitment.destinationHospital.name = hospObj.name;
                    newCommitment.destinationHospital.longitude = hospObj.longitude;
                    newCommitment.destinationHospital.latitude = hospObj.latitude;
                    newCommitment.destinationHospital.address = hospObj.address;
                    newCommitment.destinationHospital.county = hospObj.county;
                    newCommitment.destinationHospital.phone = hospObj.phone;
                     

                    newCommitment.status = obj.status;
                    newCommitment.urgency = obj.urgency;
                    
                    myList.push(newCommitment);
                }

                return myList;
            } else {
                const myList: Array<DcpDonationCommitment> = [];
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

    getDonationsAwaitingTestResult(donationCenterId: number): Observable<DcpDonation[]> {
        return this.http
        .post(environment.apiUrl + '/dcp/getWaitingForTestResults', JSON.stringify({id: donationCenterId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<DcpDonation> = [];

                for (const obj of objArray) {
                    const newDonation = new DcpDonation();
                    newDonation.date = new Date(obj.date);
                    newDonation.id = obj.id;

                    const donorObj = obj.donor;
                    newDonation.donor.canDonate = donorObj.canDonate;
                    newDonation.donor.dateOfBirth = donorObj.dateOfBirth;
                    newDonation.donor.firstName = donorObj.firstName;
                    newDonation.donor.lastName = donorObj.lastName;
                    if (donorObj.bloodType !== null) {
                        newDonation.donor.bloodType.groupLetter = donorObj.bloodType.groupLetter;
                        newDonation.donor.bloodType.rh = donorObj.bloodType.rh;
                    }

                    myList.push(newDonation);
                }

                return myList;
            } else {
                const myList: Array<DcpDonation> = [];

                return myList;
            }
        }));
    }

    getDonationsAwaitingSplitResult(donationCenterId: number): Observable<DcpDonation[]> {
        return this.http
        .post(environment.apiUrl + '/dcp/getWaitingForSplitResults', JSON.stringify({id: donationCenterId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<DcpDonation> = [];

                for (const obj of objArray) {
                    const newDonation = new DcpDonation();
                    newDonation.date = new Date(obj.date);
                    newDonation.id = obj.id;

                    const donorObj = obj.donor;
                    newDonation.donor.canDonate = donorObj.canDonate;
                    newDonation.donor.dateOfBirth = donorObj.dateOfBirth;
                    newDonation.donor.firstName = donorObj.firstName;
                    newDonation.donor.lastName = donorObj.lastName;
                    if (donorObj.bloodType !== null) {
                        newDonation.donor.bloodType.groupLetter = donorObj.bloodType.groupLetter;
                        newDonation.donor.bloodType.rh = donorObj.bloodType.rh;
                    }

                    myList.push(newDonation);
                }

                return myList;
            } else {
                const myList: Array<DcpDonation> = [];

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

    getDonorsByCounty(county: string): Observable<DcpDonorAccount[]> {
        return this.http
        .post(environment.apiUrl + '/dcp/getDonorsInCounty', JSON.stringify({county: county}), 
        {headers: this.myheader})
        .pipe(map((res: any) => {
              if (res.status === true) {
                  const objArray = res.object.objects;
                  const myList: Array<DcpDonorAccount> = [];
  
                  for (const obj of objArray) {
                      const newDonor = new DcpDonorAccount();
                      newDonor.canDonate = obj.canDonate;
                      newDonor.dateOfBirth = new Date(obj.dateOfBirth);
                      newDonor.firstName = obj.firstName;
                      newDonor.lastName = obj.lastName;
                      newDonor.email = obj.email;
                      if (obj.bloodType !== null) {
                        newDonor.bloodType.groupLetter = obj.bloodType.groupLetter;
                        newDonor.bloodType.rh = obj.bloodType.rh;
                      }
                      newDonor.id = obj.id;
                      newDonor.isMale = obj.isMale;
                      myList.push(newDonor);
                  }
                  return myList;
              } else {
                  const myList: Array<DcpDonorAccount> = [];
                  return myList;
              }
          }));
      }
  
      filterDonors(county: string, canDonate: boolean, bloodGroup: string): Observable<DcpDonorAccount[]> {
          return this.http
          .post(environment.apiUrl + '/dcp/filterDonors', JSON.stringify({county: county , canDonate: canDonate, groupLetter: bloodGroup}), 
          {headers: this.myheader})
          .pipe(map((res: any) => {
                if (res.status === true) {
                    const objArray = res.object.objects;
                    const myList: Array<DcpDonorAccount> = [];
    
                    for (const obj of objArray) {
                        const newDonor = new DcpDonorAccount();
                        newDonor.canDonate = obj.canDonate;
                        newDonor.dateOfBirth = new Date(obj.dateOfBirth);
                        newDonor.firstName = obj.firstName;
                        newDonor.lastName = obj.lastName;
                        newDonor.email = obj.email;
                        if (obj.bloodType !== null) {
                            newDonor.bloodType.groupLetter = obj.bloodType.groupLetter;
                            newDonor.bloodType.rh = obj.bloodType.rh;
                        }
                        newDonor.id = obj.id;
                        newDonor.isMale = obj.isMale;
                        myList.push(newDonor);
                    }
                    return myList;
                } else {
                    const myList: Array<DcpDonorAccount> = [];
                    return myList;
                }
            }));
        }
}
