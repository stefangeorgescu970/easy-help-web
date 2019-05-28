import { BaseAccount } from '../base-account';
import { RealLocation } from '../../locations/real-location';
import { UserRole } from 'src/shared/enums/user-role.enum';

export class DcpAccount extends BaseAccount {
    donationCenter?: RealLocation;

    constructor(id: number, email: string, type: UserRole) {
        super(id, email, type);
    }
}
