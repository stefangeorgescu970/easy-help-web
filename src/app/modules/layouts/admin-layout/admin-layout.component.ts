import { BooleanServerResponse } from 'src/shared/models/boolean-server-response/boolean-server-response';
import { AuthService } from './../../../../core/auth-service/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().subscribe((res: BooleanServerResponse) => {
      if (res.success === true) {
          this.router.navigate(['']);
      }
    });
    }
}
