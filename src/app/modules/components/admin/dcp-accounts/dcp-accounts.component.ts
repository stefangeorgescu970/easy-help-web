import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/core/admin-service.service';
import { DcpAccount } from 'src/shared/models/accounts/dcp-account/dcp-account';
import { BooleanServerResponse } from 'src/shared/models/boolean-server-response/boolean-server-response';

@Component({
  selector: 'app-dcp-accounts',
  templateUrl: './dcp-accounts.component.html',
  styleUrls: ['./dcp-accounts.component.scss']
})
export class DcpAccountsComponent implements OnInit {

    constructor(private adminService: AdminService) { }

    activeDcpAccounts: DcpAccount[];
    bannedDcpAccounts: DcpAccount[];

    ngOnInit() {
        this.adminService.getDcpAccounts(true).subscribe(
            (res: DcpAccount[]) => {
              this.activeDcpAccounts = res;
            }
        );

        this.adminService.getDcpAccounts(false).subscribe(
            (res: DcpAccount[]) => {
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
