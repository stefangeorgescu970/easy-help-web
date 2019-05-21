import { BooleanServerResponse } from 'src/shared/models/boolean-server-response/boolean-server-response';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Donation } from './../../../../../shared/models/donation/donation/donation';
import { AuthService } from './../../../../../core/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DonationService } from 'src/core/donation-service/donation.service';
import { ProfileData } from 'src/shared/models/profile-data/profile-data';

@Component({
  selector: 'app-split-results',
  templateUrl: './split-results.component.html',
  styleUrls: ['./split-results.component.scss']
})
export class SplitResultsComponent implements OnInit {

    constructor(private authService: AuthService, private donationService: DonationService,
        private modalService: NgbModal, private formBuilder: FormBuilder) { }

    currentDCP: ProfileData;
    donations: Donation[];

    selectedDonation: Donation;
    splitResultsForm: FormGroup;

    submitted = false;
    invalid = false;

    ngOnInit() {
    this.currentDCP = this.authService.getUser();

    this.splitResultsForm = this.formBuilder.group({
        redBloodCellsUnits: [null, Validators.required],
        plateletsUnits: [null, Validators.required],
        plasmaUnits: [null, Validators.required]
    });

    this.donationService.getDonationsAwaitingSplitResult(this.currentDCP.locationId).subscribe(
        (res: Donation[]) => {
            this.donations = res;
    });
    }

    get form() { return this.splitResultsForm.controls; }

    submitSplitResults() {
        this.submitted = true;
        if (this.splitResultsForm.invalid) {
            this.invalid = true;
            return;
        }
        this.invalid = false;
        const splitData = this.splitResultsForm.value;
        splitData.donationId = this.selectedDonation.id;
        this.donationService.addSplitResults(splitData).subscribe(
            (res: BooleanServerResponse) => {
                if (res.success === true) {
                    this.donations = this.donations.filter(obj => obj.id != this.selectedDonation.id);
                    this.modalService.dismissAll();
                } else {
                    alert(res.exception);
                }
        });
    }

    open(content, donation) {
        this.selectedDonation = donation;
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {

        }, (reason) => {

        });
    }

}
