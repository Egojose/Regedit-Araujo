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
  import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
  import { Ceco } from '../dominio/ceco';
  import * as CryptoJS from 'crypto-js'; 
  

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
  ceco: Ceco[] = [];
  emptyManager: boolean;
  adjuntoHV: any;
  adjuntoCertificado: any;
  adjuntoDiplomas: any;
  adjuntoHVcorporativa: any;
  adjuntoActa: any;
  adjuntoAfiliacion: any;
  adjuntoFirma: any;
  sede: Sede[] = [];
  area: Area[] = [];
  cargo: Cargo[] = [];
  empleado: Empleado;
  grupos: Grupo[] = [];  
  dataUsuarios = [];
  counter: number = 0;
  PermisosCrearRegistro: boolean;
  fechaFormato;
  dataSource;
  documentos: Documento[] = [];
  empty: boolean;
  idEmpleadoSeleccionado;
  show: boolean = true;
  urlHVCorporativa: any;
  dataCeco = [];
  selectedValue: string;
  selectedOption: any;
  actualizarCeco: boolean = false;
  encPassword: string;  
  decPassword:string;
  arrayIdiomas: any = [];
  arrayHerramientas: any = [];
  arrayCapacitar: any = [];
  fotoEmpleado: any;
  urlFotoEmpleado: any;
  docPerfil: any;
  urlDocPerfil: string = '';
  arrayPerfil: any = [];
  arrayEstudios: any = [];
  urlCertificados: string = '';
  docCertificados: any;
  disable: boolean = false;
  contrato: File;
  urlContrato: any;
  // ObjResponsable: any[] = [];

 
    constructor(private fB: FormBuilder, private servicio: SPServicio, private router: Router, public toastr: ToastrManager) { }
    displayedColumns: string[] = ['nombre', 'tipo', 'ver', 'eliminar'];

    ngOnInit() {
      this.registrarControles();
      this.obtenerUsuarios();
      this.ObtenerUsuarioActual();
      this.obtenerCeco();
      
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
        jefeAdicional: [''],
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
        funciones:[''],
        activo:[''],
        idioma: [''],
        porcentajeIdioma: [''],
        herramienta: [''],
        porcentajeHerramienta: [''],
        estudios: [''],
        perfil: [''],
        perfilDoc: [''],
        estudiosDoc: [''],
        gustos: [''],
        capacitar: [''],
        fechaNacimiento: ['', Validators.required],
        campoContrato: ['']
      });
    };

    onSelect(event: TypeaheadMatch): void {
      this.selectedOption = event.item;
      this.actualizarCeco = true;
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

    adjuntarFirmas(event) {
      let AdjuntoFirma = event.target.files[0];
      if (AdjuntoFirma !== null) {
        this.adjuntoFirma = AdjuntoFirma;
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

    agregarIdiomas() {
      if(this.editarEmpleadoForm.controls['idioma'].value === '' || this.editarEmpleadoForm.controls['porcentajeIdioma'].value === '') {
        this.MensajeAdvertencia('Debe especificar el idioma y el porcentaje de dominio');
        return false;
      }
      else {
        this.arrayIdiomas.push({idioma: this.editarEmpleadoForm.controls['idioma'].value, porcentaje: this.editarEmpleadoForm.controls['porcentajeIdioma'].value});
        this.editarEmpleadoForm.controls['idioma'].setValue('');
        this.editarEmpleadoForm.controls['porcentajeIdioma'].setValue('');
        console.log(JSON.stringify(this.arrayIdiomas));
      }
    };
  
    agregarHerramientas() {
      if(this.editarEmpleadoForm.controls['herramienta'].value === '' || this.editarEmpleadoForm.controls['porcentajeHerramienta'].value === '') {
        this.MensajeAdvertencia('Debe especificar la herramienta ofimática y el porcentaje de dominio');
        return false;
      }
      else {
        this.arrayHerramientas.push({herramienta: this.editarEmpleadoForm.controls['herramienta'].value, porcentaje: this.editarEmpleadoForm.controls['porcentajeHerramienta'].value});
        this.editarEmpleadoForm.controls['herramienta'].setValue('');
        this.editarEmpleadoForm.controls['porcentajeHerramienta'].setValue('');
        console.log(JSON.stringify(this.arrayHerramientas));
      }
    };
  
    borrar(element, index) {
      element.splice(index, 1)
    };
  
    adjuntarFoto($event) {
      let foto = $event.target.files[0];
      console.log(foto);
      if(foto !== null) {
        this.fotoEmpleado = foto;
        this.agragarFoto();
      }
      else {
        this.fotoEmpleado = null;
      }
    };

    adjuntarContrato($event) {
      let contrato = $event.target.files[0];
      let extension = $event.target.files[0].type;
      if(extension !== 'application/pdf') {
        this.MensajeAdvertencia('El contrato debe ser de tipo .pdf');
        this.editarEmpleadoForm.controls['campoContrato'].setValue('');
        return false;
      }
      else if(contrato !== null && extension === 'application/pdf') {
        this.contrato = contrato;
        this.agregarContrato();
      };
    };
  
   async cargarDocPerfil($event) {
      let documento = $event.target.files[0];
      if(documento !== null) {
        this.docPerfil = documento;
        await this.agregarDocPerfil();
      }
    };
  
    async cargarDocCertificado($event) {
      let documento = $event.target.files[0];
      this.docCertificados = documento;
      await this.agregarDocCertificado();
    }
  
    cargarDocTablaPerfil() {
      this.arrayPerfil.push({rol: this.editarEmpleadoForm.controls['perfil'].value, urlDocumento: this.urlDocPerfil});
      console.log(JSON.stringify(this.arrayPerfil));
    };
  
    corregir() {
      this.arrayPerfil = [];
      this.editarEmpleadoForm.controls['perfilDoc'].setValue('');
      this.urlDocPerfil = '';
      this.editarEmpleadoForm.controls['perfil'].setValue('');
      this.disable = false;
    }
  
    cargarDocTablaEstudios() {
      this.arrayEstudios.push({estudio: this.editarEmpleadoForm.controls['estudios'].value, urlCertificados: this.urlCertificados});
      this.editarEmpleadoForm.controls['estudiosDoc'].setValue('');
      this.urlCertificados = '';
      this.editarEmpleadoForm.controls['estudios'].setValue('');
      console.log(JSON.stringify(this.arrayEstudios))
    };
  
    cargarTablaCapacitar() {
      if(this.editarEmpleadoForm.controls['capacitar'].value === '') {
        this.MensajeAdvertencia('Debe agregar un topic en el que pueda capacitar');
        return false;
      }
      else {
        this.arrayCapacitar.push({ puedeCapacitar: this.editarEmpleadoForm.controls['capacitar'].value });
        this.editarEmpleadoForm.controls['capacitar'].setValue('');
        console.log(JSON.stringify(this.arrayCapacitar));
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
            let idUsuario = this.empleadoEditar[0].id;
            let url = f.data.ServerRelativeUrl
            let objUrl = {
             UrlHojadeVida: {
              "__metadata": { "type": "SP.FieldUrlValue" },
              "Description": "Url hoja de vida corporativa",
              "Url": url
             }
            }
            let idDocumento = item.Id;
            this.actualizarMetadatoHVCorporativa(obj, idDocumento);
            this.servicio.ActualizarUrl(idUsuario, objUrl);               
          })
        }
      ).catch(
        (error) => {
          this.MensajeError('No se pudo cargar el archivo. Intente de nuevo')
        }
      );
    }

    async agregarFirma() {
      let nombreFirma = this.GenerarIdentificador() + '-' + this.adjuntoFirma.name;
      let obj = {
        TipoDocumento: "Hoja de vida corporativa",
        EmpleadoId: this.empleadoEditar[0].id
      }
      await this.servicio.AgregarActa(nombreFirma, this.adjuntoFirma).then(
        f => {
          f.file.getItem().then(item => {
            let idUsuario = this.empleadoEditar[0].id;
            let url = f.data.ServerRelativeUrl
            let objUrl = {
             UrlFirma: {
              "__metadata": { "type": "SP.FieldUrlValue" },
              "Description": "Url hoja de vida corporativa",
              "Url": url
             }
            }
            let idDocumento = item.Id;
            this.actualizarMetadatoFirma(obj, idDocumento);
            this.servicio.ActualizarUrl(idUsuario, objUrl);               
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
          })
        }
      ).catch(
        (error) => {
          this.MensajeError('No se pudo cargar el archivo. Intente de nuevo')
        }
      );
    }

    async agragarFoto() {
      //  let nombre = this.empleadoEditar[0].nombreCompleto;
        this.servicio.AgregarFoto(this.fotoEmpleado.name, this.fotoEmpleado).then(
          f => {
            f.file.getItem().then(item => {
              this.urlFotoEmpleado = f.data.ServerRelativeUrl
            })
          }
        )
      };

      async agregarContrato() {
        this.servicio.AgregarContrato(this.contrato.name, this.contrato).then(
          f=> {
            f.file.getItem().then(item => {
              this.urlContrato = f.data.ServerRelativeUrl;
              console.log(this.urlContrato);
            })
          }
        )
      }

      async agregarDocPerfil() {
        await this.servicio.AgregarDocPerfil(this.docPerfil.name, this.docPerfil).then(
          f => {
            f.file.getItem().then(item => {
              this.urlDocPerfil = f.data.ServerRelativeUrl;
              this.disable = true;
              this.editarEmpleadoForm.controls['perfilDoc'].disable;
            })
          }
        )
        setTimeout(()=> {
          this.cargarDocTablaPerfil();
        }, 2000)
      };

      async agregarDocCertificado() {
        await this.servicio.AgregarEstudios(this.docCertificados.name, this.docCertificados).then(
          f => {
            f.file.getItem().then(item => {
              this.urlCertificados = f.data.ServerRelativeUrl
            })
          }
        )
      }
    
  
    actualizarMetadatosHV(obj, idDocumento) {
      this.servicio.ActualizarMetaDatosHV(obj, idDocumento).then(
        (res) => {
          this.MensajeInfo('La hoja de vida se cargó correctamente')
          this.obtenerDocumentos();
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
          this.obtenerDocumentos();
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
          this.obtenerDocumentos();
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
          this.obtenerDocumentos();
        }
      )
        .catch(
          (error) => {
            console.log(error);
          }
        )
    }

    actualizarMetadatoFirma(obj, idDocumento) {
      this.servicio.ActualizarMetaDatosFirmas(obj, idDocumento).then(
        (res) => {
          this.MensajeInfo('La hoja de vida corporativa se cargó correctamente')
          this.obtenerDocumentos();
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
          this.obtenerDocumentos();

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
          this.obtenerDocumentos();
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

    // SeleccionarUsuariosResp(Obj: Usuario){
    //   this.ObjResponsable.push(Obj); 
    //   // this.cantidadResp = this.ObjResponsable.length;
    //   // this.editarEmpleadoForm.controls["jefe"].setValue("");
    //   // this.editarEmpleadoForm.controls["jefe"].updateValueAndValidity();
    // }

    // EliminarResp(item){
    //   let index = this.ObjResponsable.findIndex((x)=> x.value === item.value);
    //   this.ObjResponsable.splice(index,1);
    // }

    SeleccionarId(event) {
     this.idEmpleadoSeleccionado = event.target.value;
      this.servicio.obtenerInfoEmpleadoSeleccionado(this.idEmpleadoSeleccionado).subscribe(
        (respuesta) => {
          console.log(respuesta);
          if(respuesta.length === 0) {
            this.MensajeAdvertencia('Este usuario aún no tiene un perfil creado. Debe crear el perfil antes de poder editar');
            this.limpiarCampos();
            setTimeout(() => {
              this.router.navigate(['/'])
            }, 6000);
          }
          else {
            this.empleadoEditar = Empleado.fromJsonList(respuesta);
            this.arrayCapacitar = [];
            this.arrayEstudios = [];
            this.valoresPorDefecto();
            this.obtenerDocumentos();
          }
        }
      ) 
    }

    obtenerDocumentos() {
      let algo = this.empleadoEditar[0]
      console.log(algo)
      let id = this.empleadoEditar[0].id;
      this.servicio.obtenerDocumentos(id).then(
        (respuesta) => {
          this.documentos = Documento.fromJsonList(respuesta);
          if(this.documentos.length > 0) {
            this.empty = false;
            this.dataSource = new MatTableDataSource(this.documentos)
          }
          else {
            // this.empty = true;
            this.dataSource = [];
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
      this.encPassword = '12ab'
      this.decPassword = '12ab'
      let fechaIngreso;
      let fechaSalida;
      let fechaCumpleanios;
      let salarioDecrypt;
      let salarioTextoDecrypt;
      let salarioIntegralDecrypt;
      if(this.empleadoEditar[0].salario === null || this.empleadoEditar[0].salarioTexto === null) {
        salarioDecrypt = ""
        salarioTextoDecrypt = ""
      } else {
        salarioDecrypt = CryptoJS.AES.decrypt(this.empleadoEditar[0].salario.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);
        salarioTextoDecrypt = CryptoJS.AES.decrypt(this.empleadoEditar[0].salarioTexto.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);
      }
      
      

      fechaIngreso = this.empleadoEditar[0].fechaIngreso !== null? new Date(this.empleadoEditar[0].fechaIngreso): "";
      fechaSalida = this.empleadoEditar[0].fechaSalida !== null? new Date(this.empleadoEditar[0].fechaSalida): "";
      fechaCumpleanios = this.empleadoEditar[0].fechaNacimiento !== null ? new Date(this.empleadoEditar[0].fechaNacimiento): "";

      let estudios = JSON.parse(this.empleadoEditar[0].estudiosRealizados);
      let capacitar = JSON.parse(this.empleadoEditar[0].capacitar);
      let perfil; 
      JSON.parse(this.empleadoEditar[0].perfilRol) !== '' ? perfil = JSON.parse(this.empleadoEditar[0].perfilRol) : perfil = [];
      console.log(perfil);
      if((perfil !== null) && perfil.length > 0) {
        this.editarEmpleadoForm.controls['perfil'].setValue(perfil[0].rol);
      }
      else {
        this.editarEmpleadoForm.controls['perfil'].setValue('');
      }
      if(estudios !== null) {
        estudios.map((x) => {
          this.arrayEstudios.push(x);
        });
      }
      if(capacitar !== null) {
        capacitar.map((x) => {
          this.arrayCapacitar.push(x);
        });
      }
      this.editarEmpleadoForm.controls['Nombre'].setValue(this.empleadoEditar[0].primerNombre);
      this.editarEmpleadoForm.controls['segundoNombre'].setValue(this.empleadoEditar[0].segundoNombre);
      this.editarEmpleadoForm.controls['primerApellido'].setValue(this.empleadoEditar[0].primerApellido);
      this.editarEmpleadoForm.controls['segundoApellido'].setValue(this.empleadoEditar[0].segundoApellido);
      this.editarEmpleadoForm.controls['numeroDocumento'].setValue(this.empleadoEditar[0].numeroDocumento);
      this.editarEmpleadoForm.controls['tipoDocumento'].setValue(this.empleadoEditar[0].tipoDocumento);
      this.editarEmpleadoForm.controls['fechaIngreso'].setValue(fechaIngreso);
      this.editarEmpleadoForm.controls['fechaSalida'].setValue(fechaSalida);
      this.editarEmpleadoForm.controls['fechaNacimiento'].setValue(fechaCumpleanios);
      this.editarEmpleadoForm.controls['tipoContrato'].setValue(this.empleadoEditar[0].tipoContrato);
      this.editarEmpleadoForm.controls['terminoContrato'].setValue(this.empleadoEditar[0].terminoContrato);
      this.editarEmpleadoForm.controls['cargo'].setValue(this.empleadoEditar[0].cargo);
      // this.editarEmpleadoForm.controls['salario'].setValue(this.empleadoEditar[0].salario);
      this.editarEmpleadoForm.controls['salario'].setValue(salarioDecrypt);
      this.editarEmpleadoForm.controls['lugarExpedicion'].setValue(this.empleadoEditar[0].lugarExpedicion);
      // this.editarEmpleadoForm.controls['salarioTexto'].setValue(this.empleadoEditar[0].salarioTexto);
      this.editarEmpleadoForm.controls['salarioTexto'].setValue(salarioTextoDecrypt);
      this.editarEmpleadoForm.controls['area'].setValue(this.empleadoEditar[0].area);
      this.editarEmpleadoForm.controls['jefe'].setValue(this.empleadoEditar[0].jefe);
      this.editarEmpleadoForm.controls['jefeAdicional'].setValue(this.empleadoEditar[0].jefeAdicional);
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
      this.editarEmpleadoForm.controls['ceco'].setValue(this.empleadoEditar[0].numeroCeco);
      this.empleadoEditar[0].funciones !== null ? this.editarEmpleadoForm.controls['funciones'].setValue(this.empleadoEditar[0].funciones.replace(/;/g, "\n")) : this.editarEmpleadoForm.controls['funciones'].setValue('');
      this.empleadoEditar[0].activo === true ? this.editarEmpleadoForm.controls['activo'].setValue('true') : this.editarEmpleadoForm.controls['activo'].setValue('false')
      this.editarEmpleadoForm.controls['gustos'].setValue(this.empleadoEditar[0].gustos);
      this.urlContrato = this.empleadoEditar[0].contrato;

      // this.editarEmpleadoForm.controls['activo'].setValue(this.empleadoEditar[0].activo);
    }

    limpiarCampos() {
      this.editarEmpleadoForm.controls['Nombre'].setValue("");
      this.editarEmpleadoForm.controls['segundoNombre'].setValue("");
      this.editarEmpleadoForm.controls['primerApellido'].setValue("");
      this.editarEmpleadoForm.controls['segundoApellido'].setValue("");
      this.editarEmpleadoForm.controls['numeroDocumento'].setValue("");
      this.editarEmpleadoForm.controls['tipoDocumento'].setValue("");
      this.editarEmpleadoForm.controls['fechaIngreso'].setValue("");
      this.editarEmpleadoForm.controls['fechaSalida'].setValue("");
      this.editarEmpleadoForm.controls['tipoContrato'].setValue("");
      this.editarEmpleadoForm.controls['terminoContrato'].setValue("");
      this.editarEmpleadoForm.controls['cargo'].setValue("");
      this.editarEmpleadoForm.controls['salario'].setValue("");
      this.editarEmpleadoForm.controls['lugarExpedicion'].setValue("");
      this.editarEmpleadoForm.controls['salarioTexto'].setValue("");
      this.editarEmpleadoForm.controls['area'].setValue("");
      this.editarEmpleadoForm.controls['jefe'].setValue("");
      this.editarEmpleadoForm.controls['jefeAdicional'].setValue("");
      this.editarEmpleadoForm.controls['direccion'].setValue("");
      this.editarEmpleadoForm.controls['celular'].setValue("");
      this.editarEmpleadoForm.controls['sede'].setValue("");
      this.editarEmpleadoForm.controls['extension'].setValue("");
      this.editarEmpleadoForm.controls['bono'].setValue("");
      this.editarEmpleadoForm.controls['bonoGasolina'].setValue("");
      this.editarEmpleadoForm.controls['afp'].setValue("");
      this.editarEmpleadoForm.controls['universidad'].setValue("");
      this.editarEmpleadoForm.controls['carrera'].setValue("");
      this.editarEmpleadoForm.controls['contactoEmergencia'].setValue("");
      this.editarEmpleadoForm.controls['numeroContactoEmergencia'].setValue("");
      this.editarEmpleadoForm.controls['grupoSanguineo'].setValue("");
      this.editarEmpleadoForm.controls['ceco'].setValue("");
      this.editarEmpleadoForm.controls['funciones'].setValue("");
      this.editarEmpleadoForm.controls['activo'].setValue("");
      this.editarEmpleadoForm.controls['gustos'].setValue("");
      this.editarEmpleadoForm.controls['perfil'].setValue('');
    }

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
          this.area = Area.fromJsonList(respuesta).sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
          this.obtenerCargo();
          
        });
    };
  
    obtenerCargo() {
      this.servicio.obtenerCargo().subscribe(
        (respuesta) => {
          this.cargo = Cargo.fromJsonList(respuesta).sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
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
          console.log(this.empleadoEditar);
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

      if(this.editarEmpleadoForm.get('fechaNacimiento').value === "") {
        this.MensajeAdvertencia('El campo Fecha de nacimiento es requerido');
        this.counter++;
      }
  
      if (this.counter > 0) {
        this.MensajeAdvertencia('Por favor diligencie los campos requeridos');
        return false;
      }
    }

    private AsignarFormatoFecha(FechaActividad: Date) {
      let diaActividadExtraordinaria = FechaActividad.getDate();
      let mesActividadExtraordinaria = FechaActividad.getMonth();
      let anoActividadExtraordinaria = FechaActividad.getFullYear();
      let hoy = new Date();
      let horas = FechaActividad.getHours() === 0 ? hoy.getHours() : FechaActividad.getHours();
      let minutos = FechaActividad.getMinutes() === 0 ? 1 : FechaActividad.getMinutes();
      let segundos = FechaActividad.getSeconds() === 0 ? 1 : FechaActividad.getSeconds();
      let fechaRetornar = new Date(anoActividadExtraordinaria, mesActividadExtraordinaria, diaActividadExtraordinaria, horas, minutos, segundos).toISOString();
      return fechaRetornar;
    }

    onSubmit() {
      this.validarVacios();
      // if (!this.validarVacios()) {
      //   return false;
      // }
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
      let dateFechaIngreso = new Date(fechaIngreso);
      fechaIngreso = this.AsignarFormatoFecha(dateFechaIngreso);
      let fechaSalida = this.editarEmpleadoForm.get('fechaSalida').value;
      if (fechaSalida !== "") {
        let dateFechaSalida = new Date(fechaSalida);
        fechaSalida = this.AsignarFormatoFecha(dateFechaSalida);
      } 
      else {
        fechaSalida = null;
      }     
      let tipoContrato = this.editarEmpleadoForm.get('tipoContrato').value;
      let terminoContrato = this.editarEmpleadoForm.get('terminoContrato').value;
      let cargo = this.editarEmpleadoForm.get('cargo').value;
      let salario = this.editarEmpleadoForm.get('salario').value;
      let lugarExpedicion = this.editarEmpleadoForm.get('lugarExpedicion').value;
      let salarioTexto = this.editarEmpleadoForm.get('salarioTexto').value;
      let area = this.editarEmpleadoForm.get('area').value;
      let jefe = this.editarEmpleadoForm.get('jefe').value;
      let jefeAdicional; 
      if(this.editarEmpleadoForm.get('jefeAdicional').value !== undefined && this.editarEmpleadoForm.get('jefeAdicional').value !== 'null') {
        jefeAdicional = this.editarEmpleadoForm.get('jefeAdicional').value
      }
      else {
        jefeAdicional = null
      }
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
      let salarioEncrypt =  CryptoJS.AES.encrypt(salarioString.trim(), this.encPassword.trim()).toString();
      let bonoString = `${bono}`;
      let afpString = `${afp}`;
      let bonoGasolinaString = `${bonoGasolina}`;
      let objEmpleado;
      let SumaSalarioIntegral;
      let salarioTextoEncrypt = CryptoJS.AES.encrypt(salarioTexto.trim(), this.encPassword.trim()).toString();
      let salarioIntegral;
      let nombreCeco;
      let numeroCeco
      let funcionesAll = this.editarEmpleadoForm.get('funciones').value;
      let funciones = funcionesAll.replace(/\n/g, ";");
      let activo = this.editarEmpleadoForm.get('activo').value 
      let jefes = [];
      // let herramientas = JSON.stringify(this.arrayHerramientas);
      // let idiomas = JSON.stringify(this.arrayIdiomas);
      let estudios = JSON.stringify(this.arrayEstudios);
      let perfil = JSON.stringify(this.arrayPerfil);
      let gustos = this.editarEmpleadoForm.controls['gustos'].value;
      let capacitar = JSON.stringify(this.arrayCapacitar);
      let contrato = this.urlContrato;
      let fechaNacimiento = this.editarEmpleadoForm.controls['fechaNacimiento'].value;

      // this.ObjResponsable.map((x)=> {
      //   jefes.push(x.value);
      // })

      let salarioIntegralEncrypt;
      if (this.actualizarCeco === true) {
        nombreCeco = this.selectedOption.value;
        numeroCeco = this.selectedOption.centro;
      }
      else {
        nombreCeco = this.empleadoEditar[0].ceco;
        numeroCeco = this.empleadoEditar[0].numeroCeco;
      }
      

      if (bono !== 0 || afp !== 0 || bonoGasolina !== 0) {
        SumaSalarioIntegral = salarioInteger + bonoInteger + afpInteger + bonoGasolinaInteger;
        salarioIntegral = `${SumaSalarioIntegral}`
        salarioIntegralEncrypt = CryptoJS.AES.encrypt(salarioIntegral.trim(), this.encPassword.trim()).toString();
      }
      else {
        salarioIntegralEncrypt = CryptoJS.AES.encrypt('0'.trim(), this.encPassword.trim()).toString();
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
        Salario: salarioEncrypt,
        lugarExpedicion: lugarExpedicion,
        salarioTexto: salarioTextoEncrypt,
        Area: area,
        JefeId: jefe,
        SegundoJefeId: jefeAdicional,
        // JefeId: {results: jefes},
        Direccion: direccion,
        Celular: celular,
        Sede: sede,
        Extension: extension,
        Bonos: bonoString,
        BonoGasolina: bonoGasolinaString,
        AFP: afpString,
        TerminoContrato: terminoContrato,
        Carrera: carrera,
        SalarioIntegral: salarioIntegralEncrypt,
        Universidad: universidad,
        ContactoEmergencia: contactoEmergencia,
        FechaSalida: fechaSalida,
        NumeroContactoEmergencia: numeroContactoEmergencia,
        GrupoSanguineo: grupoSanguineo,
        NombreCECO: nombreCeco,
        NumeroCECO: numeroCeco,
        Funciones: funciones,
        Activo: activo,FotoEmpleado: this.urlFotoEmpleado,
        EstudiosRealizados: estudios,
        // Idiomas: idiomas,
        GustosIntereses: gustos,
        // HerramientasOfimaticas: herramientas,
        PuedeCapacitar: capacitar,
        PerfilRol: perfil,
        UrlContrato: contrato,
        FechaNacimiento: fechaNacimiento
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
