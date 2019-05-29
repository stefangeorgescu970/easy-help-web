import { SeparatedBloodType } from '../../shared/separated-blood-type';
export class StoredBloodLevel1 {
    id: number;
    separatedBloodType: SeparatedBloodType;
    amount: number;
    bagIdentifier: string;

    constructor() {
        this.separatedBloodType = new SeparatedBloodType();
    }
}