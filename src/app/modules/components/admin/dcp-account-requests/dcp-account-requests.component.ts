import { BooleanServerResponse } from 'src/shared/models/shared/boolean-server-response';
import { AdminDCPAccount } from '../../../../../shared/models/admin/incoming/admin-dcp-account';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/core/admin.service';

@Component({
  selector: 'app-dcp-account-requests',
  templateUrl: './dcp-account-requests.component.html',
  styleUrls: ['./dcp-account-requests.component.scss']
})
export class DcpAccountRequestsComponent implements OnInit {

    constructor(private adminService: AdminService) { }

    dcpAccounts: AdminDCPAccount[];

    ngOnInit() {
        this.adminService.getDcpAccountRequests().subscribe(
            (res: AdminDCPAccount[]) => {
              this.dcpAccounts = res;
            }
        );
    }

    approveDCPRequest(requestId: number, index: number) {
        this.adminService.acceptDCPRequest(requestId)
          .subscribe((res: BooleanServerResponse) => {
            if (res.success === true){
              this.dcpAccounts.splice(index, 1);
            }else{
              alert(res.exception)
            }
          });
      }
    
      declineDCPRequest(requestId: number, index : number) {
        this.adminService.declineDCPRequest(requestId)
          .subscribe((res: BooleanServerResponse) => {
            if (res.success === true){
              this.dcpAccounts.splice(index, 1);
            }else{
              alert(res.exception)
            }
          });
      }

}
