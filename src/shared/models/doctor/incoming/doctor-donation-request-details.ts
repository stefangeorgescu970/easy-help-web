import { PatientLevel1 } from './patient-level-1';
import { SeparatedBloodType } from '../../shared/separated-blood-type';

export class DoctorDonationRequestDetails {
    id: number;
    patient: PatientLevel1;
    separatedBloodType: SeparatedBloodType;
    quantity: number;
    urgency: string;
    status: string;

    constructor() {
        this.patient = new PatientLevel1();
        this.separatedBloodType = new SeparatedBloodType();
    }
}
