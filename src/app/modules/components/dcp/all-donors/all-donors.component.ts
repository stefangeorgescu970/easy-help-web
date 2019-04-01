import { BaseAccount } from './../../../../../shared/models/accounts/base-account';
import { Component, OnInit } from '@angular/core';
import { DonorService } from 'src/core/donor-service/donor-service';
import { EnumsService } from 'src/core/enums-service/enums-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-donors',
  templateUrl: './all-donors.component.html',
  styleUrls: ['./all-donors.component.scss']
})
export class AllDonorsComponent implements OnInit {

  constructor(private donorService: DonorService , private enumService: EnumsService) { }

  donors: BaseAccount[];
  counties: string[];
  filterOptions = ['County', 'Blood Group', 'Something'];
  bloodGroups = ['0(1)', 'A(2)', 'B(3)', 'AB(4)'];

  filterForm: FormGroup;


  ngOnInit() {
    const formBuilder = new FormBuilder();

    this.donorService.getDonorsByCounty("ARAD").subscribe(
      (res: BaseAccount[]) => {
        this.donors = res;
      });

    this.enumService.getEnums().subscribe(res => {
        this.counties = res.object.counties;
      });

    this.filterForm = formBuilder.group({
      filterType : ['', Validators.required],
      filterValue : ['', Validators.required]
    });

  }

  getFiltersValues(filterType: string) {
    switch (filterType) {
      case 'County' : {
         return this.counties;
      }
      case 'Blood Group': {
         return this.bloodGroups;
      }
      default: { 
         //statements; 
         break; 
      }
   }
  }

  enumToOption(enu: string): string {
    return enu.split('_')
   .map((s: string) => s.slice(0, 1) + s.slice(1).toLowerCase())
   .join(' ');
}

}
