import { DonationRequestDetails } from './../../../../../shared/models/donation/request-details/donation-request-details';
import { BooleanServerResponse } from './../../../../../shared/models/boolean-server-response/boolean-server-response';
import { ProfileData } from 'src/shared/models/profile-data/profile-data';
import { DoctorService } from 'src/core/doctor-service/doctor.service';
import { AuthService } from './../../../../../core/auth-service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PatientData } from 'src/shared/models/patient/patient-data';
import { DonationRequest } from 'src/shared/models/donation/request/donation-request';

@Component({
  selector: 'app-request-blood',
  templateUrl: './request-blood.component.html',
  styleUrls: ['./request-blood.component.scss']
})
export class RequestBloodComponent implements OnInit {

    requestForm: FormGroup;
    patients: PatientData[];
    requests: DonationRequestDetails[];
    submitted = false;
    loading = false;
    error = '';
    currentDoctor: ProfileData;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private doctorService: DoctorService) { }

    ngOnInit() {
        this.requestForm = this.formBuilder.group({
            patientId: ['', Validators.required],
            component: ['', Validators.required],
            urgency: ['', Validators.required],
            quantity: ['', Validators.required]
        });

        this.currentDoctor = this.authService.getUser();

        this.loadPatients();
        this.loadRequests();
    }

    loadRequests() {
        this.doctorService.getBloodRequests(this.currentDoctor.id).subscribe((res: DonationRequestDetails[]) => {
            this.requests = res;
        });
    }

    loadPatients() {
        this.doctorService.getPatients(this.currentDoctor.id).subscribe((res: PatientData[]) => {
            this.patients = res;
        });
    }

    get f() { return this.requestForm.controls; }

    requestBlood() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.requestForm.invalid) {
            return;
        }

        this.loading = true;
        const request = new DonationRequest();
        request.doctorId = this.currentDoctor.id;
        request.patientId = this.f.patientId.value;
        request.bloodComponent = this.f.component.value;
        request.urgency = this.f.urgency.value;
        request.quantity = this.f.quantity.value;

        this.doctorService.requestBlood(request).subscribe((res: BooleanServerResponse) => {
            this.loading = false;
            if (res.success === true) {
                this.error = null;
            } else {
                this.error = res.exception;
            }
        });
    }

    cancelRequest(requestId: number) {

    }
}
