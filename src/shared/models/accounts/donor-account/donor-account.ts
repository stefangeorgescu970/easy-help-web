import { DonationForm } from './../../donation/donation-form/donation-form';
import { BaseAccount } from '../base-account';
import { UserRole } from 'src/shared/enums/user-role/user-role.enum';

export class DonorAccount extends BaseAccount {
    rh: boolean;
    group: string;
    canDonate: boolean;
    dateOfBirth: Date;
    donationForm: DonationForm;

    constructor(id: number, email: string, type: UserRole) {
        super(id, email, type);
    }
}
