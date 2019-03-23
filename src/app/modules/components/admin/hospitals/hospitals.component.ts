import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/core/hospital-service/hospital.service';
import { RealLocation } from 'src/shared/models/locations/real-location';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss']
})
export class HospitalsComponent implements OnInit {

    constructor(private hospitalService: HospitalService) { }

    hospitals: RealLocation[];

    ngOnInit() {
        this.hospitalService.getHospitals().subscribe(
            (res: RealLocation[]) => {
              this.hospitals = res;
            }
        );
    }
}
