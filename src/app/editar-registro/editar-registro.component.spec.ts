import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRegistroComponent } from './editar-registro.component';

describe('EditarRegistroComponent', () => {
  let component: EditarRegistroComponent;
  let fixture: ComponentFixture<EditarRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
