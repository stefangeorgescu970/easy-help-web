import { ProfileData } from '../profile-data/profile-data';

export class LoginResult {
    success: boolean;
    profileData?: ProfileData;

    constructor(success: boolean, profileData?: ProfileData) {
        this.success = success;
        this.profileData = profileData;
    }
}
