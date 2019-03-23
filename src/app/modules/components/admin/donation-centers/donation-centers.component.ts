import { Component, OnInit } from '@angular/core';
import { DonationCenterService } from 'src/core/donation-center-service/donation-center.service';
import { RealLocation } from 'src/shared/models/locations/real-location';

@Component({
  selector: 'app-donation-centers',
  templateUrl: './donation-centers.component.html',
  styleUrls: ['./donation-centers.component.scss']
})
export class DonationCentersComponent implements OnInit {

    constructor(private donationCenterService: DonationCenterService) { }

    donationCenters: RealLocation[];

    ngOnInit() {
        this.donationCenterService.getDonationCenters().subscribe(
            (res: RealLocation[]) => {
              this.donationCenters = res;
            }
        );
    }

}
