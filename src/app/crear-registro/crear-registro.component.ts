import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SPServicio } from '../servicios/sp-servicio';
import { Empleado } from '../dominio/empleado';
import { Usuario } from '../dominio/usuario';
import { Router } from '@angular/router';
import { Sede } from '../dominio/sede';
import { Area } from '../dominio/area';
import { Cargo } from '../dominio/cargo';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Grupo } from '../dominio/grupo';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { Ceco } from '../dominio/ceco';
import * as CryptoJS from 'crypto-js'; 



@Component({
  selector: 'app-crear-registro',
  templateUrl: './crear-registro.component.html',
  styleUrls: ['./crear-registro.component.css']
})
export class CrearRegistroComponent implements OnInit {
  empleadoForm: FormGroup;
  ObjUsuarios: [];
  usuarios: Usuario[] = [];
  usuarioActual: Usuario;
  ceco: Ceco[] = []
  emptyManager: boolean;
  adjuntoHV: any;
  adjuntoCertificado: any;
  adjuntoDiplomas: any;
  adjuntoHVcorporativa: any;
  sede: Sede[] = [];
  area: Area[] = [];
  cargo: Cargo[] = [];
  grupos: Grupo[] = [];
  empleado: Empleado[] = []
  empleadoEditar: Empleado[] = [];
  tienePerfil: boolean;
  // valorUsuarioPorDefecto: string = "Seleccione";
  dataUsuarios = [];
  counter: number = 0;
  PermisosCrearRegistro: boolean;
  dataCeco = [];
  selectedValue: string;
  selectedOption: any;
  guardarCeco: boolean = false;
  salarioAEncriptar:string;
  salarioTextoAEcriptar: string;  
  encryptText: string;
  encPassword: string;  
  decPassword:string;
  salarioEncriptado: string;
  salarioTextoEncriptado: string;  
  conversionDecryptOutput:string;
  conversionDecryptOutput1: string; 
  encriptarSalarioIntegral: string;
  decriptarSalarioIntegral: string; 
  unidadNegocios: any;
 
  constructor(private fB: FormBuilder, private servicio: SPServicio, private router: Router, public toastr: ToastrManager) { }

  ngOnInit() {
    this.tienePerfil = false; 
    this.registrarControles();
    this.obtenerUsuarios();
    this.ObtenerUsuarioActual();
    this.obtenerCeco();
  };

