import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCommitmentsComponent } from './my-commitments.component';

describe('MyCommitmentsComponent', () => {
  let component: MyCommitmentsComponent;
  let fixture: ComponentFixture<MyCommitmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCommitmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCommitmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
