import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVistaUsuarioComponent } from './editar-vista-usuario.component';

describe('EditarVistaUsuarioComponent', () => {
  let component: EditarVistaUsuarioComponent;
  let fixture: ComponentFixture<EditarVistaUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarVistaUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarVistaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
