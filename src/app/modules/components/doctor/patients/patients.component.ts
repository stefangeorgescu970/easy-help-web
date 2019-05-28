import { BooleanServerResponse } from '../../../../../shared/models/boolean-server-response/boolean-server-response';
import { AuthService } from '../../../../../core/auth.service';
import { PatientData } from '../../../../../shared/models/patient/patient-data';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/core/doctor.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

    error = '';
    patientForm: FormGroup;
    submitted = false;
    loading = false;
    patients: PatientData[];

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private doctorService: DoctorService) { }

    ngOnInit() {
        this.patientForm = this.formBuilder.group({
            ssn: ['', Validators.required],
            group: ['', Validators.required],
            rh: ['', Validators.required]
        });

        this.loadPatients();
    }

    loadPatients() {
        this.doctorService.getPatients(this.authService.getUser().id).subscribe((res: PatientData[]) => {
            this.patients = res;
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
                this.loadPatients();
            } else {
                this.error = res.exception;
            }
        });
    }

    removePatient(patientId: number) {
        this.doctorService.deletePatient(patientId).subscribe((res: BooleanServerResponse) => {
            if (res.success === true) {
                this.loadPatients();
            } else {
                alert(res.exception);
            }
        });
    }
}
