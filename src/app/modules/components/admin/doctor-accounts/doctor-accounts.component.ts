import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/core/admin-service/admin-service.service';
import { DoctorAccount } from 'src/shared/models/accounts/doctor-account/doctor-account';
import { BooleanServerResponse } from 'src/shared/models/boolean-server-response/boolean-server-response';

@Component({
  selector: 'app-doctor-accounts',
  templateUrl: './doctor-accounts.component.html',
  styleUrls: ['./doctor-accounts.component.scss']
})
export class DoctorAccountsComponent implements OnInit {

    constructor(private adminService: AdminService) { }

    activeDoctorAccounts: DoctorAccount[];
    bannedDoctorAccounts: DoctorAccount[];

    ngOnInit() {
        this.adminService.getDoctorAccounts(true).subscribe(
            (res: DoctorAccount[]) => {
              this.activeDoctorAccounts = res;
            }
        );

        this.adminService.getDoctorAccounts(false).subscribe(
            (res: DoctorAccount[]) => {
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
