import { BooleanServerResponse } from 'src/shared/models/boolean-server-response/boolean-server-response';
import { DonationCenterService } from './../../../../../core/donation-center-service/donation-center.service';
import { AuthService } from './../../../../../core/auth-service/auth.service';
import { DonationCommitment } from './../../../../../shared/models/donation/donation-commitment/donation-commitment';
import { Component, OnInit } from '@angular/core';
import { ProfileData } from 'src/shared/models/profile-data/profile-data';

@Component({
  selector: 'app-my-commitments',
  templateUrl: './my-commitments.component.html',
  styleUrls: ['./my-commitments.component.scss']
})
export class MyCommitmentsComponent implements OnInit {

    currentDC: ProfileData;
    proposedDonationCommitments: Array<DonationCommitment> = [];
    waitingSendDonationCommitments: Array<DonationCommitment> = [];

    constructor(private authService: AuthService, private dcService: DonationCenterService) { }

    ngOnInit() {
        this.currentDC = this.authService.getUser();

        this.dcService.getCommitments(this.currentDC.locationId).subscribe(
            (res: DonationCommitment[]) => {
                res.forEach(commitment => {
                    switch (commitment.status) {
                        case 'COMMITTED_BY_DONATION_CENTER':
                            this.proposedDonationCommitments.push(commitment);
                            break;
                        case 'ACCEPTED_BY_DOCTOR':
                            this.waitingSendDonationCommitments.push(commitment);
                            break;
                        default:
                            break;
                    }
                });
        });
    }

    markCommitmentAsDeparted(commitment) {
        this.dcService.shipCommitment(commitment.id).subscribe((res: BooleanServerResponse) => {
            if (res.success === true) {
                this.waitingSendDonationCommitments = this.waitingSendDonationCommitments.filter(cmt => cmt.id !== commitment.id);
            } else {
                alert(res.exception);
            }
        });
    }

}
