import { DoctorAccount } from './../../accounts/doctor-account/doctor-account';
import { PatientData } from '../../patient/patient-data';

export class DonationRequestDetails {
    id: number;
    quantity: number;
    urgency: string;
    patient: PatientData;
    doctor: DoctorAccount;
    component: string;
    status: string;

    distance: string;

    constructor() {
        this.patient = new PatientData();
        this.doctor = undefined;
    }
}
