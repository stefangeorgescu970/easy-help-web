export class RealLocation {
    id: number;
    name: string;
    long: number;
    lat: number;
    county: string;
    address: string;



    constructor(id: number, name: string, long: number, lat: number, county: string, address: string) {
        this.id = id;
        this.name = name;
        this.long = long;
        this.lat = lat;
        this.county= county;
        this.address= address;
    }
}
