import { RealLocation } from '../../locations/real-location';

export class DonationCommitment {
    id: number;
    donationCenter: RealLocation;
    status: string;
    urgency: string;
    storedBloodIdentifier: number;
}
