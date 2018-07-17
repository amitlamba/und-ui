import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVsExistingUsersGraphComponent } from './new-vs-existing-users-graph.component';

describe('NewVsExistingUsersGraphComponent', () => {
  let component: NewVsExistingUsersGraphComponent;
  let fixture: ComponentFixture<NewVsExistingUsersGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVsExistingUsersGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVsExistingUsersGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
