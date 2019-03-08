import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSegmentComponent } from './create-segment.component';

describe('CreateSegmentComponent', () => {
  let component: CreateSegmentComponent;
  let fixture: ComponentFixture<CreateSegmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSegmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
