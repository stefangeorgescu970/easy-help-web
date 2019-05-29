import { IdResponse } from './../../../../../shared/models/shared/id-response';
import { BloodType } from './../../../../../shared/models/shared/blood-type';
import { CreatePatient } from './../../../../../shared/models/doctor/outgoing/create-patient';
import { BooleanServerResponse } from '../../../../../shared/models/shared/boolean-server-response';
import { AuthService } from '../../../../../core/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/core/doctor.service';
import { PatientLevel2 } from 'src/shared/models/doctor/incoming/patient-level-2';

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
    patients: PatientLevel2[];

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
        this.doctorService.getPatients(this.authService.getUser().id).subscribe((res: PatientLevel2[]) => {
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

        const patient = new CreatePatient();
        patient.doctorId = this.authService.getUser().id;
        patient.ssn = this.f.ssn.value;

        const bloodType = new BloodType();
        bloodType.groupLetter = this.f.group.value;
        bloodType.rh = this.f.rh.value;
        patient.bloodType = bloodType;

        this.loading = true;

        this.doctorService.addPatient(patient).subscribe((res: IdResponse) => {
            this.loading = false;
            if (res.success) {
                const newPatient = new PatientLevel2();
                newPatient.id = res.newId;
                newPatient.ssn = patient.ssn;
                newPatient.bloodType = patient.bloodType;
                this.patients.push(newPatient);
           } else {
             alert(res.exception);
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
