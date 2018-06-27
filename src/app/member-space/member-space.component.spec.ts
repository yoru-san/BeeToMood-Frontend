import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSpaceComponent } from './member-space.component';

describe('MemberSpaceComponent', () => {
  let component: MemberSpaceComponent;
  let fixture: ComponentFixture<MemberSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
