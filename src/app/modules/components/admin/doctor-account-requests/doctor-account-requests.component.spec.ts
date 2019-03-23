import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAccountRequestsComponent } from './doctor-account-requests.component';

describe('DoctorAccountRequestsComponent', () => {
  let component: DoctorAccountRequestsComponent;
  let fixture: ComponentFixture<DoctorAccountRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorAccountRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAccountRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
