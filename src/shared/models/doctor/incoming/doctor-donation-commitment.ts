import { SeparatedBloodType } from './../../shared/separated-blood-type';
import { ExtendedLocation } from '../../shared/extended-location';
export class DoctorDonationCommitment {
    id: number;
    status: string;
    separatedBloodType: SeparatedBloodType;
    donationCenter: ExtendedLocation;

    constructor() {
        this.separatedBloodType = new SeparatedBloodType();
        this.donationCenter = new ExtendedLocation();
    }
}