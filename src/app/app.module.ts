import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{  RouterModule } from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppComponent } from './app.component';
import { CrearRegistroComponent } from './crear-registro/crear-registro.component';
import { EditarRegistroComponent } from './editar-registro/editar-registro.component';
import { VistaInicioComponent } from './vista-inicio/vista-inicio.component';
import { SPServicio } from './servicios/sp-servicio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';
import { NgxCurrencyModule } from "ngx-currency";
import { EditarVistaUsuarioComponent } from './editar-vista-usuario/editar-vista-usuario.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { MatRadioModule, MatFormFieldModule, MatAutocompleteModule, MatOptionModule, MatInputModule, MatTableModule, MatListModule, MatToolbarModule, MatPaginatorModule, MatExpansionModule, MatDialogModule, MatSelectModule, MatCheckboxModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    CrearRegistroComponent,
    EditarRegistroComponent,
    VistaInicioComponent,
    EditarVistaUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Select2Module,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,ToastrModule.forRoot(),
    NgxCurrencyModule,
    AccordionModule.forRoot(),
    TypeaheadModule.forRoot(),
    MatFormFieldModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatInputModule,
    MatTableModule,
    MatListModule,
    MatToolbarModule, 
    MatPaginatorModule, 
    MatExpansionModule, 
    MatDialogModule, 
    MatSelectModule,
    MatRadioModule, 
    MatCheckboxModule
  ],
  providers: [SPServicio],
  bootstrap: [AppComponent]
})
export class AppModule { }
