import { AllDonorsComponent } from './components/dcp/all-donors/all-donors.component';
import { DcpLayoutComponent } from './layouts/dcp-layout/dcp-layout.component';
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
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
    { path: '', component: HomeLayoutComponent, children: [
        { path: '', component: IntroComponent }
    ] },
    { path: 'login', component: LoginLayoutComponent, children: [
        { path: '', component: LoginComponent },
        { path: 'register', component: RegisterComponent}
    ] },
    { path: 'admin', component: AdminLayoutComponent, canActivate: [AuthGuard], data: {roles: [UserRole.Admin]}, children: [
        { path: '', component: DoctorAccountRequestsComponent },
        { path: 'doctor-reqs', component: DoctorAccountRequestsComponent },
        { path: 'dcp-reqs', component: DcpAccountRequestsComponent },
        { path: 'doctors', component: DoctorAccountsComponent },
        { path: 'dcps', component: DcpAccountsComponent },
        { path: 'hospitals', component: HospitalsComponent },
        { path: 'donation-centers', component: DonationCentersComponent }
    ] },

    { path: 'dcp', component: DcpLayoutComponent, canActivate: [AuthGuard], data: {roles: [UserRole.Dcp]}, children: [
        { path: '', component: AllDonorsComponent },
        { path: 'all-donors', component: AllDonorsComponent }
    ] },

    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
