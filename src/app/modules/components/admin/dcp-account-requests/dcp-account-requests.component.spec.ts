import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpAccountRequestsComponent } from './dcp-account-requests.component';

describe('DcpAccountRequestsComponent', () => {
  let component: DcpAccountRequestsComponent;
  let fixture: ComponentFixture<DcpAccountRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpAccountRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpAccountRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
