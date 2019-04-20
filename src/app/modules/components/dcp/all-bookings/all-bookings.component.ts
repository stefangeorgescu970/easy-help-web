import { BooleanServerResponse } from './../../../../../shared/models/boolean-server-response/boolean-server-response';
import { AuthService } from './../../../../../core/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';
import { DonationCenterService } from 'src/core/donation-center-service/donation-center.service';
import { ProfileData } from 'src/shared/models/profile-data/profile-data';
import { DonationBooking } from 'src/shared/models/donation/booking/donation-booking';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DonorAccount } from 'src/shared/models/accounts/donor-account/donor-account';

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.scss']
})
export class AllBookingsComponent implements OnInit {

    constructor(private authService: AuthService, private dcService: DonationCenterService,
                private modalService: NgbModal) { }

    currentDCP: ProfileData;
    bookings: DonationBooking[];

    selectedDonor: DonorAccount;

    ngOnInit() {
        this.currentDCP = this.authService.getUser();

        this.dcService.getBookingsAtDonationCenter(this.currentDCP.locationId).subscribe(
            (res: DonationBooking[]) => {
                this.bookings = res;
        });
    }

    open(content, donor) {
        this.selectedDonor = donor;
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {

        }, (reason) => {

        });
    }

    cancelBooking(booking: DonationBooking) {
        this.dcService.cancelBooking(booking).subscribe(
            (res: BooleanServerResponse) => {
                if (res.success === true) {
                    this.bookings = this.bookings.filter(obj => obj.id !== booking.id);
                }
        });
    }
}