  private registrarControles() {
    this.empleadoForm = this.fB.group({
      usuario: ['', Validators.required],
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      numeroDocumento: ['', Validators.required],
      tipoDocumento: [''],
      fechaIngreso: [''],
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
      grupoSanguineo: [''],
      ceco: [''],
      unidadNegocio:['']

    });
    this.emptyManager = true;
  };

  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
    this.guardarCeco = true;
  }

  obtenerCeco() {
    this.servicio.obtenerCeCo().subscribe(
      (respuesta) => {
        this.ceco = Ceco.fromJsonList(respuesta);
        this.DataSourceCecos();
      }
    )
  }

  private DataSourceCecos() {
    this.ceco.forEach(centroCostos => {
      this.dataCeco.push({ value: centroCostos.nombre, centro: centroCostos.ceco });
    });
  };

  obtenerUsuarios() {
    this.servicio.ObtenerTodosLosUsuarios().subscribe(
      (respuesta) => {
        this.usuarios = Usuario.fromJsonList(respuesta);
        this.DataSourceUsuarios();
      });
  };

  ObtenerUsuarioActual() {
    this.servicio.ObtenerUsuarioActual().subscribe(
      (Response) => {
        this.usuarioActual = new Usuario(Response.Title, Response.email, Response.Id);
        this.obtenerGrupos();
        this.obtenerArea();
        // console.log(this.usuarioActual.id);
      }, err => {
        console.log('Error obteniendo usuario: ' + err);
      }
    )
  };

  obtenerGrupos() {
    let idUsuario = this.usuarioActual.id;
    this.servicio.ObtenerGruposUsuario(idUsuario).subscribe(
      (respuesta) => {
        this.grupos = Grupo.fromJsonList(respuesta);
        this.verificarPermisos();
        this.obtenerSede();
        this.obtenerCargo();
        this.obtenerUnidadNegocio();
      }, err => {
        console.log('Error obteniendo grupos de usuario: ' + err);
      }
    )
  };

  obtenerUnidadNegocio() {
    this.servicio.obtenerUnidadNegocio().then(
      (respuesta) => {
        this.unidadNegocios = respuesta;
        console.log(respuesta);
      }
    ),error => {
      console.log(error)
    }
  }

  changeUnidad($event) {
    console.log($event);
    console.log(this.empleadoForm.get('unidadNegocio').value);
  }
  
  encriptar() {
      this.salarioAEncriptar = `${this.empleadoForm.get('salario').value}`;
      this.salarioTextoAEcriptar = this.empleadoForm.get('salarioTexto').value;
      this.encPassword = '12ab'
      this.decPassword = '12ab'
      this.salarioEncriptado = CryptoJS.AES.encrypt(this.salarioAEncriptar.trim(), this.encPassword.trim()).toString();
      this.salarioTextoEncriptado = CryptoJS.AES.encrypt(this.salarioTextoAEcriptar.trim(), this.encPassword.trim()).toString();
      // this.conversionDecryptOutput = CryptoJS.AES.decrypt(this.salarioEncriptado.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);
      // this.conversionDecryptOutput1 = CryptoJS.AES.decrypt(this.salarioTextoEncriptado.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);
    }

  verificarPermisos() {
    let existeGrupoCrearEditarPerfilEmpleado = this.grupos.find(x => x.title === "CrearEditarPerfilEmpleado");
    if (existeGrupoCrearEditarPerfilEmpleado !== undefined) {
      this.PermisosCrearRegistro = true;
    };
  };

  verificarUsuario($event) {
    alert('funciona')
    let idEmpleadoSeleccionado = $event.target.value;
    let existeUsuario = this.empleado.find(x => x.usuario === idEmpleadoSeleccionado);
    console.log(existeUsuario);
    if(existeUsuario !== undefined) {
      this.MensajeAdvertencia('Este usuario ya tiene un perfil creado')
      return false;
    }; 
  };

  obtenerInfoEmpleado($event) {
    let idUsuario = $event.target.value
    this.servicio.obtenerInfoEmpleadoSeleccionado(idUsuario).subscribe(
      (respuesta) => {
        this.empleadoEditar = Empleado.fromJsonList(respuesta);
        if(respuesta.length > 0) {
          this.tienePerfil = true;
          this.MensajeAdvertencia('Este usuario ya tiene un perfil creado. Si necesita cambiar algo debe hacerlo por el módulo de editar perfil')
          return false;
        }
      }
    )
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
        this.area = Area.fromJsonList(respuesta).sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
      });
  };

  obtenerCargo() {
    this.servicio.obtenerCargo().subscribe(
      (respuesta) => {
        this.cargo = Cargo.fromJsonList(respuesta).sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
      });
  };

  validarVacios() {
    this.counter = 0

    if (this.empleadoForm.get('usuario').value === "") {
      this.MensajeAdvertencia('El campo "Usuario" es requerido');
      this.counter++;
    }

    if (this.empleadoForm.get('primerNombre').value === "") {
      this.MensajeAdvertencia('El campo "Primer Nombre" es requerido');
      this.counter++;
    }


    if (this.empleadoForm.get('primerApellido').value === "") {
      this.MensajeAdvertencia('El campo "Primer Apellido" es requerido');
      this.counter++;
    }

    if (this.empleadoForm.get('numeroDocumento').value === "") {
      this.MensajeAdvertencia('El campo "Número de documento" es requerido');
      this.counter++;
    }

    if(this.empleadoForm.get('unidadNegocio').value === '') {
      this.MensajeAdvertencia('Por favor diligencie el campo Unidad de negocio');
      this.counter++;
    }

    if (this.counter > 0) {
      this.MensajeAdvertencia('Por favor diligencie los campos requeridos');
      return false;
    }
  }

  limpiarCampos() {
    this.empleadoForm.controls['Nombre'].setValue("");
    this.empleadoForm.controls['segundoNombre'].setValue("");
    this.empleadoForm.controls['primerApellido'].setValue("");
    this.empleadoForm.controls['segundoApellido'].setValue("");
    this.empleadoForm.controls['numeroDocumento'].setValue("");
    this.empleadoForm.controls['tipoDocumento'].setValue("");
    this.empleadoForm.controls['fechaIngreso'].setValue("");
    this.empleadoForm.controls['fechaSalida'].setValue("");
    this.empleadoForm.controls['tipoContrato'].setValue("");
    this.empleadoForm.controls['terminoContrato'].setValue("");
    this.empleadoForm.controls['cargo'].setValue("");
    this.empleadoForm.controls['salario'].setValue("");
    this.empleadoForm.controls['lugarExpedicion'].setValue("");
    this.empleadoForm.controls['salarioTexto'].setValue("");
    this.empleadoForm.controls['area'].setValue("");
    this.empleadoForm.controls['jefe'].setValue("");
    this.empleadoForm.controls['direccion'].setValue("");
    this.empleadoForm.controls['celular'].setValue("");
    this.empleadoForm.controls['sede'].setValue("");
    this.empleadoForm.controls['extension'].setValue("");
    this.empleadoForm.controls['bono'].setValue("");
    this.empleadoForm.controls['bonoGasolina'].setValue("");
    this.empleadoForm.controls['afp'].setValue("");
    this.empleadoForm.controls['universidad'].setValue("");
    this.empleadoForm.controls['carrera'].setValue("");
    this.empleadoForm.controls['contactoEmergencia'].setValue("");
    this.empleadoForm.controls['numeroContactoEmergencia'].setValue("");
    this.empleadoForm.controls['grupoSanguineo'].setValue("");
  }

  cancelar() {
    this.router.navigate(['/'])
  }

  onSubmit() {
    this.validarVacios();
    this. encriptar();
    console.log(this.empleadoForm)
    let usuario = this.empleadoForm.get('usuario').value;
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
    let salarioCript = this.salarioEncriptado;
    let salario = this.empleadoForm.get('salario').value;
    let luagarExpedicion = this.empleadoForm.get('lugarExpedicion').value;
    let salarioTextoCript = this.salarioTextoEncriptado;
    let salarioTexto = this.empleadoForm.get('salarioTexto').value;
    let area = this.empleadoForm.get('area').value;
    let jefe = this.empleadoForm.get('jefe').value;
    let direccion = this.empleadoForm.get('direccion').value;
    let celular = this.empleadoForm.get('celular').value;
    let sede = this.empleadoForm.get('sede').value;
    let extension = this.empleadoForm.get('extension').value;
    let bono = this.empleadoForm.get('bono').value;
    let bonoGasolina = this.empleadoForm.get('bonoGasolina').value;
    let afp = this.empleadoForm.get('afp').value;
    let universidad = this.empleadoForm.get('universidad').value;
    let carrera = this.empleadoForm.get('carrera').value;
    let contactoEmergencia = this.empleadoForm.get('contactoEmergencia').value;
    let numeroContactoEmergencia = this.empleadoForm.get('numeroContactoEmergencia').value;
    let grupoSanguineo = this.empleadoForm.get('grupoSanguineo').value;
    let objEmpleado;
    let salarioIntegral;
    let SumaSalarioIntegral;
    let salarioInteger = parseInt(salario, 10);
    let bonoInteger = parseInt(bono, 10);
    let afpInteger = parseInt(afp, 10);
    let bonoGasolinaInteger = parseInt(bonoGasolina, 10);
    let nombreEmpleado;
    let objHojaDeVida;
    // let salarioString = `${salario}`;
    let bonoString = `${bono}`;
    let afpString = `${afp}`;
    let bonoGasolinaString = `${bonoGasolina}`;
    let nombreCeco;
    let numeroCeco;
    let unidadNegocio = this.empleadoForm.get('unidadNegocio').value;
    

    if(this.guardarCeco === true) {
      nombreCeco = this.selectedOption.value;
      numeroCeco = this.selectedOption.centro;
    }
    else {
      nombreCeco = "";
      numeroCeco = "";
    }

    if (bono !== 0 || afp !== 0 || bonoGasolina !== 0) {
      SumaSalarioIntegral = salarioInteger + bonoInteger + afpInteger + bonoGasolinaInteger;
      salarioIntegral = `${SumaSalarioIntegral}`
      this.encriptarSalarioIntegral = CryptoJS.AES.encrypt(salarioIntegral.trim(), this.encPassword.trim()).toString();
      // salariodecript = CryptoJS.AES.decrypt(this.encriptarSalarioIntegral.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);
    }
    else {
      this.encriptarSalarioIntegral  = CryptoJS.AES.encrypt('0'.trim(), this.encPassword.trim()).toString();
    }

    if (terminoContrato === 'Fijo') {
      fechaSalida = fechaSalida;
    }
    else {
      fechaSalida = null;
    }

    nombreEmpleado = primerNombre + ' ' + segundoNombre + ' ' + primerApellido + ' ' + segundoApellido

    objEmpleado = {
      usuarioId: usuario,
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
      Salario: salarioCript,
      lugarExpedicion: luagarExpedicion,
      salarioTexto: salarioTextoCript,
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
      Universidad: universidad,
      SalarioIntegral: this.encriptarSalarioIntegral,
      ContactoEmergencia: contactoEmergencia,
      NumeroContactoEmergencia: numeroContactoEmergencia,
      GrupoSanguineo: grupoSanguineo,
      IdUsuario: usuario,
      NombreCECO: nombreCeco,
      NumeroCECO: numeroCeco,
      UnidadNegocio: unidadNegocio
    }

    objHojaDeVida = {
      TipoDocumento: 'Hoja de vida',
      Empleado: nombreEmpleado,
      Title: this.adjuntoHV
    }

    if(this.tienePerfil === true) {
      this.MensajeAdvertencia('Recuerde que este usuario ya tiene un perfil. Para ediarlo por favor use el módulo de editar perfil');
      this.limpiarCampos();
      return false;
    }

    if (this.empleadoForm.invalid) {
      this.MensajeAdvertencia('hay campos vacíos')
    }
    else {
      this.servicio.AgregarInfoEmpleado(objEmpleado).then(
        (result) => {
          this.MensajeExitoso("El registro se ha creado con éxito")
          setTimeout(() => {
            this.router.navigate(['/'])
          }, 2000);
        }
      ).catch(
        err => {
          this.MensajeError('error al guardar la solicitud')
        }
      );
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

  async agregarHV() {
    let obj = {
      TipoDocumento: "Hoja de vida",
      EmpleadoId: this.empleado[0].id
    }
    await this.servicio.AgregarHojaDeVida(this.adjuntoHV.name, this.adjuntoHV).then(
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
    let obj = {
      TipoDocumento: "Certificado",
      EmpleadoId: this.empleado[0].id
    }
    await this.servicio.AgregarCertificado(this.adjuntoCertificado.name, this.adjuntoCertificado).then(
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
    let obj = {
      TipoDocumento: "Diploma",
      EmpleadoId: this.empleado[0].id
    }
    await this.servicio.AgregarDiploma(this.adjuntoDiplomas.name, this.adjuntoDiplomas).then(
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
    let obj = {
      TipoDocumento: "Hoja de vida corporativa",
      EmpleadoId: this.empleado[0].id
    }
    await this.servicio.AgregarHojaCorporativa(this.adjuntoHVcorporativa.name, this.adjuntoHVcorporativa).then(
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
    ).catch(
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
    ).catch(
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
    ).catch(
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
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }
}
