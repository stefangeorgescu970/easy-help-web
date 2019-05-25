import { DonationCommitment } from 'src/shared/models/donation/donation-commitment/donation-commitment';
import { PatientData } from './../../shared/models/patient/patient-data';
import { DonationRequestDetails } from 'src/shared/models/donation/request-details/donation-request-details';
import { DonationForm } from './../../shared/models/donation/donation-form/donation-form';
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

    cancelBooking(booking: DonationBooking): Observable<BooleanServerResponse> {
        return this.http
        .post(environment.apiUrl + '/donationCenter/cancelBooking', JSON.stringify({id: booking.id}), {headers: this.myheader})
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
        .post(environment.apiUrl + '/donationCenter/createDonation',
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
        .post(environment.apiUrl + '/donationCenter/getDCBookings', JSON.stringify({id: donationCenterId}), {headers: this.myheader})
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
        .post(environment.apiUrl + '/donationCenter/seeAllBloodRequests', JSON.stringify({id: donationCenterId}), {headers: this.myheader})
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

                    const patient = new PatientData();
                    patient.id = obj.patient.id;
                    patient.group = obj.patient.bloodType.groupLetter;
                    patient.rh = obj.patient.bloodType.rh;
                    patient.ssn = obj.patient.ssn;
                    donReqDetails.patient = patient;
                    donReqDetails.component = obj.separatedBloodTypeDTO.component;

                    const doctorObj = obj.doctor;
                    const doctor = new DoctorAccount(doctorObj.id, doctorObj.email, doctorObj.userType);

                    donReqDetails.doctor = doctor;
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
        .post(environment.apiUrl + '/donationCenter/getAvailableBloodInDC', JSON.stringify({id: donationCenterId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            if (res.status === true) {
                const objArray = res.object.objects;
                const myList: Array<StoredBlood> = [];

                for (const obj of objArray) {
                    const newStoredBlood = new StoredBlood();
                    newStoredBlood.id = obj.id;
                    newStoredBlood.quantity = obj.amount;
                    newStoredBlood.component = obj.separatedBloodTypeDTO.component;
                    newStoredBlood.rh = obj.separatedBloodTypeDTO.bloodType.rh;
                    newStoredBlood.group = obj.separatedBloodTypeDTO.bloodType.groupLetter;

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
        .post(environment.apiUrl + '/donationCenter/commitToBloodRequest', 
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
        .post(environment.apiUrl + '/donationCenter/getCommitments', JSON.stringify({id: locationId}), {headers: this.myheader})
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
        .post(environment.apiUrl + '/donationCenter/shipCommitment', JSON.stringify({id: commitmentId}), {headers: this.myheader})
        .pipe(map((res: any) => {
            const booleanResponse = new BooleanServerResponse(res.status);
            if (res.status === false) {
                booleanResponse.exception = res.exception;
            }
            return booleanResponse;
        }));
    }
}
