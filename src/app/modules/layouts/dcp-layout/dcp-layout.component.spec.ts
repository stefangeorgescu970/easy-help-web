import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcpLayoutComponent } from './dcp-layout.component';

describe('DcpLayoutComponent', () => {
  let component: DcpLayoutComponent;
  let fixture: ComponentFixture<DcpLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcpLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcpLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
