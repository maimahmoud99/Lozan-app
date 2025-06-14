import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteesAndPolicyComponent } from './guarantees-and-policy.component';

describe('GuaranteesAndPolicyComponent', () => {
  let component: GuaranteesAndPolicyComponent;
  let fixture: ComponentFixture<GuaranteesAndPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuaranteesAndPolicyComponent]
    });
    fixture = TestBed.createComponent(GuaranteesAndPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
