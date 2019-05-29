import { BooleanServerResponse } from './../../../../../shared/models/boolean-server-response/boolean-server-response';
import { AuthService } from '../../../../../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { ProfileData } from 'src/shared/models/profile-data/profile-data';
import { StoredBlood } from 'src/shared/models/donation/stored-blood/stored-blood';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DonationCenterPersonnelService } from 'src/core/donation-center-personnel.service';
import { DcpDonationRequestDetails } from 'src/shared/models/dcp/incoming/dcp-donation-request-details';

@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.component.html',
  styleUrls: ['./all-requests.component.scss']
})
export class AllRequestsComponent implements OnInit {

    requests: Array<DcpDonationRequestDetails> = [];
    storedBlood: Array<StoredBlood> = [];
    filteredStoredBlood: Array<StoredBlood> = [];
    selectedRequest: DcpDonationRequestDetails;

    currentDcp: ProfileData;

    constructor(private modalService: NgbModal, private authService: AuthService, private donationCenterService: DonationCenterPersonnelService) { }

    ngOnInit() {

        this.currentDcp = this.authService.getUser();

        this.loadRequests();
        this.loadStoredBlood();
    }

    loadRequests() {
        this.donationCenterService.getBloodRequests(this.currentDcp.locationId).subscribe((res: DcpDonationRequestDetails[]) => {
            this.requests = res;
        });
    }

    loadStoredBlood() {
        this.donationCenterService.getBloodInDonationCenter(this.currentDcp.locationId).subscribe((res: StoredBlood[]) => {
            this.storedBlood = res;
        });
    }

    open(content, request) {
        this.filteredStoredBlood = this.storedBlood.filter(blood => blood.component === request.component &&
                                                                    blood.matches(request.patient.rh, request.patient.group));
        this.selectedRequest = request;

        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg'}).result.then((result) => {

        }, (reason) => {
            this.filteredStoredBlood = [];
            this.selectedRequest = undefined;
        });
    }

    commitBlood(blood) {
        this.donationCenterService.commitBlood(this.currentDcp.locationId, blood.id, this.selectedRequest.id).subscribe(
            (res: BooleanServerResponse) => {
                if (res.success === true) {
                    this.storedBlood = this.storedBlood.filter(bloodInternal => bloodInternal.id !== blood.id);
                    this.modalService.dismissAll();
                } else {
                    alert(res.exception);
                }
        });
    }
}
