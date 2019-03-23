import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/core/admin-service/admin-service.service';
import { DcpAccount } from 'src/shared/models/accounts/dcp-account/dcp-account';

@Component({
  selector: 'app-dcp-account-requests',
  templateUrl: './dcp-account-requests.component.html',
  styleUrls: ['./dcp-account-requests.component.scss']
})
export class DcpAccountRequestsComponent implements OnInit {

    constructor(private adminService: AdminService) { }

    dcpAccounts: DcpAccount[];

    ngOnInit() {
        this.adminService.getDcpAccountRequests().subscribe(
            (res: DcpAccount[]) => {
              this.dcpAccounts = res;
            }
        );
    }
  
}
