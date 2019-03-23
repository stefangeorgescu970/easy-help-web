import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationCentersComponent } from './donation-centers.component';

describe('DonationCentersComponent', () => {
  let component: DonationCentersComponent;
  let fixture: ComponentFixture<DonationCentersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationCentersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
