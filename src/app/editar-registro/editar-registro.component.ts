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
  editarEmpleadoForm: Form;
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
    }

    private registrarControles () {

    }

  }
