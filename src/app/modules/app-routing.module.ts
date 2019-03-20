import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DoctorAccountRequestsComponent } from './components/admin/doctor-account-requests/doctor-account-requests.component';
import { AuthGuard } from '../guards/auth.guard';
import { UserRole } from 'src/shared/enums/user-role/user-role.enum';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: DoctorAccountRequestsComponent, canActivate: [AuthGuard], data: {roles: [UserRole.Admin]} },
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
