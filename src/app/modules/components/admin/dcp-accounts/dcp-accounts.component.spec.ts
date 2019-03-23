import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpAccountsComponent } from './dcp-accounts.component';

describe('DcpAccountsComponent', () => {
  let component: DcpAccountsComponent;
  let fixture: ComponentFixture<DcpAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
