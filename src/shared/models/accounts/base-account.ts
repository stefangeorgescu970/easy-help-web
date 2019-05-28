import { UserRole } from 'src/shared/enums/user-role.enum';

export class BaseAccount {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    county?: string;
    type: UserRole;
    ssn: string;

    constructor(id: number, email: string, type: UserRole) {
        this.id = id;
        this.email = email;
        this.type = type;
    }
}
