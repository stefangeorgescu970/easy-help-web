import { StoredBloodLevel1 } from './stored-blood-level1';
import { ExtendedLocation } from '../../shared/extended-location';
export class DcpDonationCommitment {
    id: number;
    storedBlood: StoredBloodLevel1;
    status: string;
    urgency: string;
    destinationHospital: ExtendedLocation;

    constructor() {
        this.storedBlood = new StoredBloodLevel1();
        this.destinationHospital = new ExtendedLocation();
    }
}
