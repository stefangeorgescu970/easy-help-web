import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPushComponent } from './test-push.component';

describe('TestPushComponent', () => {
  let component: TestPushComponent;
  let fixture: ComponentFixture<TestPushComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPushComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
