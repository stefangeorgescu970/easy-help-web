export class RealLocation {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
    county: string;
    address: string;

    constructor(id: number, name: string, long: number, lat: number, county: string, address: string) {
        this.id = id;
        this.name = name;
        this.longitude = long;
        this.latitude = lat;
        this.county= county;
        this.address= address;
    }
}
