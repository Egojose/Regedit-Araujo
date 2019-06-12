import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearRegistroComponent } from './crear-registro/crear-registro.component';
import { EditarRegistroComponent } from './editar-registro/editar-registro.component';
import { VistaInicioComponent } from './vista-inicio/vista-inicio.component';
import { EditarVistaUsuarioComponent } from './editar-vista-usuario/editar-vista-usuario.component';

const routes: Routes = [
  {path:'',redirectTo:'app-root',pathMatch:'full'},
  {path:'vista-inicio', component:VistaInicioComponent},
  {path:'crear-registro' , component:CrearRegistroComponent},
  {path:'editar-registro', component:EditarRegistroComponent},
  {path:'editar-vista-usuario', component:EditarVistaUsuarioComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
