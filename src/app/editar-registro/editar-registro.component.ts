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
  import { Documento } from '../dominio/documento';
  import { MatTableDataSource } from '@angular/material';
  

  @Component({
    selector: 'app-editar-registro',
    templateUrl: './editar-registro.component.html',
    styleUrls: ['./editar-registro.component.css']
  })
  export class EditarRegistroComponent implements OnInit {
  editarEmpleadoForm: FormGroup;
  usuario: Usuario;
  usuarios: Usuario[] = [];
  usuarioActual: Usuario;
  empleadoEditar: Empleado[] = [];
  emptyManager: boolean;
  adjuntoHV: any;
  adjuntoCertificado: any;
  adjuntoDiplomas: any;
  adjuntoHVcorporativa: any;
  adjuntoActa: any;
  adjuntoAfiliacion: any;
  sede: Sede[] = [];
  area: Area[] = [];
  cargo: Cargo[] = [];
  empleado: Empleado;
  grupos: Grupo[] = [];  
  dataUsuarios = [
    {value: 'Seleccione', label : 'Seleccione'}
  ];
  counter: number = 0;
  PermisosCrearRegistro: boolean;
  fechaFormato;
  dataSource;
  documentos: Documento[] = [];
  empty: boolean;
  idEmpleadoSeleccionado;
  show: boolean = true;

 
    constructor(private fB: FormBuilder, private servicio: SPServicio, private router: Router, public toastr: ToastrManager) { }
    displayedColumns: string[] = ['nombre', 'tipo', 'ver', 'eliminar'];

    ngOnInit() {
      this.registrarControles();
      this.obtenerUsuarios();
      this.ObtenerUsuarioActual();
      
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
      console.log(AdjuntoHVcorporativa);
      if (AdjuntoHVcorporativa !== null) {
        this.adjuntoHVcorporativa = AdjuntoHVcorporativa;
        this.agregarHVCorporativa();
      }
      else {
        this.adjuntarHVcorporativa = null;
      };
    };

    adjuntarActas(event) {
      let AdjuntoActa = event.target.files[0];
      if (AdjuntoActa !== null) {
        this.adjuntoActa = AdjuntoActa;
        this.agregarActa();
      }
      else {
        this.adjuntarActas = null;
      };
    };

    adjuntarAfiliaciones(event) {
      let adjuntoAfiliacion = event.target.files[0];
      if (adjuntoAfiliacion !== null) {
        this.adjuntoAfiliacion = adjuntoAfiliacion;
        this.agregarAfiliacion();
      }
      else {
        this.adjuntarAfiliaciones = null;
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
      console.log(this.adjuntarHVcorporativa);
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

    async agregarActa() {
      let nombreArchivoActa = this.GenerarIdentificador() + '-' + this.adjuntoActa.name;
      let obj = {
        TipoDocumento: "Acta",
        EmpleadoId: this.empleadoEditar[0].id
      }
      await this.servicio.AgregarActa(nombreArchivoActa, this.adjuntoActa).then(
        f => {
          f.file.getItem().then(item => {
            let idDocumento = item.Id;
            this.actualizarMetadatoActas(obj, idDocumento);
            // item.update(obj);               
          })
        }
      ).catch(
        (error) => {
          this.MensajeError('No se pudo cargar el archivo. Intente de nuevo')
        }
      );
    }

    async agregarAfiliacion() {
      let nombreArchivoAfiliacion = this.GenerarIdentificador() + '-' + this.adjuntoAfiliacion.name;
      let obj = {
        TipoDocumento: "Afiliación",
        EmpleadoId: this.empleadoEditar[0].id
      }
      await this.servicio.AgregarAfiliacion(nombreArchivoAfiliacion, this.adjuntoAfiliacion).then(
        f => {
          f.file.getItem().then(item => {
            let idDocumento = item.Id;
            this.actualizarMetadatoAfiliaciones(obj, idDocumento);
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

    actualizarMetadatoActas(obj, idDocumento) {
      this.servicio.ActualizarMetaDatosActas(obj, idDocumento).then(
        (res) => {
          this.MensajeInfo('El acta se cargó correctamente')
        }
      )
        .catch(
          (error) => {
            console.log(error);
          }
        )
    }

    actualizarMetadatoAfiliaciones(obj, idDocumento) {
      this.servicio.ActualizarMetaDatosAfiliaciones(obj, idDocumento).then(
        (res) => {
          this.MensajeInfo('La afiliación se cargó correctamente')
        }
      )
        .catch(
          (error) => {
            console.log(error);
          }
        )
    }

    toggle(element) {
      this.show = !this.show;
    }  

    eliminarArchivos(element) {
      this.servicio.borrarArchivo(element.id).then(
        (respuesta) => {
          this.documentos = this.documentos.filter(x => x.id !== element.id);
          this.dataSource = this.documentos;
          this.MensajeExitoso('El archivo se ha eliminado')
        }, err => {
          console.log('Error al eliminar el archivo: ' + err);
        } 
      )
    }

    seleccionarUsuario(event) {
      if (event != "Seleccione") {
        this.emptyManager = false;
      } else {
        this.emptyManager = true;
        this.MensajeAdvertencia('Debe seleccionar un usuario');
      }
    }

    SeleccionarId(event) {
     this.idEmpleadoSeleccionado = event.target.value;
     console.log(this.idEmpleadoSeleccionado);
      this.servicio.obtenerInfoEmpleadoSeleccionado(this.idEmpleadoSeleccionado).subscribe(
        (respuesta) => {
          this.empleadoEditar = Empleado.fromJsonList(respuesta);
          this.valoresPorDefecto();
          this.obtenerDocumentos();
        }
      ) 
    }

    obtenerDocumentos() {
      let id = this.empleadoEditar[0].id;
     console.log(id);
      this.servicio.obtenerDocumentos(id).then(
        (respuesta) => {
          this.documentos = Documento.fromJsonList(respuesta);
          console.log(this.documentos);
          if(this.documentos.length > 0) {
            this.empty = false;
            this.dataSource = new MatTableDataSource(this.documentos)
            console.log(this.dataSource);
          }
          else {
            this.empty = true;
          }
        }
      ).catch(
        error => {
          console.log('Error obteniendo los documentos: ' + error);
        }
      )
    }

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    valoresPorDefecto() {
      let fechaIngreso;
      if(this.empleadoEditar[0].fechaIngreso === null) {
        fechaIngreso = null
      }
      else {
      let fechaI = this.empleadoEditar[0].fechaIngreso;
      let fecha1 = fechaI.split('-').toString();
      let fecha2 = fecha1.split('T');
      let fecha3 = fecha2[0].toString();
      let fecha4 = fecha3.split(',');
      fechaIngreso = (fecha4[2] + '/' + fecha4[1] + '/' + fecha4[0]);
      }
      let fechaSalida;
      if(this.empleadoEditar[0].fechaSalida === null) {
        fechaSalida = null;
      }
      else {
      let fechaS = this.empleadoEditar[0].fechaSalida;
      let fechaA = fechaS.split('-').toString();
      let fechaB = fechaA.split('T');
      let fechaC = fechaB[0].toString();
      let fechaD = fechaC.split(',');
      fechaSalida = (fechaD[2] + '/' + fechaD[1] + '/' + fechaD[0])
      }

      this.editarEmpleadoForm.controls['Nombre'].setValue(this.empleadoEditar[0].primerNombre);
      this.editarEmpleadoForm.controls['segundoNombre'].setValue(this.empleadoEditar[0].segundoNombre);
      this.editarEmpleadoForm.controls['primerApellido'].setValue(this.empleadoEditar[0].primerApellido);
      this.editarEmpleadoForm.controls['segundoApellido'].setValue(this.empleadoEditar[0].segundoApellido);
      this.editarEmpleadoForm.controls['numeroDocumento'].setValue(this.empleadoEditar[0].numeroDocumento);
      this.editarEmpleadoForm.controls['tipoDocumento'].setValue(this.empleadoEditar[0].tipoDocumento);
      this.editarEmpleadoForm.controls['fechaIngreso'].setValue(fechaIngreso);
      this.editarEmpleadoForm.controls['fechaSalida'].setValue(fechaSalida);
      this.editarEmpleadoForm.controls['tipoContrato'].setValue(this.empleadoEditar[0].tipoContrato);
      this.editarEmpleadoForm.controls['terminoContrato'].setValue(this.empleadoEditar[0].terminoContrato);
      this.editarEmpleadoForm.controls['cargo'].setValue(this.empleadoEditar[0].cargo);
      this.editarEmpleadoForm.controls['salario'].setValue(this.empleadoEditar[0].salario);
      this.editarEmpleadoForm.controls['lugarExpedicion'].setValue(this.empleadoEditar[0].lugarExpedicion);
      this.editarEmpleadoForm.controls['salarioTexto'].setValue(this.empleadoEditar[0].salarioTexto);
      this.editarEmpleadoForm.controls['area'].setValue(this.empleadoEditar[0].area);
      this.editarEmpleadoForm.controls['jefe'].setValue(this.empleadoEditar[0].jefe);
      this.editarEmpleadoForm.controls['direccion'].setValue(this.empleadoEditar[0].direccion);
      this.editarEmpleadoForm.controls['celular'].setValue(this.empleadoEditar[0].celular);
      this.editarEmpleadoForm.controls['sede'].setValue(this.empleadoEditar[0].sede);
      this.editarEmpleadoForm.controls['extension'].setValue(this.empleadoEditar[0].extension);
      this.editarEmpleadoForm.controls['bono'].setValue(this.empleadoEditar[0].bonos);
      this.editarEmpleadoForm.controls['bonoGasolina'].setValue(this.empleadoEditar[0].bonoGasolina);
      this.editarEmpleadoForm.controls['afp'].setValue(this.empleadoEditar[0].afp);
      this.editarEmpleadoForm.controls['universidad'].setValue(this.empleadoEditar[0].universidad);
      this.editarEmpleadoForm.controls['carrera'].setValue(this.empleadoEditar[0].carrera);
      this.editarEmpleadoForm.controls['contactoEmergencia'].setValue(this.empleadoEditar[0].contactoEmergencia);
      this.editarEmpleadoForm.controls['numeroContactoEmergencia'].setValue(this.empleadoEditar[0].numeroContactoEmergencia);
      this.editarEmpleadoForm.controls['grupoSanguineo'].setValue(this.empleadoEditar[0].grupoSanguineo);
    
    }

    private registrarControles() {
      this.editarEmpleadoForm = this.fB.group({
        usuario: ['', Validators.required],
        Nombre: ['', Validators.required],
        segundoNombre: [''],
        primerApellido: ['', Validators.required],
        segundoApellido: [''],
        numeroDocumento: ['', Validators.required],
        tipoDocumento: [''],
        fechaIngreso: ['', Validators.required],
        fechaSalida: [''],
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
        bonoGasolina: [''],
        afp: [''],
        universidad: [''],
        carrera: [''],
        contactoEmergencia: [''],
        numeroContactoEmergencia: [''],
        grupoSanguineo: ['']
      });
    };

    obtenerUsuarios() {
      let usuarioCampo = this.editarEmpleadoForm.get('usuario').value;
      console.log(usuarioCampo);
      this.servicio.ObtenerTodosLosUsuarios().subscribe(
        (respuesta) => {
          this.usuarios = Usuario.fromJsonList(respuesta);
          console.log(this.usuarios);
          this.DataSourceUsuarios();
        });
    };

    ObtenerUsuarioActual() {
      this.servicio.ObtenerUsuarioActual().subscribe(
        (Response) => {
          this.usuarioActual = new Usuario(Response.Title, Response.email, Response.Id);
          this.obtenerGrupos();
          this.obtenerSede(); 
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
          this.verificarPermisos();
        }, err => {
          console.log('Error obteniendo grupos de usuario: ' + err);
        }
      )
    };

    obtenerSede() { 
      this.servicio.obtenerSedes().subscribe(
      (respuesta) => {
        this.sede = Sede.fromJsonList(respuesta);
        this.obtenerArea();
      
      });
    };
    
    obtenerArea() {
      this.servicio.obtenerArea().subscribe(
        (respuesta) => {
          this.area = Area.fromJsonList(respuesta);
          this.obtenerCargo();
          
        });
    };
  
    obtenerCargo() {
      this.servicio.obtenerCargo().subscribe(
        (respuesta) => {
          this.cargo = Cargo.fromJsonList(respuesta);
        });
    };

    RecuperarUsuario() {
      this.usuarioActual = JSON.parse(sessionStorage.getItem('usuario'));
    };

    verificarPermisos() {
      let existeGrupoCrearEditarPerfilEmpleado = this.grupos.find(x => x.title === "CrearEditarPerfilEmpleado");
      if(existeGrupoCrearEditarPerfilEmpleado !== undefined) {
        this.PermisosCrearRegistro = true;
      }; 
    };

    private DataSourceUsuarios() {
      this.usuarios.forEach(usuario => {
        this.dataUsuarios.push({ value: usuario.id.toString(), label: usuario.nombre });
      });
    };

    obtenerInfoEmpleado() {
      let idUsuario = this.usuarioActual.id;
      this.servicio.obtenerInfoEmpleadoSeleccionado(idUsuario).subscribe(
        (respuesta) => {
          this.empleadoEditar = Empleado.fromJsonList(respuesta);
          this.obtenerSede();
          
        }
      )
    }

    GenerarIdentificador(): string {
      var fecha = new Date();
      var valorprimitivo = fecha.valueOf().toString();
      return valorprimitivo;
    }

    validarVacios() {
      this.counter = 0
  
      if (this.editarEmpleadoForm.get('usuario').value === "") {
        this.MensajeAdvertencia('El campo "Usuario" es requerido');
        this.counter++;
      }
  
      if (this.editarEmpleadoForm.get('Nombre').value === "") {
        this.MensajeAdvertencia('El campo "Primer Nombre" es requerido');
        this.counter++;
      }
  
  
      if (this.editarEmpleadoForm.get('primerApellido').value === "") {
        this.MensajeAdvertencia('El campo "Primer Apellido" es requerido');
        this.counter++;
      }
  
      if (this.editarEmpleadoForm.get('numeroDocumento').value === "") {
        this.MensajeAdvertencia('El campo "Número de documento" es requerido');
        this.counter++;
      }

      if(this.editarEmpleadoForm.get('jefe').value === "") {
        this.MensajeAdvertencia('El campo Jefe es requerido');
        this.counter++;
      }

      if(this.editarEmpleadoForm.get('fechaIngreso').value === "") {
        this.MensajeAdvertencia('El campo Fecha de ingreso es requerido');
        this.counter++;
      }
  
      if (this.counter > 0) {
        this.MensajeAdvertencia('Por favor diligencie los campos requeridos');
        return false;
      }
    }

    onSubmit() {
      this.validarVacios();
      let idUsuarioSeleccionado = this.empleadoEditar[0].id;
      console.log(idUsuarioSeleccionado);
      let usuario = this.editarEmpleadoForm.get('usuario').value;
      let primerNombre = this.editarEmpleadoForm.get('Nombre').value;
      let segundoNombre = this.editarEmpleadoForm.get('segundoNombre').value;
      let primerApellido = this.editarEmpleadoForm.get('primerApellido').value;
      let segundoApellido = this.editarEmpleadoForm.get('segundoApellido').value;
      let numeroDocumento = this.editarEmpleadoForm.get('numeroDocumento').value;
      let tipoDocumento = this.editarEmpleadoForm.get('tipoDocumento').value;
      let fechaIngreso = this.editarEmpleadoForm.get('fechaIngreso').value;
      let fechaSalida = this.editarEmpleadoForm.get('fechaSalida').value;
      let tipoContrato = this.editarEmpleadoForm.get('tipoContrato').value;
      let terminoContrato = this.editarEmpleadoForm.get('terminoContrato').value;
      let cargo = this.editarEmpleadoForm.get('cargo').value;
      let salario = this.editarEmpleadoForm.get('salario').value;
      let lugarExpedicion = this.editarEmpleadoForm.get('lugarExpedicion').value;
      let salarioTexto = this.editarEmpleadoForm.get('salarioTexto').value;
      let area = this.editarEmpleadoForm.get('area').value;
      let jefe = this.editarEmpleadoForm.get('jefe').value;
      let direccion = this.editarEmpleadoForm.get('direccion').value;
      let celular = this.editarEmpleadoForm.get('celular').value;
      let sede = this.editarEmpleadoForm.get('sede').value;
      let extension = this.editarEmpleadoForm.get('extension').value;
      let bono = this.editarEmpleadoForm.get('bono').value;
      let bonoGasolina = this.editarEmpleadoForm.get('bonoGasolina').value;
      let afp = this.editarEmpleadoForm.get('afp').value;
      let universidad = this.editarEmpleadoForm.get('universidad').value;
      let carrera = this.editarEmpleadoForm.get('carrera').value;
      let contactoEmergencia = this.editarEmpleadoForm.get('contactoEmergencia').value;
      let numeroContactoEmergencia = this.editarEmpleadoForm.get('numeroContactoEmergencia').value;
      let grupoSanguineo = this.editarEmpleadoForm.get('grupoSanguineo').value;
      let salarioInteger = parseInt(salario, 10);
      let bonoInteger = parseInt(bono, 10);
      let afpInteger = parseInt(afp, 10);
      let bonoGasolinaInteger = parseInt(bonoGasolina, 10);
      let salarioString = `${salario}`;
      let bonoString = `${bono}`;
      let afpString = `${afp}`;
      let bonoGasolinaString = `${bonoGasolina}`;
      let objEmpleado;
      let SumaSalarioIntegral;
      let salarioIntegral;

      if (tipoContrato === 'Integral' || tipoContrato === 'Ordinario') {
        SumaSalarioIntegral = salarioInteger + bonoInteger + afpInteger + bonoGasolinaInteger;
        salarioIntegral = `${SumaSalarioIntegral}`
      }
      else {
        salarioIntegral = "0";
      }

      objEmpleado = {
        usuarioId: usuario,
        PrimerNombre: primerNombre,
        SegundoNombre: segundoNombre,
        PrimerApellido: primerApellido,
        SegundoApellido: segundoApellido,
        NumeroDocumento: numeroDocumento,
        TipoContrato: tipoContrato,
        FechaIngreso: fechaIngreso,
        TipoDocumento: tipoDocumento,
        Cargo: cargo,
        Salario: salarioString,
        lugarExpedicion: lugarExpedicion,
        salarioTexto: salarioTexto,
        Area: area,
        JefeId: jefe,
        Direccion: direccion,
        Celular: celular,
        Sede: sede,
        Extension: extension,
        Bonos: bonoString,
        BonoGasolina: bonoGasolinaString,
        AFP: afpString,
        TerminoContrato: terminoContrato,
        Carrera: carrera,
        SalarioIntegral: salarioIntegral,
        Universidad: universidad,
        ContactoEmergencia: contactoEmergencia,
        FechaSalida: fechaSalida,
        NumeroContactoEmergencia: numeroContactoEmergencia,
        GrupoSanguineo: grupoSanguineo
      }
      if (this.editarEmpleadoForm.invalid) {
        this.MensajeAdvertencia('hay campos vacíos')
      }
      else {
      this.servicio.ActualizarInfoEmpleadoGhumana(idUsuarioSeleccionado, objEmpleado).then(
        (item: ItemAddResult) => {
          this.MensajeExitoso('La información se actualizó con éxtio')
          setTimeout(() => {
            this.router.navigate(['/'])
          }, 2000);
        }, err => {
          this.MensajeError('Error actualizando la información')
        }
      );
      }
    }

    cancelar() {
      this.router.navigate(['/'])
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
