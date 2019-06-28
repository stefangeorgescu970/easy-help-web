import { BaseLocation } from './../../shared/base-location';
import { DcpDonorAccount } from './dcp-donor-account';

export class DcpDonation {
    id: number;
    donor: DcpDonorAccount;
    donationCenter: BaseLocation;
    date: Date;

    constructor() {
        this.donor = new DcpDonorAccount();
        this.donationCenter = new BaseLocation();
    }
}
