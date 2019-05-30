import { BooleanServerResponse } from './../../../../../shared/models/shared/boolean-server-response';
import { BloodStock } from './../../../../../shared/models/shared/blood-stock';
import { DonationCenterPersonnelService } from './../../../../../core/donation-center-personnel.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/core/auth.service';
import { StoredBloodLevel1 } from 'src/shared/models/dcp/incoming/stored-blood-level1';

@Component({
  selector: 'app-blood-stocks',
  templateUrl: './blood-stocks.component.html',
  styleUrls: ['./blood-stocks.component.scss']
})
export class BloodStocksComponent implements OnInit {

    expiredBlood: StoredBloodLevel1[];
    countryStocks: BloodStock[];
    dcStocks: BloodStock[];

    constructor(private authService: AuthService, private dcpService: DonationCenterPersonnelService) { }

    ngOnInit() {
        this.dcpService.getExpiredBlood(this.authService.getUser().id).subscribe(
            (res: StoredBloodLevel1[]) => {
                this.expiredBlood = res;
        });

        this.dcpService.getCountryBloodStock().subscribe(
            (res: BloodStock[]) => {
                this.countryStocks = res;
        });

        this.dcpService.getBloodStockInDC(this.authService.getUser().id).subscribe(
            (res: BloodStock[]) => {
                this.dcStocks = res;
        });
    }

    discardBlood(blood: StoredBloodLevel1) {
        this.dcpService.discardBlood(blood.id).subscribe(
            (res: BooleanServerResponse) => {
                if (res.success === true) {
                    this.expiredBlood = this.expiredBlood.filter(obj => obj.id !== blood.id);
                } else {
                    alert(res.exception);
                }
        });
    }
}
