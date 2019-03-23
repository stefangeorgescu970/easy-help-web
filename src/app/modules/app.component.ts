import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../core/auth_service/auth.service';
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
    this.authService.logout()
      .subscribe(
        (res: any) => {
          this.router.navigate(['login']);
        });
  }

}
