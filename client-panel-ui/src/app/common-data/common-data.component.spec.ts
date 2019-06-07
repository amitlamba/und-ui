import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDataComponent } from './common-data.component';

describe('CommonDataComponent', () => {
  let component: CommonDataComponent;
  let fixture: ComponentFixture<CommonDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
