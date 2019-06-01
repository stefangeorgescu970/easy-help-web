import { BooleanServerResponse } from 'src/shared/models/shared/boolean-server-response';
import { BaseLocation } from './../../../../shared/models/shared/base-location';
import { LocationService } from './../../../../core/location.service';
import { Component, OnInit } from '@angular/core';
import { EnumsService } from 'src/core/enums-service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/auth.service';

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
    locations: BaseLocation[];

    shouldShowLocations: boolean;
    noLocationsAvailable: boolean;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
                private router: Router, private authenticationService: AuthService,
                private enumService: EnumsService, private locationService: LocationService) { }

    ngOnInit() {

        this.enumService.getEnums().subscribe(res => {
            this.counties = res.object.counties;
          });

        const formBuilder = new FormBuilder();

        this.registerForm = formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            county: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            repeatPassword: ['', Validators.required],
            ssn: ['', Validators.required],
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
        if (this.registerForm.invalid || this.noLocationsAvailable) {
            return;
        }

        this.loading = true;
        const registerData = this.registerForm.value;

        this.authenticationService.register(registerData).subscribe(
            (res: BooleanServerResponse) => {
            if (res.success === true) {
                this.router.navigate(['login/success']);
            } else {
                alert(res.exception);
            }
        });

    }

    reloadLocationList() {
        if (this.f.userType.value) {
            switch (this.f.userType.value) {
            case '0':
                this.shouldShowLocations = false;
                this.noLocationsAvailable = false;
                break;
            case '1':
                if (this.selectedCounty) {
                    this.locationService.getDonationCentersInCounty(this.selectedCounty).subscribe(res => {
                        if (res.length === 0) {
                            this.shouldShowLocations = false;
                            this.noLocationsAvailable = true;
                        } else {
                            this.locations = res;
                            this.shouldShowLocations = true;
                            this.noLocationsAvailable = false;
                        }
                    });
                }
                break;
            case '2':
                if (this.selectedCounty) {
                    this.locationService.getHospitalsInCounty(this.selectedCounty).subscribe(res => {
                        if (res.length === 0) {
                            this.shouldShowLocations = false;
                            this.noLocationsAvailable = true;
                        } else {
                            this.locations = res;
                            this.shouldShowLocations = true;
                            this.noLocationsAvailable = false;
                        }
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

        if (value === '0') {
            (this.registerForm.get('locationId') as FormControl).setValidators(null);
        } else {
            (this.registerForm.get('locationId') as FormControl).setValidators([Validators.required]);
        }
    }

    onCountyChanged(value: string) {
        this.selectedCounty = value;
        this.reloadLocationList();
    }
}
