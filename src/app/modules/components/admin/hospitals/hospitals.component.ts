import { IdResponse } from './../../../../../shared/models/shared/id-response';
import { ExtendedLocation } from 'src/shared/models/shared/extended-location';
import { AdminService } from '../../../../../core/admin.service';
import { Component, OnInit } from '@angular/core';;
import { EnumsService } from 'src/core/enums-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BooleanServerResponse } from 'src/shared/models/shared/boolean-server-response';


@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss']
})
export class HospitalsComponent implements OnInit {

    constructor(private adminService: AdminService, private enumService: EnumsService) { }

    hospitalForm: FormGroup;
    counties: string[];
    hospitals: ExtendedLocation[];

    ngOnInit() {
        const formBuilder = new FormBuilder();

        this.adminService.getHospitals().subscribe(
            (res: ExtendedLocation[]) => {
              this.hospitals = res;
            }
        );

        this.enumService.getEnums().subscribe(res => {
          this.counties = res.object.counties;
        });

        this.hospitalForm = formBuilder.group({
          name: ['', Validators.required],
          address: ['', Validators.required],
          latitude: ['', Validators.required],
          longitude: ['', Validators.required],
          county: ['', Validators.required],
          phone: ['', Validators.required]
        });
    }

    enumToOption(enu: string): string {
         return enu.split('_')
        .map((s: string) => s.slice(0, 1) + s.slice(1).toLowerCase())
        .join(' ');
    }

    addHospital() {
      const hospital = this.hospitalForm.value;
      this.adminService.addHospital(hospital).subscribe(
        (res: IdResponse) => {
            if (res.success) {
                 const newHospital = new ExtendedLocation();
                 newHospital.id = res.newId;
                 newHospital.address = hospital.address;
                 newHospital.county = hospital.county;
                 newHospital.latitude = hospital.latitude;
                 newHospital.longitude = hospital.longitude;
                 newHospital.name = hospital.name;
                 newHospital.phone = hospital.phone;
                 this.hospitals.push(newHospital);
            } else {
              alert(res.exception);
            }
        } );
      }

      removeHospital(hospitalId: number, index : number) {
        this.adminService.removeHospital(hospitalId)
          .subscribe((res: BooleanServerResponse) => {
            if (res.success === true){
              this.hospitals.splice(index, 1);
            }else{
              alert(res.exception)
            }
          });
      }

}
