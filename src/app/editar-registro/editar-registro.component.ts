  import { Component, OnInit } from '@angular/core';
  import { FormGroup, FormBuilder, Validators } from '@angular/forms';
  import { SPServicio } from '../servicios/sp-servicio';
  import { Usuario } from '../dominio/usuario';
  import { Router } from '@angular/router';
  import { ToastrManager } from 'ng6-toastr-notifications';
  import { Sede } from '../dominio/sede';
  import { Area } from '../dominio/area';
  import { Cargo } from '../dominio/cargo';
  import { ItemAddResult } from 'sp-pnp-js';
  import { Empleado } from '../dominio/empleado';
  import { Grupo } from '../dominio/grupo';

  @Component({
    selector: 'app-editar-registro',
    templateUrl: './editar-registro.component.html',
    styleUrls: ['./editar-registro.component.css']
  })
  export class EditarRegistroComponent implements OnInit {
  editarEmpleadoForm: FormGroup;
  usuario: Usuario;
  usuarioActual: Usuario;
  empleadoEditar: Empleado[] = [];
  emptyManager: boolean;
  adjuntoHV: any;
  adjuntoCertificado: any;
  adjuntoDiplomas: any;
  sede: Sede[] = [];
  area: Area[] = [];
  cargo: Cargo[] = [];
  empleado: Empleado;
  grupos: Grupo[] = [];  
  // valorUsuarioPorDefecto: string = "Seleccione";
  dataUsuarios = [
    {value: 'Seleccione', label : 'Seleccione'}
  ];
  counter: number = 0;
  PermisosCrearRegistro: boolean;



    constructor(private fB: FormBuilder, private servicio: SPServicio, private router: Router, public toastr: ToastrManager) { }

    ngOnInit() {
      this.registrarControles();
      this.ObtenerUsuarioActual();
      this.obtenerSede();
      this.obtenerArea();
      this.obtenerCargo();
      this.verificarPermisos();
      // this.obtenerInfoEmpleado();
    }

    private registrarControles() {
      this.editarEmpleadoForm = this.fB.group({
        usuario: ['', Validators.required],
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
    };

    ObtenerUsuarioActual() {
     
      this.servicio.ObtenerUsuarioActual().subscribe(
        (Response) => {
          this.usuarioActual = new Usuario(Response.Title, Response.email, Response.Id);
          this.obtenerGrupos();
        }, err => {
          console.log('Error obteniendo usuario: ' + err);
        }
      );
    };

    obtenerGrupos() {
      let idUsuario = this.usuarioActual.id;
      this.servicio.ObtenerGruposUsuario(idUsuario).subscribe(
        (respuesta) => {
          this.grupos = Grupo.fromJsonList(respuesta);
          console.log(this.grupos)
        }, err => {
          console.log('Error obteniendo grupos de usuario: ' + err);
        }
      )
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

    RecuperarUsuario() {
      this.usuarioActual = JSON.parse(sessionStorage.getItem('usuario'));
    };

    verificarPermisos() {
      let existeGrupoCrearEditarPerfilEmpleado = this.grupos.find(x => x.title === "CrearEditarPerfilEmpleado");
      if(existeGrupoCrearEditarPerfilEmpleado !== null) {
        this.PermisosCrearRegistro = true;
      } 
    }

    // obtenerInfoEmpleado() {
    //   let usuarioId = this.usuarioActual.id;
    //   this.servicio.obtenerInfoEmpleado(usuarioId).subscribe(
    //     (respuesta) => {
    //       this.empleadoEditar = Empleado.fromJsonList(respuesta)
    //       console.log(this.empleadoEditar)
    //     }
    //   )
    // }
  }
