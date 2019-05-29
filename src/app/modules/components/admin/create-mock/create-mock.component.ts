import { AdminService } from './../../../../../core/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-mock',
  templateUrl: './create-mock.component.html',
  styleUrls: ['./create-mock.component.scss']
})
export class CreateMockComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }

  createMock() {
    this.adminService.populateTables();
  }

}
