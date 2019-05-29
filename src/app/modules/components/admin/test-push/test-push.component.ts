import { BooleanServerResponse } from 'src/shared/models/boolean-server-response/boolean-server-response';
import { AdminService } from 'src/core/admin.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { loadInternal } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-test-push',
  templateUrl: './test-push.component.html',
  styleUrls: ['./test-push.component.scss']
})
export class TestPushComponent implements OnInit {

    pushForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(private formBuilder: FormBuilder, private adminService: AdminService) { }

    ngOnInit() {
        this.pushForm = this.formBuilder.group({
            username: ['', Validators.required]
        });
    }
    get f() { return this.pushForm.controls; }

    sendTestPush() {
        this.submitted = true;
        this.error = '';

        // stop here if form is invalid
        if (this.pushForm.invalid) {
            return;
        }

        this.loading = true;
        this.adminService.sendTestPush(this.f.username.value)
          .subscribe((res: BooleanServerResponse) => {
                this.loading = false;
                if (res.success === true) {
                alert('successfully sent notification');
                } else {
                this.error = res.exception;
                }
          });
    }

}
