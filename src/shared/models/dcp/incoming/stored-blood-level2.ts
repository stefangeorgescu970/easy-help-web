import { StoredBloodLevel1 } from './stored-blood-level1';
import { DcpDonorAccount } from './dcp-donor-account';

export class StoredBloodLevel2 extends StoredBloodLevel1 {
    donor: DcpDonorAccount;

    constructor() {
        super();
        this.donor = new DcpDonorAccount();
    }
}