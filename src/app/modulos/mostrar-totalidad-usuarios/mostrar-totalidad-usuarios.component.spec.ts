import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarTotalidadUsuariosComponent } from './mostrar-totalidad-usuarios.component';

describe('MostrarTotalidadUsuariosComponent', () => {
  let component: MostrarTotalidadUsuariosComponent;
  let fixture: ComponentFixture<MostrarTotalidadUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarTotalidadUsuariosComponent]
    });
    fixture = TestBed.createComponent(MostrarTotalidadUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
