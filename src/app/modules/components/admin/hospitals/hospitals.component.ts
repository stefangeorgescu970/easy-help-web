import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/core/hospital-service/hospital.service';
import { RealLocation } from 'src/shared/models/locations/real-location';
import { EnumsService } from 'src/core/enums-service/enums-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BooleanServerResponse } from 'src/shared/models/boolean-server-response/boolean-server-response';
import { LocationResponse } from 'src/shared/models/locations/location-response';


@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss']
})
export class HospitalsComponent implements OnInit {

    constructor(private hospitalService: HospitalService, private enumService : EnumsService) { }

    hospitalForm: FormGroup;
    counties: string[];
    hospitals: RealLocation[];

    ngOnInit() {
        const formBuilder = new FormBuilder();

        this.hospitalService.getHospitals().subscribe(
            (res: RealLocation[]) => {
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
          county: ['', Validators.required]
        });
    }

    enumToOption(enu: string): string {
         return enu.split('_')
        .map((s: string) => s.slice(0, 1) + s.slice(1).toLowerCase())
        .join(' ');
    }

    addHospital() {
      const hospital = this.hospitalForm.value;
      this.hospitalService.addHospital(hospital).subscribe(
        (res: LocationResponse) => {
          if(res.success){
            this.hospitals.push(res.model);
          }else{
            alert(res.exception)
          } 
        } );
      }

      removeHospital(hospitalId: number, index : number) {
        this.hospitalService.removeHospital(hospitalId)
          .subscribe((res: BooleanServerResponse) => {
            if (res.success === true){
              this.hospitals.splice(index, 1);
            }else{
              alert(res.exception)
            }
          });
      }

}
