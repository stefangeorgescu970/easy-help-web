import { DcpDonorAccount } from './../../../../../shared/models/dcp/incoming/dcp-donor-account';
import { DonationCenterPersonnelService } from './../../../../../core/donation-center-personnel.service';
import { ProfileData } from 'src/shared/models/profile-data/profile-data';
import { AuthService } from '../../../../../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { EnumsService } from 'src/core/enums-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-donors',
  templateUrl: './all-donors.component.html',
  styleUrls: ['./all-donors.component.scss']
})
export class AllDonorsComponent implements OnInit {

  constructor(private dcpService: DonationCenterPersonnelService , private enumService: EnumsService,
              private authService: AuthService) { }

  donors: DcpDonorAccount[];
  canDonateOptions = [true, false];
  bloodGroups = ['0', 'A', 'B', 'AB'];
  currentDCP: ProfileData;
  filterForm: FormGroup;

  ngOnInit() {
    const formBuilder = new FormBuilder();
    this.currentDCP = this.authService.getUser();

    this.getAllDonors(false)

    this.filterForm = formBuilder.group({
      canDonateForm : ['', Validators.required],
      bloodGroupForm : ['', Validators.required]
    });
    
  }

  filter(){
    var canDonate = this.filterForm.controls['canDonateForm'].value;
    var group = this.filterForm.controls['bloodGroupForm'].value;
    if (canDonate === '') {
      canDonate = true;
    }
    if (group === '') {
      group = null;
    }
    this.dcpService.filterDonors(this.currentDCP.county, canDonate, group).subscribe(
      (res: DcpDonorAccount[]) => {
      this.donors = res;
    });

  }

  getAllDonors(clearForm: boolean) {
      this.dcpService.getDonorsByCounty(this.currentDCP.county).subscribe(
          (res: DcpDonorAccount[]) => {
           this.donors = res;
          });
      if (clearForm === true) {
          this.filterForm.reset();
      }
  }

  enumToOption(enu: string): string {
    return enu.split('_')
   .map((s: string) => s.slice(0, 1) + s.slice(1).toLowerCase())
   .join(' ');
}

}
