export class RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    ssn: string;
    userType: number;
    password: string;
    locationId: number;

    constructor(firstName: string, lastName: string, email: string, city: string,
                ssn: string, userType: number, password: string, locationId: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.city = city;
        this.ssn = ssn;
        this.userType = userType;
        this.password = password;
        this.locationId = locationId;
    }
}
