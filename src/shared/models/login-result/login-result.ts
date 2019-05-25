import { ProfileData } from '../profile-data/profile-data';

export class LoginResult {
    success: boolean;
    profileData?: ProfileData;
    error: string;

    constructor(success: boolean, profileData?: ProfileData, error?: string) {
        this.success = success;
        this.profileData = profileData;
        this.error = error;
    }
}
