import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/core/admin-service/admin-service.service';
import { DcpAccount } from 'src/shared/models/accounts/dcp-account/dcp-account';

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
}
