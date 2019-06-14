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
  idUsuario;


  constructor(private fB: FormBuilder, private servicio: SPServicio, private router: Router, public toastr: ToastrManager) { }

  ngOnInit() {
    this.registrarControlesUsuario();
    this.obtenerUsuarios();
    console.log(this.editarEmpleadoFormUsuario.value);
    // this.ObtenerUsuarioActual();
    // this.obtenerInfoEmpleado();
    // this.verificarPermisos();
    // this.valoresPorDefecto();
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
        // console.log(this.usuarios);
        this.ObtenerUsuarioActual();
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
      }, err => {
        console.log('Error obteniendo grupos de usuario: ' + err);
      }
    )
  };

  verificarPermisos() {
    let existeGrupoCrearEditarPerfilEmpleado = this.grupos.find(x => x.title === "CrearEditarPerfilEmpleado");
    if(existeGrupoCrearEditarPerfilEmpleado !== undefined) {
      this.PermisosCrearRegistro = true;
    }; 
  };

  GenerarIdentificador(): string {
    var fecha = new Date();
    var valorprimitivo = fecha.valueOf().toString();
    return valorprimitivo;
  }

  valoresPorDefecto() {
    this.editarEmpleadoFormUsuario.controls['primerNombreUsuario'].setValue(this.empleadoEditar[0].primerNombre);
    this.editarEmpleadoFormUsuario.controls['segundoNombreUsuario'].setValue(this.empleadoEditar[0].segundoNombre);
    this.editarEmpleadoFormUsuario.controls['primerApellidoUsuario'].setValue(this.empleadoEditar[0].primerApellido);
    this.editarEmpleadoFormUsuario.controls['segundoApellidoUsuario'].setValue(this.empleadoEditar[0].segundoApellido);
    this.editarEmpleadoFormUsuario.controls['celularUsuario'].setValue(this.empleadoEditar[0].celular);
    this.editarEmpleadoFormUsuario.controls['direccionUsuario'].setValue(this.empleadoEditar[0].direccion);
    this.editarEmpleadoFormUsuario.controls['contactoEmergenciaUsuario'].setValue(this.empleadoEditar[0].contactoEmergencia);
    this.editarEmpleadoFormUsuario.controls['telefonoContactoUsuario'].setValue(this.empleadoEditar[0].numeroContactoEmergencia);
  }

  adjuntarHojaDeVida(event) {
    let AdjuntoHojaVida = event.target.files[0];
    if (AdjuntoHojaVida != null) {
      this.adjuntoHV = AdjuntoHojaVida;
      this.agregarHV();
    } else {
      this.adjuntoHV = null;
    };
  };

  adjuntarCertificados(event) {
    let AdjuntoCertificados = event.target.files[0];
    if (AdjuntoCertificados != null) {
      this.adjuntoCertificado = AdjuntoCertificados;
      this.agregarCertificados();
    } else {
      this.adjuntoCertificado = null;
    };
  };

  adjuntarDiplomas(event) {
    let AdjuntoDiplomas = event.target.files[0];
    console.log(AdjuntoDiplomas);
    if (AdjuntoDiplomas != null) {
      this.adjuntoDiplomas = AdjuntoDiplomas;
      this.agregarDiplomas();
    } else {
      this.adjuntoDiplomas = null;
    };
  };

  adjuntarHVcorporativa(event) {
    let AdjuntoHVcorporativa = event.target.files[0];
    if (AdjuntoHVcorporativa !== null) {
      this.adjuntoHVcorporativa = AdjuntoHVcorporativa;
      this.agregarHVCorporativa();
    }
    else {
      this.adjuntarHVcorporativa = null;
    };
  };

  async agregarHV() {
    let nombreArchivo = this.GenerarIdentificador() + '-' + this.adjuntoHV.name;
    let obj = {
      TipoDocumento: "Hoja de vida",
      EmpleadoId: this.empleadoEditar[0].id
    }
    await this.servicio.AgregarHojaDeVida(nombreArchivo, this.adjuntoHV).then(
      f => {
        f.file.getItem().then(item => {
          let idDocumento = item.Id;
          this.actualizarMetadatosHV(obj, idDocumento);
          // item.update(obj);               
        })
      }
    ).catch(
      (error) => {
        this.MensajeError('No se pudo cargar el archivo. Intente de nuevo')
      }
    );
  };

  async agregarCertificados() {
    let nombreArchivoCertificado = this.GenerarIdentificador() + '-' + this.adjuntoCertificado.name;
    let obj = {
      TipoDocumento: "Certificado",
      EmpleadoId: this.empleadoEditar[0].id
    }
    await this.servicio.AgregarCertificado(nombreArchivoCertificado, this.adjuntoCertificado).then(
      f => {
        f.file.getItem().then(item => {
          let idDocumento = item.Id;
          this.actualizarMetadatosCert(obj, idDocumento);
          // item.update(obj);               
        })
      }
    ).catch(
      (error) => {
        this.MensajeError('No se pudo cargar el archivo. Intente de nuevo')
      }
    );
  }

  async agregarDiplomas() {
    let nombreArchivoDiploma = this.GenerarIdentificador() + '-' + this.adjuntoDiplomas.name;
    let obj = {
      TipoDocumento: "Diploma",
      EmpleadoId: this.empleadoEditar[0].id
    }
    await this.servicio.AgregarDiploma(nombreArchivoDiploma, this.adjuntoDiplomas).then(
      f => {
        f.file.getItem().then(item => {
          let idDocumento = item.Id;
          this.actualizarMetadatoDiploma(obj, idDocumento);
          // item.update(obj);               
        })
      }
    ).catch(
      (error) => {
        this.MensajeError('No se pudo cargar el archivo. Intente de nuevo')
      }
    );
  }

  async agregarHVCorporativa() {
    let nombreArchivoHVcorp = this.GenerarIdentificador() + '-' + this.adjuntoHVcorporativa.name;
    let obj = {
      TipoDocumento: "Hoja de vida corporativa",
      EmpleadoId: this.empleadoEditar[0].id
    }
    await this.servicio.AgregarHojaCorporativa(nombreArchivoHVcorp, this.adjuntoHVcorporativa).then(
      f => {
        f.file.getItem().then(item => {
          let idDocumento = item.Id;
          this.actualizarMetadatoHVCorporativa(obj, idDocumento);
          // item.update(obj);               
        })
      }
    ).catch(
      (error) => {
        this.MensajeError('No se pudo cargar el archivo. Intente de nuevo')
      }
    );
  }

  actualizarMetadatosHV(obj, idDocumento) {
    this.servicio.ActualizarMetaDatosHV(obj, idDocumento).then(
      (res) => {
        this.MensajeInfo('La hoja de vida se cargó correctamente')
      }
    )
      .catch(
        (error) => {
          console.log(error);
        }
      )
  };

  actualizarMetadatosCert(obj, idDocumento) {
    this.servicio.ActualizarMetaDatosCertificado(obj, idDocumento).then(
      (res) => {
        this.MensajeInfo('El certificado se cargó correctamente')
      }
    )
      .catch(
        (error) => {
          console.log(error);
        }
      )
  }

  actualizarMetadatoDiploma(obj, idDocumento) {
    this.servicio.ActualizarMetaDatosDiploma(obj, idDocumento).then(
      (res) => {
        this.MensajeInfo('El Diploma se cargó correctamente')
      }
    )
      .catch(
        (error) => {
          console.log(error);
        }
      )
  }

  actualizarMetadatoHVCorporativa(obj, idDocumento) {
    this.servicio.ActualizarMetaDatosHVCorporativa(obj, idDocumento).then(
      (res) => {
        this.MensajeInfo('La hoja de vida corporativa se cargó correctamente')
      }
    )
      .catch(
        (error) => {
          console.log(error);
        }
      )
  }

  
  obtenerInfoEmpleado() {
    let idUsuario = this.usuarioActual.id;
    this.servicio.obtenerInfoEmpleadoSeleccionado(idUsuario).subscribe(
      (respuesta) => {
        this.empleadoEditar = Empleado.fromJsonList(respuesta);
        let infoEmpleado = this.empleadoEditar.find(x => x.id === idUsuario)
        if(infoEmpleado === undefined) {
          this.MensajeAdvertencia('Este usuario aún no tiene un perfil creado. Comuníqiuese con el  área de gestión humana.')
         setTimeout(() => {
          this.router.navigate(['/']);
         }, 2000);
        }
        this.valoresPorDefecto();
        console.log(this.empleadoEditar)
      }
    )
  };

  cancelar() {
    this.router.navigate(['/'])
  }

  onSubmit() {
    let id = this.empleadoEditar[0].id
    console.log(id); 
    let celular = this.editarEmpleadoFormUsuario.get('celularUsuario').value;
    let direccion = this.editarEmpleadoFormUsuario.get('direccionUsuario').value;
    let contactoEmergencia = this.editarEmpleadoFormUsuario.get('contactoEmergenciaUsuario').value;
    let numeroContacto = this.editarEmpleadoFormUsuario.get('telefonoContactoUsuario').value;
    let objEmpleado;

    objEmpleado = {
      Celular: celular,
      Direccion: direccion,
      ContactoEmergencia: contactoEmergencia,
      NumeroContactoEmergencia: numeroContacto
    }

    this.servicio.ActualizarInfoEmpleado(id, objEmpleado).then(
      (repuesta) => {
        this.MensajeExitoso('La información se actualizó con éxito');
        setTimeout(() => {
          this.router.navigate(['/'])
        }, 2000);
      }).catch(
        err => {
          this.MensajeError('error al guardar la solicitud')
        }
      )
  };

  MensajeExitoso(mensaje: string) {
    this.toastr.successToastr(mensaje, 'Confirmado!');
  };

  MensajeError(mensaje: string) {
    this.toastr.errorToastr(mensaje, 'Oops!');
  };

  MensajeAdvertencia(mensaje: string) {
    this.toastr.warningToastr(mensaje, 'Validación!');
  };

  MensajeInfo(mensaje: string) {
    this.toastr.infoToastr(mensaje, 'Info');
  };

}
