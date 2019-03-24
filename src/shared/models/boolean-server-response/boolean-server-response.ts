export class BooleanServerResponse {

    success: boolean;
    exception?: string;

    constructor(success: boolean, exception?: string) {
        this.success = success;
        this.exception = exception;
    }
}
