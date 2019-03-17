import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth_service/auth.service';

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
      .subscribe((res: any) => {
        if (res.status === false) {
            this.errorMessage = true;
            return;
        } else {
            this.errorMessage = false;

            alert(res);
        }
      });
  }
}
