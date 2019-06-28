import { DonationCenterPersonnelService } from './../../../../../core/donation-center-personnel.service';
import { BooleanServerResponse } from 'src/shared/models/shared/boolean-server-response';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileData } from 'src/shared/models/profile-data/profile-data';
import { DcpDonation } from 'src/shared/models/dcp/incoming/dcp-donation';

@Component({
  selector: 'app-split-results',
  templateUrl: './split-results.component.html',
  styleUrls: ['./split-results.component.scss']
})
export class SplitResultsComponent implements OnInit {

    constructor(private authService: AuthService, private dcpService: DonationCenterPersonnelService,
        private modalService: NgbModal, private formBuilder: FormBuilder) { }

    currentDCP: ProfileData;
    donations: DcpDonation[];

    selectedDonation: DcpDonation;
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

    this.dcpService.getDonationsAwaitingSplitResult(this.currentDCP.locationId).subscribe(
        (res: DcpDonation[]) => {
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
        this.dcpService.addSplitResults(splitData).subscribe(
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
