import { BooleanServerResponse } from './../../../../../shared/models/boolean-server-response/boolean-server-response';
import { AuthService } from './../../../../../core/auth-service/auth.service';
import { PatientData } from './../../../../../shared/models/patient/patient-data';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/core/doctor-service/doctor.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {

    error = '';
    patientForm: FormGroup;
    submitted = false;
    loading = false;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private doctorService: DoctorService) { }

    ngOnInit() {

        this.patientForm = this.formBuilder.group({
            ssn: ['', Validators.required],
            group: ['', Validators.required],
            rh: ['', Validators.required]
        });
    }

    get f() { return this.patientForm.controls; }

    addPatient() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.patientForm.invalid) {
            return;
        }

        const patient = new PatientData();
        patient.doctorId = this.authService.getUser().id;
        patient.ssn = this.f.ssn.value;
        patient.group = this.f.group.value;
        patient.rh = this.f.rh.value;

        this.loading = true;

        this.doctorService.addPatient(patient).subscribe((res: BooleanServerResponse) => {
            this.loading = false;
            if (res.success === true) {
                this.error = null;
            } else {
                this.error = res.exception;
            }
        });
    }
}
