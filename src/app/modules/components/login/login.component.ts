import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth_service/auth.service';
import { ProfileData } from 'src/shared/models/profile-data/profile-data';
import { LoginResult } from 'src/shared/models/login-result/login-result';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  errorMessage: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    const formBuilder = new FormBuilder();
    this.loginForm = formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  login() {
    const username = this.loginForm.value['username'];
    const password = this.loginForm.value['password'];


    this.authService.login(username, password)
      .subscribe((res: LoginResult) => {
        if (res.success === false) {
            this.errorMessage = true;
            return;
        } else {

            const profileData = res.profileData;

            if (profileData !== undefined) {
                switch (profileData.role) {
                    case 'SYSADMIN':
                    this.router.navigate(['admin']);
                    break;
                }
            }
        }
      });
  }
}
