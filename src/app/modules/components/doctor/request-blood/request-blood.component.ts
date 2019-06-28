import { DonationRequestCreate } from './../../../../../shared/models/doctor/outgoing/donation-request-create';
import { BooleanServerResponse } from '../../../../../shared/models/shared/boolean-server-response';
import { ProfileData } from 'src/shared/models/profile-data/profile-data';
import { DoctorService } from 'src/core/doctor.service';
import { AuthService } from '../../../../../core/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PatientLevel2 } from 'src/shared/models/doctor/incoming/patient-level-2';

@Component({
  selector: 'app-request-blood',
  templateUrl: './request-blood.component.html',
  styleUrls: ['./request-blood.component.scss']
})
export class RequestBloodComponent implements OnInit {

    requestForm: FormGroup;
    patients: PatientLevel2[];
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
    }

    loadPatients() {
        this.doctorService.getPatients(this.currentDoctor.id).subscribe((res: PatientLevel2[]) => {
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
        const request = new DonationRequestCreate();
        request.doctorId = this.currentDoctor.id;
        request.patientId = this.f.patientId.value;
        request.bloodComponent = this.f.component.value;
        request.urgency = this.f.urgency.value;
        request.quantity = this.f.quantity.value;

        this.doctorService.requestBlood(request).subscribe((res: BooleanServerResponse) => {
            this.loading = false;
            if (res.success === true) {
                this.error = null;
                alert('Blood Request successfully forwarded to Donation Centers.');
                this.requestForm.reset();
                this.submitted = false;
            } else {
                this.error = res.exception;
            }
        });
    }
}
