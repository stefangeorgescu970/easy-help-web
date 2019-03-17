import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth_service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'easy-help-web';
  canLogout = true;

  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    if (this.router.url.includes('student') || this.router.url.includes('professor')) {
      this.canLogout = true;
    } else {
      this.canLogout = false;
    }

    this.router.events.subscribe(res => {
      if (this.router.url.includes('student') || this.router.url.includes('professor')) {
        this.canLogout = true;
      } else {
        this.canLogout = false;
      }
    });
  }

  logout() {
    this.authService.logout()
      .subscribe(
        (res: any) => {
          this.router.navigate(['login']);
        });
  }

}
