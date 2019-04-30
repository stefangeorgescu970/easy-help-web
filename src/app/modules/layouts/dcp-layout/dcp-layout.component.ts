import { Router } from '@angular/router';
import { AuthService } from './../../../../core/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dcp-layout',
  templateUrl: './dcp-layout.component.html',
  styleUrls: ['./dcp-layout.component.scss']
})
export class DcpLayoutComponent implements OnInit {

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
