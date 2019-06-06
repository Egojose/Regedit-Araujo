  import { Component, OnInit } from '@angular/core';
  import { FormGroup, FormBuilder, Validators } from '@angular/forms';
  import { SPServicio } from '../servicios/sp-servicio';
  import { Usuario } from '../dominio/usuario';
  import { Router } from '@angular/router';
  import { ToastrManager } from 'ng6-toastr-notifications';
  import { Form } from 'sp-pnp-js/lib/sharepoint/forms';
  import { Sede } from '../dominio/sede';
  import { Area } from '../dominio/area';
  import { Cargo } from '../dominio/cargo';
  import { ItemAddResult } from 'sp-pnp-js';

  @Component({
    selector: 'app-editar-registro',
    templateUrl: './editar-registro.component.html',
    styleUrls: ['./editar-registro.component.css']
  })
  export class EditarRegistroComponent implements OnInit {
  editarEmpleadoForm: FormGroup;
  usuario: Usuario;
  usuarioActual: Usuario;
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

  }
