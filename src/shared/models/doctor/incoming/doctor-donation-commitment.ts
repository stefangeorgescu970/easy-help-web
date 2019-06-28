import { SeparatedBloodType } from './../../shared/separated-blood-type';
import { ExtendedLocation } from '../../shared/extended-location';
import { StoredBloodLevel1 } from '../../dcp/incoming/stored-blood-level1';
export class DoctorDonationCommitment {
    id: number;
    status: string;
    storedBlood: StoredBloodLevel1;
    donationCenter: ExtendedLocation;

    constructor() {
        this.storedBlood = new StoredBloodLevel1();
        this.donationCenter = new ExtendedLocation();
    }
}