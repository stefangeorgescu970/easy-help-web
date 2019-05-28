import { BooleanServerResponse } from 'src/shared/models/boolean-server-response/boolean-server-response';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth.service';
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
    this.authService.logout().subscribe((res: BooleanServerResponse) => {
      if (res.success === true) {
          this.router.navigate(['']);
      }
    });
    }
}
