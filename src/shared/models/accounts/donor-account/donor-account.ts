import { BaseAccount } from '../base-account';
import { UserRole } from 'src/shared/enums/user-role/user-role.enum';

export class DonorAccount extends BaseAccount {
    rh: boolean;
    group: string;
    canDonate: boolean;
    dateOfBirth: Date;

    constructor(id: number, email: string, type: UserRole) {
        super(id, email, type);
    }
}
