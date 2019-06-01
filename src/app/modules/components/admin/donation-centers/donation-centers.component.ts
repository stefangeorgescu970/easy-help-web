import { AdminDonationCenter } from './../../../../../shared/models/admin/incoming/admin-donation-center';
import { IdResponse } from './../../../../../shared/models/shared/id-response';
import { ExtendedLocation } from './../../../../../shared/models/shared/extended-location';
import { AdminService } from 'src/core/admin.service';
import { Component, OnInit } from '@angular/core';
import { EnumsService } from 'src/core/enums-service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BooleanServerResponse } from 'src/shared/models/shared/boolean-server-response';

@Component({
  selector: 'app-donation-centers',
  templateUrl: './donation-centers.component.html',
  styleUrls: ['./donation-centers.component.scss']
})
export class DonationCentersComponent implements OnInit {

    constructor(private adminService: AdminService, private enumService: EnumsService) { }

    donationCenters: AdminDonationCenter[];
    donationCenterForm: FormGroup;
    counties: string[];

    ngOnInit() {
      const formBuilder = new FormBuilder();

      this.adminService.getDonationCenters().subscribe(
            (res: AdminDonationCenter[]) => {
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
          county: ['', Validators.required],
          phone: ['', Validators.required],
          numberOfConcurrentDonors: ['', Validators.required]
        });
    }

    enumToOption(enu: string): string {
      return enu.split('_')
     .map((s: string) => s.slice(0, 1) + s.slice(1).toLowerCase())
     .join(' ');
 }

 addDonationCenter() {
   const donationCenter = this.donationCenterForm.value;
   this.adminService.addDonationCenter(donationCenter).subscribe(
     (res: IdResponse) => {
       if (res.success) {
            const newDC = new AdminDonationCenter();
            newDC.id = res.newId;
            newDC.address = donationCenter.address;
            newDC.county = donationCenter.county;
            newDC.latitude = donationCenter.latitude;
            newDC.longitude = donationCenter.longitude;
            newDC.name = donationCenter.name;
            newDC.phone = donationCenter.phone;
            newDC.numberOfConcurrentDonors = donationCenter.numberOfConcurrentDonors;
            this.donationCenters.push(newDC);
       } else {
         alert(res.exception);
       }
     } );
   }

   removeDonationCenter(centerId: number, index : number) {
     this.adminService.removeDonationCenter(centerId)
       .subscribe((res: BooleanServerResponse) => {
         if (res.success === true){
           this.donationCenters.splice(index, 1);
         }else{
           alert(res.exception)
         }
       });
   }

}
