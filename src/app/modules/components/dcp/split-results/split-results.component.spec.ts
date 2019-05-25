import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitResultsComponent } from './split-results.component';

describe('SplitResultsComponent', () => {
  let component: SplitResultsComponent;
  let fixture: ComponentFixture<SplitResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
