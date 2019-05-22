import { BooleanServerResponse } from 'src/shared/models/boolean-server-response/boolean-server-response';
import { DonationRequestDetails } from './../../../../../shared/models/donation/request-details/donation-request-details';
import { DoctorService } from './../../../../../core/doctor-service/doctor.service';
import { AuthService } from './../../../../../core/auth-service/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProfileData } from 'src/shared/models/profile-data/profile-data';
import { DonationCommitment } from 'src/shared/models/donation/donation-commitment/donation-commitment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss']
})
export class MyRequestsComponent implements OnInit {
    
    recentRequests: Array<DonationRequestDetails> = [];
    partiallyCommittedRequests: Array<DonationRequestDetails> = [];
    fullyCommittedRequests: Array<DonationRequestDetails> = [];

    proposedDonationCommitments: Array<DonationCommitment> = [];
    waitingSendDonationCommitments: Array<DonationCommitment> = [];
    sentDonationCommitments: Array<DonationCommitment> = [];

    selectedRequest: DonationRequestDetails;

    currentDoctor: ProfileData;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private doctorService: DoctorService, private modalService: NgbModal) { }

    ngOnInit() {

        this.currentDoctor = this.authService.getUser();

        this.loadRequests();
    }

    loadRequests() {
        this.doctorService.getBloodRequests(this.currentDoctor.id).subscribe((res: DonationRequestDetails[]) => {
            res.forEach(element => {
                switch (element.status) {
                    case 'PROCESSING':
                        this.recentRequests.push(element);
                        break;
                    case 'PARTIALLY_COMMITTED_TO':
                        this.partiallyCommittedRequests.push(element);
                        break;
                    case 'FULLY_COMMITTED_TO':
                        this.fullyCommittedRequests.push(element);
                        break;
                    default:
                        break;

                }
            });
        });
    }

    cancelRequest(request: DonationRequestDetails) {
        this.selectedRequest = request;
        this.doctorService.cancelRequest(request.id).subscribe((res: BooleanServerResponse) => {
            if (res.success === true) {
                this.recentRequests = this.recentRequests.filter(obj => obj.id !== request.id);
                this.selectedRequest = undefined;
            } else {
                alert(res.exception);
            }
        });
    }

    approveCommitment(commitment: DonationCommitment) {
        this.doctorService.approveCommitment(commitment.id).subscribe((res: String) => {
            if (res !== undefined) {
                this.proposedDonationCommitments = this.proposedDonationCommitments.filter(cmt => cmt.id !== commitment.id);
                this.waitingSendDonationCommitments.push(commitment);

                switch (res) {
                    // TODO - implement moving request to its proper list.
                    case 'FULLY_COMMITTED_TO':
                        break;
                    case 'PARTIALLY_COMMITTED_TO':
                        break;
                    default:
                        break;
                }
            } else {
                alert('an error occured');
            }
        });
    }

    declineCommitment(commitment: DonationCommitment) {
        this.doctorService.declineCommitment(commitment.id).subscribe((res: BooleanServerResponse) => {
            if (res.success === true) {
                this.proposedDonationCommitments = this.proposedDonationCommitments.filter(cmt => cmt.id !== commitment.id);
            } else {
                alert(res.exception);
            }
        });
    }

    markCommitmentAsArrived(commitment: DonationCommitment) {
        this.doctorService.markCommitmentAsArrived(commitment.id).subscribe((res: BooleanServerResponse) => {
            if (res.success === true) {
                this.waitingSendDonationCommitments = this.waitingSendDonationCommitments.filter(cmt => cmt.id !== commitment.id);
            } else {
                alert(res.exception);
            }
        });
    }

    open(content, request) {
        this.selectedRequest = request;
        this.doctorService.getCommitments(request.id).subscribe(
            (res: DonationCommitment[]) => {
                res.forEach(commitment => {
                    switch (commitment.status) {
                        case 'COMMITTED_BY_DONATION_CENTER':
                            this.proposedDonationCommitments.push(commitment);
                            break;
                        case 'ACCEPTED_BY_DOCTOR':
                            this.waitingSendDonationCommitments.push(commitment);
                            break;
                        case 'SHIPPED_BY_DONATION_CENTER':
                            this.sentDonationCommitments.push(commitment);
                            break;
                        default:
                            break;
                    }
                });
        });

        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg'}).result.then((result) => {
            this.clearTempData();
        }, (reason) => {
            this.clearTempData();
        });
    }

    clearTempData() {
        this.selectedRequest = undefined;
        this.proposedDonationCommitments = [];
        this.waitingSendDonationCommitments = [];
        this.sentDonationCommitments = [];
    }
}
