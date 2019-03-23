import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DoctorAccountRequestsComponent } from './components/admin/doctor-account-requests/doctor-account-requests.component';
import { DoctorAccountsComponent } from './components/admin/doctor-accounts/doctor-accounts.component';
import { AuthGuard } from '../guards/auth.guard';
import { UserRole } from 'src/shared/enums/user-role/user-role.enum';
import { IntroComponent } from './components/intro/intro.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DcpAccountRequestsComponent } from './components/admin/dcp-account-requests/dcp-account-requests.component';
import { DcpAccountsComponent } from './components/admin/dcp-accounts/dcp-accounts.component';
import { HospitalsComponent } from './components/admin/hospitals/hospitals.component';
import { DonationCentersComponent } from './components/admin/donation-centers/donation-centers.component';

const routes: Routes = [
    { path: '', component: HomeLayoutComponent, children: [
        { path: '', component: IntroComponent }
    ] },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminLayoutComponent, canActivate: [AuthGuard], data: {roles: [UserRole.Admin]}, children: [
        { path: '', component: DoctorAccountRequestsComponent },
        { path: 'doctor-reqs', component: DoctorAccountRequestsComponent },
        { path: 'dcp-reqs', component: DcpAccountRequestsComponent },
        { path: 'doctors', component: DoctorAccountsComponent },
        { path: 'dcps', component: DcpAccountsComponent },
        { path: 'hospitals', component: HospitalsComponent },
        { path: 'donation-centers', component: DonationCentersComponent }
    ] },
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }