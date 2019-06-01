import { Component, OnInit } from '@angular/core';
import { SPServicio } from './servicios/sp-servicio';
import { Router } from '@angular/router';
import { Usuario } from './dominio/usuario';
import { Grupo } from './dominio/grupo';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  title = 'crear-editar-empleado';
  usuario: Usuario;
  nombreUsuario: string;
  grupos: Grupo[] = [];
  PermisosCrearRegistro: boolean;

  public ngOnInit() {
   this.ObtenerUsuarioActual();
  }
  
  constructor(private servicio: SPServicio, private router: Router) {
   this.PermisosCrearRegistro = false;

  }
  navegar() {
    this.router.navigate(["/crear-registro"]);
  }

  ObtenerUsuarioActual() {
    this.servicio.ObtenerUsuarioActual().subscribe(
      (respuesta) => {
        this.usuario = new Usuario(respuesta.Title, respuesta.email, respuesta.Id);
        this.nombreUsuario = this.usuario.nombre;
        sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
        this.servicio.ObtenerGruposUsuario(this.usuario.id).subscribe(
          (respuesta) => {
            this.grupos = Grupo.fromJsonList(respuesta);
            this.obtenerParametrosConfiguracion();
          }, err => {
            console.log('Error obteniendo grupos de usuario: ' + err);
          }
        )
      }, err => {
        console.log('Error obteniendo usuario: ' + err);
      }
    )
  }

  obtenerParametrosConfiguracion() {

  }  
}
