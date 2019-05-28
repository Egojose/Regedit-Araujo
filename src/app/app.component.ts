import { Component } from '@angular/core';
import { SPServicio } from './servicios/sp-servicio';
import { Router } from '@angular/router';
import { Usuario } from './dominio/usuario';
import { Grupo } from './dominio/grupo'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crear-editar-empleado';
  
  constructor(private servicio: SPServicio, private router: Router) {
   

  }
  navegar() {
    this.router.navigate(["/crear-registro"]);
  }
}
