import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarOrderComponent } from './sidebar-order.component';

describe('SidebarOrderComponent', () => {
  let component: SidebarOrderComponent;
  let fixture: ComponentFixture<SidebarOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarOrderComponent]
    });
    fixture = TestBed.createComponent(SidebarOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
