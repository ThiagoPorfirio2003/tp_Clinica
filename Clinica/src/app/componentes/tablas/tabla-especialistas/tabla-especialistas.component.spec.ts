import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaEspecialistasComponent } from './tabla-especialistas.component';

describe('TablaEspecialistasComponent', () => {
  let component: TablaEspecialistasComponent;
  let fixture: ComponentFixture<TablaEspecialistasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaEspecialistasComponent]
    });
    fixture = TestBed.createComponent(TablaEspecialistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
