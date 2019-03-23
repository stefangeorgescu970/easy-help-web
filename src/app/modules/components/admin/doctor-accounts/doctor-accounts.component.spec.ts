import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAccountsComponent } from './doctor-accounts.component';

describe('DoctorAccountsComponent', () => {
  let component: DoctorAccountsComponent;
  let fixture: ComponentFixture<DoctorAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
