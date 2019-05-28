import { BooleanServerResponse } from 'src/shared/models/boolean-server-response/boolean-server-response';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: []
})
export class AppComponent {
  title = 'easy-help-web';
  canLogout = true;

  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout().subscribe((res: BooleanServerResponse) => {
      if (res.success === true) {
          this.router.navigate(['']);
      }
    });
    }

}
