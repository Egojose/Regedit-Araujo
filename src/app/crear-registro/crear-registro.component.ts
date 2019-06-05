  import { Component, OnInit } from '@angular/core';
  import { FormGroup, FormBuilder, Validators } from '@angular/forms';
  import { SPServicio } from '../servicios/sp-servicio';
  import { Usuario } from '../dominio/usuario';
  import { ItemAddResult } from 'sp-pnp-js';
  import { Router } from '@angular/router';
  import { Sede } from '../dominio/sede';
  import { Area } from '../dominio/area';
  import { Cargo } from '../dominio/cargo';
  import { ToastrModule, ToastrManager } from 'ng6-toastr-notifications';



  @Component({
    selector: 'app-crear-registro',
    templateUrl: './crear-registro.component.html',
    styleUrls: ['./crear-registro.component.css']
  })
  export class CrearRegistroComponent implements OnInit {
  empleadoForm: FormGroup;
  ObjUsuarios: [];
  usuarios: Usuario[] = [];
  emptyManager: boolean;
  adjuntoHV: any;
  adjuntoCertificado: any;
  adjuntoDiplomas: any;
  sede: Sede[] = [];
  area: Area[] = [];
  cargo: Cargo[] = [];
  // valorUsuarioPorDefecto: string = "Seleccione";
  dataUsuarios = [
    {value: 'Seleccione', label : 'Seleccione'}
  ];
  counter: number = 0;


  constructor(private fB: FormBuilder, private servicio: SPServicio, private router: Router, public toastr: ToastrManager) { }

  ngOnInit() {
    this.registrarControles();
    this.obtenerUsarios();
    this.obtenerSede();
    this.obtenerArea();
    this.obtenerCargo();
  }

  private registrarControles() {
    this.empleadoForm = this.fB.group({
      usuario: [''],
      primerNombre: ['', Validators.required],
      segundoNombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
      fechaSalida: [''],
      tipoContrato: ['', Validators.required],
      terminoContrato: ['', Validators.required],
      cargo: ['', Validators.required],
      salario: ['', Validators.required],
      lugarExpedicion: ['', Validators.required],
      salarioTexto: ['', Validators.required],
      area: ['', Validators.required],
      jefe: [''],
      direccion: ['', Validators.required],
      celular: ['', Validators.required],
      sede: ['', Validators.required],
      extension: ['', Validators.required],
      bono: [''],
      afp: [''],
      universidad: [''],
      carrera: [''],
      contactoEmergencia: [''],
      numeroContactoEmergencia: ['']
    });
    this.emptyManager = true;
  }

  obtenerUsarios() {
    this.servicio.ObtenerTodosLosUsuarios().subscribe(
      (respuesta) => {
        this.usuarios = Usuario.fromJsonList(respuesta);
        console.log(this.usuarios);
        this.DataSourceUsuarios();
      })
  }

  adjuntarHojaDeVida(event) {
    let AdjuntoHojaVida = event.target.files[0];
    if (AdjuntoHojaVida != null) {
      this.adjuntoHV = AdjuntoHojaVida;
    } else {
      this.adjuntoHV = null;
    }
  }

  adjuntarCertificados(event) {
    let AdjuntoCertificados = event.target.files[0];
    if (AdjuntoCertificados != null) {
      this.adjuntoCertificado = AdjuntoCertificados;
    } else {
      this.adjuntoCertificado = null;
    }
  }

  adjuntarDiplomas(event) {
    let AdjuntoDiplomas = event.target.files[0];
    if (AdjuntoDiplomas != null) {
      this.adjuntoDiplomas = AdjuntoDiplomas;
    } else {
      this.adjuntoDiplomas = null;
    }
  }

  seleccionarUsuario(event) {
    if (event != "Seleccione") {
      this.emptyManager = false;
    } else {
      this.emptyManager = true;
    }
  }

  private DataSourceUsuarios() {
    this.usuarios.forEach(usuario => {
      this.dataUsuarios.push({ value: usuario.id.toString(), label: usuario.nombre });
    });
  };

  obtenerSede() { 
    this.servicio.obtenerSedes().subscribe(
    (respuesta) => {
      this.sede = Sede.fromJsonList(respuesta);
    });
  };
  
  obtenerArea() {
    this.servicio.obtenerArea().subscribe(
      (respuesta) => {
        this.area = Area.fromJsonList(respuesta);
      });
  };

  obtenerCargo() {
    this.servicio.obtenerCargo().subscribe(
      (respuesta) => {
        this.cargo = Cargo.fromJsonList(respuesta)
      });
  };

  validarVacios() {
    this.counter = 0

    if(this.empleadoForm.get('usuario').value === null) {
      this.MensajeAdvertencia('El campo "Usuario" es requerido');
      this.counter++;
    }
    
    if(this.empleadoForm.get('primerNombre').value === "") {
      this.MensajeAdvertencia('El campo "Primer Nombre" es requerido');
      this.counter++;
    }

    if(this.empleadoForm.get('segundoNombre').value === "") {
      this.MensajeAdvertencia('El campo "Segundo Nombre" es requerido');
      this.counter++;
    }

    if(this.empleadoForm.get('primerApellido').value === "") {
      this.MensajeAdvertencia('El campo "Primer Apellido" es requerido');
      this.counter++;
    }

    if(this.empleadoForm.get('segundoApellido').value === "") {
      this.MensajeAdvertencia('El campo "Segundo Apellido" es requerido');
      this.counter++;
    }

    if(this.empleadoForm.get('numeroDocumento').value === "") {
      this.MensajeAdvertencia('El campo "Número de documento" es requerido');
      this.counter++;
    }

    if(this.empleadoForm.get('tipoDocumento').value === "") {
      this.MensajeAdvertencia('El campo "Tipo de documento" es requerido');
      this.counter++;
    }

    if(this.empleadoForm.get('fechaIngreso').value === "") {
      this.MensajeAdvertencia('EL campo "Fecha de ingreso" es requerido');
      this.counter++;
    }

    if(this.empleadoForm.get('tipoContrato').value === "") {
      this.MensajeAdvertencia('El campo "Tipo de contrato" es requerido');
      this.counter++;
    }

    if(this.empleadoForm.get('terminoContrato').value === "") {
      this.MensajeAdvertencia('El campo "Término del contrato" es requerido');
      this.counter++;
    }

    if(this.empleadoForm.get('cargo').value === "") {
      this.MensajeAdvertencia('El campo "Cargo" es requerido');
      this.counter++;
    }

    if(this.empleadoForm.get('salario').value === "") {
      this.MensajeAdvertencia('El campo "Salario" es requerido');
      this.counter++;
    }

    if(this.empleadoForm.get('lugarExpedicion').value === "") {
      this.MensajeAdvertencia('El campo "Lugar de expedición" es requerido');
      this.counter++;
    }

    if(this.empleadoForm.get('salarioTexto').value === "") {
      this.MensajeAdvertencia('El campo "Salario en Letras" es requerido');
      this.counter++;
    }
    
    if(this.empleadoForm.get('area').value === "") {
      this.MensajeAdvertencia('El campo "Area" es requerido');
      this.counter++;
    }

    if(this.empleadoForm.get('jefe').value === "") {
      this.MensajeAdvertencia('El campo "Jefe" es requerido');
      this.counter++;
    }

    if(this.empleadoForm.get('direccion').value === "") {
      this.MensajeAdvertencia('El campo "Dirección" es requerido');
      this.counter++;
    }

    if(this.empleadoForm.get('celular').value === "") {
      this.MensajeAdvertencia('El campo "Celular" es requerido');
      this.counter++;
    }

    if(this.empleadoForm.get('sede').value === "") {
      this.MensajeAdvertencia('El campo "Sede" es requerido');
      this.counter++;
    }

    if(this.empleadoForm.get('extension').value === "") {
      this.MensajeAdvertencia('El campo "Extensión" es requerido'); 
      this.counter ++;
    }

    if(this.counter > 0) {
      this.MensajeAdvertencia('Por favor diligencie los campos requeridos');
      return false;
    }
  }

  
  onSubmit() {
    this.validarVacios();
    console.log(this.empleadoForm)
    let usuario = this.empleadoForm.get('usuario').value.id;
    console.log(usuario);
    let primerNombre = this.empleadoForm.get('primerNombre').value;
    let segundoNombre = this.empleadoForm.get('segundoNombre').value;
    let primerApellido = this.empleadoForm.get('primerApellido').value;
    let segundoApellido = this.empleadoForm.get('segundoApellido').value;
    let numeroDocumento = this.empleadoForm.get('numeroDocumento').value;
    let tipoDocumento = this.empleadoForm.get('tipoDocumento').value;
    let fechaIngreso = this.empleadoForm.get('fechaIngreso').value;
    let fechaSalida = this.empleadoForm.get('fechaSalida').value;
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
    let numeroContactoEmergencia = this.empleadoForm.get('numeroContactoEmergencia').value;
    let objEmpleado;
    let salarioIntegral;
    let SumaSalarioIntegral;
    let salarioInteger = parseInt(salario, 10);
    let bonoInteger = parseInt(bono, 10);
    let afpInteger = parseInt(afp, 10);
    let nombreEmpleado;
    let contador = 0
    

    if(tipoContrato === 'Integral') {
      SumaSalarioIntegral = salarioInteger + bonoInteger + afpInteger;
      salarioIntegral = `${SumaSalarioIntegral}` 
    }
    else {
      salarioIntegral = "";
    }

    if(tipoContrato === 'Integral' && (bono === "" || afp === "")) {
      this.MensajeAdvertencia('El campo Bono y Afp son requeridos cuando el tipo de contrato es Integral');
      return false;
    }

    if(terminoContrato === 'Fijo' && fechaSalida === "") {
      this.MensajeAdvertencia('Debe especificar la fecha de salida para contrato a término fijo');
      return false;
    }

    if(terminoContrato === 'Fijo') {
      fechaSalida = fechaSalida;
    }
    else {
      fechaSalida = null;
    }

    nombreEmpleado = primerNombre + ' ' + segundoNombre + ' ' + primerApellido + ' ' + segundoApellido

    objEmpleado = {
      usuario: usuario.id,
      Title: nombreEmpleado.toUpperCase(),
      PrimerNombre: primerNombre,
      SegundoNombre: segundoNombre,
      PrimerApellido: primerApellido,
      SegundoApellido: segundoApellido,
      NumeroDocumento: numeroDocumento,
      TipoDocumento: tipoDocumento,
      FechaIngreso: fechaIngreso,
      FechaSalida: fechaSalida,
      TipoContrato: tipoContrato,
      Cargo: cargo,
      Salario: salario,
      lugarExpedicion: luagarExpedicion,
      salarioTexto: salarioTexto,
      Area: area,
      Jefe: jefe.id,
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
      ContactoEmergencia: contactoEmergencia,
      NumeroContactoEmergencia: numeroContactoEmergencia
    }
    console.log(salarioIntegral);
    
    if(this.empleadoForm.invalid) {
      this.MensajeAdvertencia('hay campos vacíos')
    } 
    else {
      this.servicio.AgregarInfoEmpleado(objEmpleado).then(
        (item: ItemAddResult) => {
         this.MensajeExitoso("El registro se ha creado con éxito")
          
        },  err => {
          this.MensajeError('error al guardar la solicitud')
        });
    }
  }

  MensajeExitoso(mensaje: string) {
    this.toastr.successToastr(mensaje, 'Confirmado!');
  }

  MensajeError(mensaje: string) {
    this.toastr.errorToastr(mensaje, 'Oops!');
  }

  MensajeAdvertencia(mensaje: string) {
    this.toastr.warningToastr(mensaje, 'Validación!');
  }

  MensajeInfo(mensaje: string) {
    this.toastr.infoToastr(mensaje, 'Info');
  }
}
