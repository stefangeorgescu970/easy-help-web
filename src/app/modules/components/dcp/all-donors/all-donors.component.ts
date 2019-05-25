import { ProfileData } from 'src/shared/models/profile-data/profile-data';
import { AuthService } from './../../../../../core/auth-service/auth.service';
import { BaseAccount } from './../../../../../shared/models/accounts/base-account';
import { Component, OnInit } from '@angular/core';
import { DonorService } from 'src/core/donor-service/donor-service';
import { EnumsService } from 'src/core/enums-service/enums-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DonorAccount } from 'src/shared/models/accounts/donor-account/donor-account';

@Component({
  selector: 'app-all-donors',
  templateUrl: './all-donors.component.html',
  styleUrls: ['./all-donors.component.scss']
})
export class AllDonorsComponent implements OnInit {

  constructor(private donorService: DonorService , private enumService: EnumsService,
              private authService: AuthService) { }

  donors: BaseAccount[];
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
    this.donorService.filterDonors(this.currentDCP.county, canDonate, group).subscribe(
      (res: DonorAccount[]) => {
      this.donors = res;
    });

  }

  getAllDonors(clearForm: boolean) {
      this.donorService.getDonorsByCounty(this.currentDCP.county).subscribe(
          (res: DonorAccount[]) => {
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
