import { UserRole } from 'src/shared/enums/user-role/user-role.enum';

export class BaseAccount {
    id: number;
    firstName?: string;
    lastName?: string;
    email: string;
    city?: string;
    country?: string;
    type: UserRole;

    constructor(id: number, email: string, type: UserRole) {
        this.id = id;
        this.email = email;
        this.type = type;
    }
}
