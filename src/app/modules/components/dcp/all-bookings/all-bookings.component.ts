import { DonationCenterPersonnelService } from './../../../../../core/donation-center-personnel.service';
import { DonationForm } from '../../../../../shared/models/shared/donation-form';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BooleanServerResponse } from '../../../../../shared/models/shared/boolean-server-response';
import { AuthService } from '../../../../../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { ProfileData } from 'src/shared/models/profile-data/profile-data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DcpDonationBooking } from 'src/shared/models/dcp/incoming/dcp-donation-booking';
import { DcpDonorAccount } from 'src/shared/models/dcp/incoming/dcp-donor-account';

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.scss']
})
export class AllBookingsComponent implements OnInit {

    constructor(private authService: AuthService, private dcService: DonationCenterPersonnelService,
                private modalService: NgbModal, private formBuilder: FormBuilder) { }

    currentDCP: ProfileData;
    bookings: DcpDonationBooking[];

    selectedDonor: DcpDonorAccount;
    bloodDetailsForm: FormGroup;
    selectedBooking: DcpDonationBooking;
    selectedForm: DonationForm;
    submitted = false;

    ngOnInit() {
        this.currentDCP = this.authService.getUser();

        this.bloodDetailsForm = this.formBuilder.group({
            group: ['', Validators.required],
            rh: ['', Validators.required]
        });

        this.dcService.getBookingsAtDonationCenter(this.currentDCP.locationId).subscribe(
            (res: DcpDonationBooking[]) => {
                this.bookings = res;
        });
    }

    get form() { return this.bloodDetailsForm.controls; }

    open(content, booking) {
        this.selectedDonor = booking.donor;
        this.selectedBooking = booking;
        if (booking.donor.bloodType != null){
            this.bloodDetailsForm.controls['group'].setValue(booking.donor.bloodType.groupLetter);
            this.bloodDetailsForm.controls['rh'].setValue(booking.donor.bloodType.rh);
        } else {
            this.bloodDetailsForm.reset();
        }
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {

        }, (reason) => {

        });
    }

    openForm(content, donationForm) {
        this.selectedForm = donationForm;
        this.modalService.open(content, {ariaLabelledBy: 'modal-form-title', centered: true,  size: 'lg' }).result.then((result) => {

        }, (reason) => {

        });
    }

    cancelBooking(booking: DcpDonationBooking) {
        this.dcService.cancelBooking(booking).subscribe(
            (res: BooleanServerResponse) => {
                if (res.success === true) {
                    this.bookings = this.bookings.filter(obj => obj.id !== booking.id);
                }
        });
    }

    markBookingAsDonated(booking: DcpDonationBooking) {
        this.submitted = true;
        if (this.bloodDetailsForm.invalid) {
            return;
        }

        this.dcService.createDonationFromBooking(booking, this.form.group.value, this.form.rh.value).subscribe(
            (res: BooleanServerResponse) => {
                if (res.success === true) {
                    this.submitted = false;
                    this.bookings = this.bookings.filter(obj => obj.id !== booking.id);
                    this.modalService.dismissAll();
                }
        });
    }

}
