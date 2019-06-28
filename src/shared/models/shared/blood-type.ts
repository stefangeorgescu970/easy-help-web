export class BloodType {
    groupLetter: string;
    rh: boolean;

    canDonateTo(patientBlood: BloodType, onComponent: string): boolean {
        switch (onComponent) {
            case 'PLATELETS':
                return this.groupLetter === patientBlood.groupLetter;
            case 'RED_BLOOD_CELLS':
                switch (patientBlood.groupLetter) {
                    case 'A':
                        if (patientBlood.rh) {
                            return this.groupLetter === 'A' || this.groupLetter === '0';
                        } else {
                            return this.rh === false && (this.groupLetter === 'A' || this.groupLetter === '0');
                        }
                    case 'B':
                        if (patientBlood.rh) {
                            return this.groupLetter === 'B' || this.groupLetter === '0';
                        } else {
                            return this.rh === false && (this.groupLetter === 'B' || this.groupLetter === '0');
                        }
                    case 'AB':
                        if (patientBlood.rh) {
                            return true;
                        } else {
                            return this.rh === false;
                        }
                    case '0':
                        if (patientBlood.rh) {
                            return this.groupLetter === '0';
                        } else {
                            return this.rh === false && this.groupLetter === '0';
                        }
                    default:
                        return false;
                    }
            case 'PLASMA':
                switch (patientBlood.groupLetter) {
                    case 'A':
                        return this.groupLetter === 'A' || this.groupLetter === 'AB';
                    case 'B':
                        return this.groupLetter === 'B' || this.groupLetter === 'AB';
                    case 'AB':
                        return this.groupLetter === 'AB';
                    case '0':
                        return true;
                    default:
                        return false;
                }
            default:
                return false;
        }
    }
}
