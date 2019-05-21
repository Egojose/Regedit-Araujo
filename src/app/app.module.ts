import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{  RouterModule } from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppComponent } from './app.component';
import { CrearRegistroComponent } from './crear-registro/crear-registro.component';
import { EditarRegistroComponent } from './editar-registro/editar-registro.component';
import { VistaInicioComponent } from './vista-inicio/vista-inicio.component';
import { SPServicio } from './servicios/sp-servicio';


@NgModule({
  declarations: [
    AppComponent,
    CrearRegistroComponent,
    EditarRegistroComponent,
    VistaInicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SPServicio],
  bootstrap: [AppComponent]
})
export class AppModule { }
