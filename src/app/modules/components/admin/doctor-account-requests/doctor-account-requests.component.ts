import { AdminDoctorAccount } from '../../../../../shared/models/admin/incoming/admin-doctor-account';
import { AdminService } from 'src/core/admin.service';
import { Component, OnInit } from '@angular/core';
import { BooleanServerResponse } from 'src/shared/models/shared/boolean-server-response';

@Component({
  selector: 'app-doctor-account-requests',
  templateUrl: './doctor-account-requests.component.html',
  styleUrls: ['./doctor-account-requests.component.scss']
})
export class DoctorAccountRequestsComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  doctorAccounts: AdminDoctorAccount[];

  ngOnInit() {
      this.adminService.getDoctorAccountRequests().subscribe(
          (res: AdminDoctorAccount[]) => {
            this.doctorAccounts = res;
          }
      );
  }

  approveDoctorRequest(requestId: number, index: number) {
    this.adminService.acceptDoctorRequest(requestId)
      .subscribe((res: BooleanServerResponse) => {
        if (res.success === true){
          this.doctorAccounts.splice(index, 1);
        }else{
          alert(res.exception)
        }
      });
  }

  declineDoctorRequest(requestId: number, index : number) {
    this.adminService.declineDoctorRequest(requestId)
      .subscribe((res: BooleanServerResponse) => {
        if (res.success === true){
          this.doctorAccounts.splice(index, 1);
        }else{
          alert(res.exception)
        }
      });
  }
  
}
