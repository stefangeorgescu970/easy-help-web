import { DonorAccount } from '../../accounts/donor-account/donor-account';

export class DonationBooking {
    id: number;
    bookingDate: Date;
    donor: DonorAccount;
}
