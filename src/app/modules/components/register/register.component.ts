import { DonationCenterService } from 'src/core/donation-center-service/donation-center.service';
import { HospitalService } from './../../../../core/hospital-service/hospital.service';
import { Component, OnInit } from '@angular/core';
import { EnumsService } from 'src/core/enums-service/enums-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/auth-service/auth.service';
import { RealLocation } from 'src/shared/models/locations/real-location';
import { RegisterDto } from 'src/shared/models/accounts/register-dto/register-dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    submitted: boolean;
    loading = false;

    counties: string[];
    registerForm: FormGroup;

    selectedCounty: string;
    locations: RealLocation[];

    shouldShowLocations: boolean;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
                private router: Router, private authenticationService: AuthService,
                private enumService: EnumsService, private hospService: HospitalService,
                private dcService: DonationCenterService) { }

    ngOnInit() {

        this.enumService.getEnums().subscribe(res => {
            this.counties = res.object.counties;
          });

        const formBuilder = new FormBuilder();

        this.registerForm = formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            county: ['', Validators.required],
            city: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            repeatPassword: ['', Validators.required],
            ssn: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            userType: ['', Validators.required],
            locationId: ['']
        });
    }

    get f() { return this.registerForm.controls; }

    enumToOption(enu: string): string {
        if (enu !== undefined) {
            return enu.split('_')
            .map((s: string) => s.slice(0, 1) + s.slice(1).toLowerCase())
            .join(' ');
        }
        return enu;
    }

    registerAccount() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        const registerData = this.registerForm.value;
        registerData.dateOfBirth = String(registerData.dateOfBirth.year) + '-' +
                                   String(registerData.dateOfBirth.month) + '-' +
                                   String(registerData.dateOfBirth.day);

        this.authenticationService.register(registerData).subscribe(res => {
            alert(res);
        });
        
    }

    reloadLocationList() {
        if (this.f.userType.value) {
            switch (this.f.userType.value) {
            case '0':
                this.shouldShowLocations = false;
                break;
            case '1':
                if (this.selectedCounty) {
                    this.dcService.getDonationCentersInCounty(this.selectedCounty).subscribe(res => {
                        this.locations = res;
                        this.shouldShowLocations = true;
                    });
                }
                break;
            case '2':
                if (this.selectedCounty) {
                    this.hospService.getHospitalsInCounty(this.selectedCounty).subscribe(res => {
                        this.locations = res;
                        this.shouldShowLocations = true;
                    });
                }
                break;
            default:
                break;
            }
        }
    }

    onUserTypeChanged(value: string) {
        this.reloadLocationList();
    }

    onCountyChanged(value: string) {
        this.selectedCounty = value;
        this.reloadLocationList();
    }
}
