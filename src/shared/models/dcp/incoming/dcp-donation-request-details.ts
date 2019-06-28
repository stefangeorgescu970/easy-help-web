import { SeparatedBloodType } from './../../shared/separated-blood-type';
import { ExtendedLocation } from 'src/shared/models/shared/extended-location';
export class DcpDonationRequestDetails {
    id: number;
    hospital: ExtendedLocation;
    separatedBloodType: SeparatedBloodType;
    quantity: number;
    urgency: string;
    status: string;
    distance: number;
    hasCommitted: boolean;

    constructor() {
        this.hospital = new ExtendedLocation();
        this.separatedBloodType = new SeparatedBloodType();
    }
}