import { BaseLocation } from './base-location';
export class ExtendedLocation extends BaseLocation {
    address: string;
    county: string;
    longitude: number;
    latitude: number;
    phone: string;
}