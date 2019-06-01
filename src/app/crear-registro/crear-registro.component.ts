import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SPServicio } from '../servicios/sp-servicio';
import { Usuario } from '../dominio/usuario';
import { ItemAddResult } from 'sp-pnp-js';
import pnp from "sp-pnp-js";

@Component({
  selector: 'app-crear-registro',
  templateUrl: './crear-registro.component.html',
  styleUrls: ['./crear-registro.component.css']
})
export class CrearRegistroComponent implements OnInit {
empleadoForm: FormGroup;
ObjUsuarios: [];
usuarios: Usuario[] = [];


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
      terminoContrato: [''],
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
      bono: [''],
      afp: [''],
      universidad: [''],
      carrera: [''],
      contactoEmergencia: ['']
    })
    this.servicio.ObtenerTodosLosUsuarios().subscribe(
      (Usuarios) => {
        this.ObjUsuarios = Usuarios;
      })
  }

  onSubmit() {
    console.log(this.empleadoForm.value)
    let usuario = this.empleadoForm.get('usuario').value;
    let primerNombre = this.empleadoForm.get('primerNombre').value;
    let segundoNombre = this.empleadoForm.get('segundoNombre').value;
    let primerApellido = this.empleadoForm.get('primerApellido').value;
    let segundoApellido = this.empleadoForm.get('segundoApellido').value;
    let numeroDocumento = this.empleadoForm.get('numeroDocumento').value;
    let tipoDocumento = this.empleadoForm.get('tipoDocumento').value;
    let fechaIngreso = this.empleadoForm.get('fechaIngreso').value;
    let tipoContrato = this.empleadoForm.get('tipoContrato').value;
    let terminoContrato = this.empleadoForm.get('terminoContrato').value;
    let cargo = this.empleadoForm.get('cargo').value;
    let salario = this.empleadoForm.get('salario').value;
    let luagarExpedicion = this.empleadoForm.get('lugarExpedicion').value;
    let salarioTexto = this.empleadoForm.get('salarioTexto').value;
    let area = this.empleadoForm.get('area').value;
    let jefe = this.empleadoForm.get('jefe').value;
    let direccion = this.empleadoForm.get('direccion').value;
    let celular = this.empleadoForm.get('celular').value;
    let sede = this.empleadoForm.get('sede').value;
    let extension = this.empleadoForm.get('extension').value;
    let bono = this.empleadoForm.get('bono').value;
    let afp = this.empleadoForm.get('afp').value;
    let universidad = this.empleadoForm.get('universidad').value;
    let carrera = this.empleadoForm.get('carrera').value;
    let contactoEmergencia = this.empleadoForm.get('contactoEmergencia').value;
    let objEmpleado;
    let salarioIntegral;
    let SumaSalarioIntegral;

    if(tipoContrato === 'Integral') {
      SumaSalarioIntegral = salario + bono + afp;
      salarioIntegral = `${SumaSalarioIntegral}` 
    }
    else {
      salarioIntegral = "";
    }

    objEmpleado = {
      usuario: usuario,
      PrimerNombre: primerNombre,
      SegundoNombre: segundoNombre,
      PrimerApellido: primerApellido,
      SegundoApellido: segundoApellido,
      NumeroDocumento: numeroDocumento,
      TipoDocumento: tipoDocumento,
      FechaIngreso: fechaIngreso,
      TipoContrato: tipoContrato,
      Cargo: cargo,
      Salario: salario,
      lugarExpedicion: luagarExpedicion,
      salarioTexto: salarioTexto,
      Area: area,
      Jefe: jefe,
      Direccion: direccion,
      Celular: celular,
      Sede: sede,
      Extension: extension,
      Bonos: bono,
      AFP: afp,
      TerminoContrato: terminoContrato,
      Carrera: carrera,
      Universidad: universidad,
      SalarioIntegral: salarioIntegral,
      ContactoEmergencia: contactoEmergencia
    }
    this.servicio.AgregarInfoEmpleado(objEmpleado).then(
      (item: ItemAddResult) => {
        alert('guardado con éxtio')
      },  err => {
        alert('error al guardar la solicitud')
      });
  }
}
