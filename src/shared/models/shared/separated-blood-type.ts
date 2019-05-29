import { BloodType } from './blood-type';
export class SeparatedBloodType {
    component: string;
    bloodType: BloodType;

    constructor () {
        this.bloodType = new BloodType();
    }
}