import { RealLocation } from './real-location';

export class LocationResponse {

    success: boolean;
    exception?: string;
    model? : RealLocation

    constructor(success: boolean, model?: RealLocation ,exception?: string) {
        this.success = success;
        this.exception = exception;
        this.model = model
    }
}
