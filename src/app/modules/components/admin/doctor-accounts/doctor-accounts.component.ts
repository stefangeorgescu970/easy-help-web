import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/core/admin-service/admin-service.service';
import { DoctorAccount } from 'src/shared/models/accounts/doctor-account/doctor-account';

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
}
