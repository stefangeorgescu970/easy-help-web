import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/core/admin-service/admin-service.service';
import { DoctorAccount } from 'src/shared/models/accounts/doctor-account/doctor-account';

@Component({
  selector: 'app-doctor-account-requests',
  templateUrl: './doctor-account-requests.component.html',
  styleUrls: ['./doctor-account-requests.component.scss']
})
export class DoctorAccountRequestsComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  doctorAccounts: DoctorAccount[];

  ngOnInit() {
      this.adminService.getDoctorAccountRequests().subscribe(
          (res: DoctorAccount[]) => {
            this.doctorAccounts = res;
          }
      );
  }

}
