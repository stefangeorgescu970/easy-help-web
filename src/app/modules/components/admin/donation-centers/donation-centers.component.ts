import { Component, OnInit } from '@angular/core';
import { DonationCenterService } from 'src/core/donation-center-service/donation-center.service';
import { RealLocation } from 'src/shared/models/locations/real-location';
import { EnumsService } from 'src/core/enums-service/enums-service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LocationResponse } from 'src/shared/models/locations/location-response';
import { BooleanServerResponse } from 'src/shared/models/boolean-server-response/boolean-server-response';

@Component({
  selector: 'app-donation-centers',
  templateUrl: './donation-centers.component.html',
  styleUrls: ['./donation-centers.component.scss']
})
export class DonationCentersComponent implements OnInit {

    constructor(private donationCenterService: DonationCenterService, private enumService : EnumsService) { }

    donationCenters: RealLocation[];
    donationCenterForm: FormGroup;
    counties: string[];

    ngOnInit() {
      const formBuilder = new FormBuilder();
      
      this.donationCenterService.getDonationCenters().subscribe(
            (res: RealLocation[]) => {
              this.donationCenters = res;
            }
        );

      this.enumService.getEnums().subscribe(res => {
          this.counties = res.object.counties;
        });

      this.donationCenterForm = formBuilder.group({
          name: ['', Validators.required],
          address: ['', Validators.required],
          latitude: ['', Validators.required],
          longitude: ['', Validators.required],
          county: ['', Validators.required]
        });
    }

    enumToOption(enu: string): string {
      return enu.split('_')
     .map((s: string) => s.slice(0, 1) + s.slice(1).toLowerCase())
     .join(' ');
 }

 addDonationCenter() {
   const donationCenter = this.donationCenterForm.value;
   this.donationCenterService.addDonationCenter(donationCenter).subscribe(
     (res: LocationResponse) => {
       if(res.success){
         this.donationCenters.push(res.model);
       }else{
         alert(res.exception)
       } 
     } );
   }

   removeDonationCenter(centerId: number, index : number) {
     this.donationCenterService.removeDonationCenter(centerId)
       .subscribe((res: BooleanServerResponse) => {
         if (res.success === true){
           this.donationCenters.splice(index, 1);
         }else{
           alert(res.exception)
         }
       });
   }

}
