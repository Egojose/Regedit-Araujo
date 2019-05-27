import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-crear-registro',
  templateUrl: './crear-registro.component.html',
  styleUrls: ['./crear-registro.component.css']
})
export class CrearRegistroComponent implements OnInit {
empleadoForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
