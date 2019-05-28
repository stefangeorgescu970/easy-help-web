import { DonationCenterPersonnelService } from './../../../../../core/donation-center-personnel.service';
import { BooleanServerResponse } from 'src/shared/models/boolean-server-response/boolean-server-response';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Donation } from './../../../../../shared/models/donation/donation/donation';
import { AuthService } from '../../../../../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileData } from 'src/shared/models/profile-data/profile-data';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss']
})
export class TestResultsComponent implements OnInit {

    constructor(private authService: AuthService, private dcpService: DonationCenterPersonnelService,
                private modalService: NgbModal, private formBuilder: FormBuilder) { }


    currentDCP: ProfileData;
    donations: Donation[];

    selectedDonation: Donation;
    testResultsForm: FormGroup;

    submitted = false;
    invalid = false;

    ngOnInit() {
        this.currentDCP = this.authService.getUser();

        this.testResultsForm = this.formBuilder.group({
            hepatitisB: [null, Validators.required],
            hepatitisC: [null, Validators.required],
            hiv: [null, Validators.required],
            htlv: [null, Validators.required],
            vdrl: [null, Validators.required],
            alt: [null, Validators.required]
        });

        this.dcpService.getDonationsAwaitingTestResult(this.currentDCP.locationId).subscribe(
            (res: Donation[]) => {
                this.donations = res;
        });
    }

    get form() { return this.testResultsForm.controls; }

    submitTestResults() {
        this.submitted = true;
        if (this.testResultsForm.invalid) {
            this.invalid = true;
            return;
        }
        this.invalid = false;
        const testData = this.testResultsForm.value;
        testData.donationId = this.selectedDonation.id;
        this.dcpService.addTestResults(testData).subscribe(
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
