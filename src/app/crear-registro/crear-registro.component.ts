import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SPServicio } from '../servicios/sp-servicio';

@Component({
  selector: 'app-crear-registro',
  templateUrl: './crear-registro.component.html',
  styleUrls: ['./crear-registro.component.css']
})
export class CrearRegistroComponent implements OnInit {
empleadoForm: FormGroup;

  constructor(private fB: FormBuilder, private servicio: SPServicio) { }

  ngOnInit() {
    this.empleadoForm = this.fB.group({
      usuario: [''],
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido:[''],
      segundoApellido:[''], 
      numeroDocumento: [''],
      tipoDocumento: [''],
      fechaIngreso:[''],
      tipoContrato: [''],
      cargo: [''],
      salario: [''],
      lugarExpedicion: [''],
      salarioTexto: [''],
      area: [''],
      jefe: [''],
      direccion: [''],
      celular: [''],
      sede: [''],
      extension: [''],
    })
  }

  onSubmit() {
    console.log(this.empleadoForm.get('primerNombre').value)
  }

}
