import { AdminDCPAccount } from '../../../../../shared/models/admin/incoming/admin-dcp-account';
import { AdminService } from 'src/core/admin.service';
import { Component, OnInit } from '@angular/core';
import { DcpAccount } from 'src/shared/models/accounts/dcp-account/dcp-account';
import { BooleanServerResponse } from 'src/shared/models/boolean-server-response/boolean-server-response';

@Component({
  selector: 'app-dcp-accounts',
  templateUrl: './dcp-accounts.component.html',
  styleUrls: ['./dcp-accounts.component.scss']
})
export class DcpAccountsComponent implements OnInit {

    constructor(private adminService: AdminService) { }

    activeDcpAccounts: AdminDCPAccount[];
    bannedDcpAccounts: AdminDCPAccount[];

    ngOnInit() {
        this.adminService.getDcpAccounts(true).subscribe(
            (res: AdminDCPAccount[]) => {
              this.activeDcpAccounts = res;
            }
        );

        this.adminService.getDcpAccounts(false).subscribe(
            (res: AdminDCPAccount[]) => {
              this.bannedDcpAccounts = res;
            }
        );
    }

    deactivateDCPAcoount(requestId: number, index : number) {
      this.adminService.deactivateDCPAccount(requestId)
        .subscribe((res: BooleanServerResponse) => {
          let account = this.activeDcpAccounts[index]
          let newList = [account] ;
          if (res.success === true){
            this.activeDcpAccounts.splice(index, 1);
            this.bannedDcpAccounts = this.bannedDcpAccounts.concat(newList)
          }else{
            alert(res.exception)
          }
        });
    }
}
