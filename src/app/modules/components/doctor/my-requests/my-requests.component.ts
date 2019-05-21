import { BooleanServerResponse } from 'src/shared/models/boolean-server-response/boolean-server-response';
import { DonationRequestDetails } from './../../../../../shared/models/donation/request-details/donation-request-details';
import { DoctorService } from './../../../../../core/doctor-service/doctor.service';
import { AuthService } from './../../../../../core/auth-service/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProfileData } from 'src/shared/models/profile-data/profile-data';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss']
})
export class MyRequestsComponent implements OnInit {
    
    recentRequests: Array<DonationRequestDetails> = [];
    partiallyCommittedRequests: Array<DonationRequestDetails> = [];
    fullyCommittedRequests: Array<DonationRequestDetails> = [];

    currentDoctor: ProfileData;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private doctorService: DoctorService) { }

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
        this.doctorService.cancelRequest(request.id).subscribe((res: BooleanServerResponse) => {
            if (res.success === true) {
                this.recentRequests = this.recentRequests.filter(obj => obj.id !== request.id);
            } else {
                alert(res.exception);
            }
        });
    }
}
