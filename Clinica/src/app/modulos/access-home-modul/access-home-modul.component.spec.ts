import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessHomeModulComponent } from './access-home-modul.component';

describe('AccessHomeModulComponent', () => {
  let component: AccessHomeModulComponent;
  let fixture: ComponentFixture<AccessHomeModulComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccessHomeModulComponent]
    });
    fixture = TestBed.createComponent(AccessHomeModulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
