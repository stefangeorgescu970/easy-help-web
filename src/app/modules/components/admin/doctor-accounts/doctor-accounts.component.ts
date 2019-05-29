import { AdminDoctorAccount } from '../../../../../shared/models/admin/incoming/admin-doctor-account';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/core/admin.service';
import { BooleanServerResponse } from 'src/shared/models/shared/boolean-server-response';

@Component({
  selector: 'app-doctor-accounts',
  templateUrl: './doctor-accounts.component.html',
  styleUrls: ['./doctor-accounts.component.scss']
})
export class DoctorAccountsComponent implements OnInit {

    constructor(private adminService: AdminService) { }

    activeDoctorAccounts: AdminDoctorAccount[];
    bannedDoctorAccounts: AdminDoctorAccount[];

    ngOnInit() {
        this.adminService.getDoctorAccounts(true).subscribe(
            (res: AdminDoctorAccount[]) => {
              this.activeDoctorAccounts = res;
            }
        );

        this.adminService.getDoctorAccounts(false).subscribe(
            (res: AdminDoctorAccount[]) => {
                this.bannedDoctorAccounts = res;
            }
        );
    }

    deactivateDoctorAcoount(requestId: number, index : number) {
        this.adminService.deactivateDCPAccount(requestId)
          .subscribe((res: BooleanServerResponse) => {
            let account = this.activeDoctorAccounts[index]
            let newList = [account] ;
            if (res.success === true){
              this.activeDoctorAccounts.splice(index, 1);
              this.bannedDoctorAccounts = this.bannedDoctorAccounts.concat(newList)
            }else{
              alert(res.exception)
            }
          });
      }
}
