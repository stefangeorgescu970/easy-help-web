import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/auth-service/auth.service';
import { ProfileData } from 'src/shared/models/profile-data/profile-data';
import { LoginResult } from 'src/shared/models/login-result/login-result';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
                private router: Router, private authenticationService: AuthService) {
        // redirect to home if already logged in
        const user = this.authenticationService.getUser();

        if (user) {
            this.redirect(user);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    login() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
        .subscribe((res: LoginResult) => {
            this.loading = false;
            if (res.success === false) {
                this.error = res.error;
                return;
            } else {
                this.error = undefined;
                const profileData = res.profileData;

                if (profileData !== undefined) {
                    this.redirect(profileData);
                }
            }
        });
    }

    redirect(profileData: ProfileData) {
        switch (profileData.role) {
            case 'SYSADMIN':
            this.router.navigate(['admin']);
            break;
        }
    }
}
