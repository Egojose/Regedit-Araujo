import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SPServicio } from '../servicios/sp-servicio';
import { Usuario } from '../dominio/usuario';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ItemAddResult } from 'sp-pnp-js';
import { Empleado } from '../dominio/empleado';
import { Grupo } from '../dominio/grupo';
@Component({
  selector: 'app-editar-vista-usuario',
  templateUrl: './editar-vista-usuario.component.html',
  styleUrls: ['./editar-vista-usuario.component.css']
})
export class EditarVistaUsuarioComponent implements OnInit {
  editarEmpleadoFormUsuario: FormGroup;
  usuario: Usuario;
  usuarioActual: Usuario;
  usuarios: Usuario[] = [];
  emptyManager: boolean;
  adjuntoHV: any;
  adjuntoCertificado: any;
  adjuntoDiplomas: any;
  adjuntoHVcorporativa: any;
  grupos: Grupo[] = [];
  dataUsuarios = [
    {value: 'Seleccione', label : 'Seleccione'}
  ];
  dataEmpleados = [
    {value: '', nombre: ''}
  ]
  PermisosCrearRegistro: boolean;
  empleadoEditar: Empleado[] = [];
  empleado: Empleado;


  constructor(private fB: FormBuilder, private servicio: SPServicio, private router: Router, public toastr: ToastrManager) { }

  ngOnInit() {
    this.registrarControlesUsuario();
    this.obtenerUsuarios();
    this.ObtenerUsuarioActual();
    this.verificarPermisos();
    this.valoresPorDefecto();
  }

  private registrarControlesUsuario() {
    this.editarEmpleadoFormUsuario = this.fB.group({
      primerNombreUsuario: [''],
      segundoNombreUsuario: [''],
      primerApellidoUsuario: [''],
      segundoApellidoUsuario: [''],
      celularUsuario: [''],
      direccionUsuario: [''],
      contactoEmergenciaUsuario: [''],
      telefonoContactoUsuario: ['']
    })
  };

  obtenerUsuarios() {
    this.servicio.ObtenerTodosLosUsuarios().subscribe(
      (respuesta) => {
        this.empleadoEditar = Usuario.fromJsonList(respuesta);
        console.log(this.usuarios);
        this.DataSourceUsuarios();
      });
  };

  seleccionarUsuario(event) {
    if (event != "Seleccione") {
      this.emptyManager = false;
    } else {
      this.emptyManager = true;
      this.MensajeAdvertencia('Debe seleccionar un usuario');
    }
  };

  ObtenerUsuarioActual() {
    this.servicio.ObtenerUsuarioActual().subscribe(
      (Response) => {
        this.usuarioActual = new Usuario(Response.Title, Response.email, Response.Id);
        this.obtenerGrupos();
        this.obtenerInfoEmpleado();
        console.log(this.obtenerInfoEmpleado() + 'Hola');
      }, err => {
        console.log('Error obteniendo usuario: ' + err);
      }
    );
  };

  private DataSourceUsuarios() {
    this.usuarios.forEach(usuario => {
      this.dataUsuarios.push({ value: usuario.id.toString(), label: usuario.nombre });
    });
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

  verificarPermisos() {
    let existeGrupoCrearEditarPerfilEmpleado = this.grupos.find(x => x.title === "CrearEditarPerfilEmpleado");
    if(existeGrupoCrearEditarPerfilEmpleado !== null) {
      this.PermisosCrearRegistro = false;
    }; 
  };

  valoresPorDefecto() {
    this.editarEmpleadoFormUsuario.get('primerNombreUsuario').setValue(this.empleadoEditar[0].primerNombre);
    this.editarEmpleadoFormUsuario.get('segundoNombreUsuario').setValue(this.empleadoEditar[0].segundoNombre);
    this.editarEmpleadoFormUsuario.get('primerApellidoUsuario').setValue(this.empleadoEditar[0].primerApellido);
    this.editarEmpleadoFormUsuario.get('segundoApellidoUsuario').setValue(this.empleadoEditar[0].segundoApellido);
  }

  adjuntarHojaDeVida(event) {
    let AdjuntoHojaVida = event.target.files[0];
    if (AdjuntoHojaVida != null) {
      this.adjuntoHV = AdjuntoHojaVida;
    } else {
      this.adjuntoHV = null;
    };
  };

  adjuntarCertificados(event) {
    let AdjuntoCertificados = event.target.files[0];
    if (AdjuntoCertificados != null) {
      this.adjuntoCertificado = AdjuntoCertificados;
    } else {
      this.adjuntoCertificado = null;
    };
  };

  adjuntarDiplomas(event) {
    let AdjuntoDiplomas = event.target.files[0];
    console.log(AdjuntoDiplomas);
    if (AdjuntoDiplomas != null) {
      this.adjuntoDiplomas = AdjuntoDiplomas;
    } else {
      this.adjuntoDiplomas = null;
    };
  };

  adjuntarHVcorporativa(event) {
    let AdjuntoHVcorporativa = event.target.files[0];
    if(AdjuntoHVcorporativa !== null) {
      this.adjuntarHVcorporativa = AdjuntoHVcorporativa;
    }
    else {
      this.adjuntarHVcorporativa = null;
    };
  };

  obtenerInfoEmpleado() {
    let idUsuario = this.usuarioActual.id;
    this.servicio.obtenerInfoEmpleadoSeleccionado(idUsuario).subscribe(
      (respuesta) => {
        this.empleadoEditar = Empleado.fromJsonList(respuesta);
        console.log(this.empleadoEditar)
      }
    )
  };


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
