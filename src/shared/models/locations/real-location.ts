export class RealLocation {
    id: number;
    name: string;
    long: number;
    lat: number;

    constructor(id: number, name: string, long: number, lat: number) {
        this.id = id;
        this.name = name;
        this.long = long;
        this.lat = lat;
    }
}
