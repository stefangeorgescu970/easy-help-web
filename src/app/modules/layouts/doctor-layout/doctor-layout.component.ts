import { Router } from '@angular/router';
import { AuthService } from './../../../../core/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-layout',
  templateUrl: './doctor-layout.component.html',
  styleUrls: ['./doctor-layout.component.scss']
})
export class DoctorLayoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }


  logout() {
      this.authService.logout().subscribe((res: boolean) => {
        if (res === true) {
            this.router.navigate(['']);
        }
      });
  }
}
