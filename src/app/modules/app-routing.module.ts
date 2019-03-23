import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DoctorAccountRequestsComponent } from './components/admin/doctor-account-requests/doctor-account-requests.component';
import { AuthGuard } from '../guards/auth.guard';
import { UserRole } from 'src/shared/enums/user-role/user-role.enum';
import { IntroComponent } from './components/intro/intro.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

const routes: Routes = [
    { path: '', component: HomeLayoutComponent, children: [
        { path: '', component: IntroComponent }
    ] },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminLayoutComponent, canActivate: [AuthGuard], data: {roles: [UserRole.Admin]}, children: [
        { path: '', component: DoctorAccountRequestsComponent }
    ] },
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
