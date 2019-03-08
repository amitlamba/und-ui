import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLiveSegmentComponent } from './create-live-segment.component';

describe('CreateLiveSegmentComponent', () => {
  let component: CreateLiveSegmentComponent;
  let fixture: ComponentFixture<CreateLiveSegmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLiveSegmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLiveSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
