import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearRegistroComponent } from './crear-registro/crear-registro.component';
import { EditarRegistroComponent } from './editar-registro/editar-registro.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path:'',redirectTo:'/vista-inicio',pathMatch:'full'},
      {path:'crear-registro' , component:CrearRegistroComponent},
      {path:'editar-registro', component:EditarRegistroComponent}
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
