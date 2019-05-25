import { DonorAccount } from 'src/shared/models/accounts/donor-account/donor-account';
export class Donation {
    id: number;
    donor: DonorAccount;
    date: Date;
}
