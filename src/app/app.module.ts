import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{  RouterModule } from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearRegistroComponent } from './crear-registro/crear-registro.component';
import { EditarRegistroComponent } from './editar-registro/editar-registro.component';
import { VistaInicioComponent } from './vista-inicio/vista-inicio.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
