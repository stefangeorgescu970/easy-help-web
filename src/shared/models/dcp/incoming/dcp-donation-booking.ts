import { DcpDonorAccount } from './dcp-donor-account';
import { DonationForm } from '../../shared/donation-form';

export class DcpDonationBooking {
    id: number;
    donor: DcpDonorAccount;
    bookingDate: Date;
    donationForm: DonationForm;

    constructor() {
        this.donor = new DcpDonorAccount();
        this.donationForm = new DonationForm();
    }
}