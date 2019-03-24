import { Component, OnInit } from '@angular/core';
import { EnumsService } from 'src/core/enums-service/enums-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/auth-service/auth.service';
import { RealLocation } from 'src/shared/models/locations/real-location';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    counties: string[];
    registerForm: FormGroup;
    locations: RealLocation[];

    shouldShowRegister: boolean;
    shouldShowLocations: boolean;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
                private router: Router, private authenticationService: AuthService, 
                private enumService: EnumsService) { }

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
            dob: ['', Validators.required],
            userType: ['', Validators.required],
            location: ['', Validators.required]
        });


    }

    enumToOption(enu: string): string {
        if (enu !== undefined) {
            return enu.split('_')
            .map((s: string) => s.slice(0, 1) + s.slice(1).toLowerCase())
            .join(' ');
        }
        return enu;
    }

    registerAccount() {

    }

    onUserTypeChanged(value: number) {
        if (value) {
            this.shouldShowRegister = true;
        } else {
            this.shouldShowRegister = false;
        }
    }

}
