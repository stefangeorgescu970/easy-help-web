import { BloodType } from './../../shared/blood-type';
export class DcpDonorAccount {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    canDonate: boolean;
    bloodType: BloodType;
    isMale: boolean;
    dateOfBirth: Date;

    constructor() {
        this.bloodType = new BloodType();
    }
}