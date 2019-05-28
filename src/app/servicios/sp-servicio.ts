import { environment } from "src/environments/environment.prod";
import { default as pnp } from 'sp-pnp-js';
import { Injectable } from "@angular/core";
import { from } from 'rxjs'; 
import { Empleado } from '../dominio/empleado';



@Injectable()

export class SPServicio {
    constructor() {}

    public ObtenerConfiguracion() {
        const configuracionSharepoint = pnp.sp.configure({
            headers: {
                "Accept": "application/json; odata=verbose"
            }
        }, environment.urlWeb);

        return configuracionSharepoint;
    }

    public ObtenerConfiguracionConPost() {
        const configuracionSharepoint = pnp.sp.configure({
            headers: {
                "Accept": "application/json; odata=verbose",
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkhCeGw5bUFlNmd4YXZDa2NvT1UyVEhzRE5hMCIsImtpZCI6IkhCeGw5bUFlNmd4YXZDa2NvT1UyVEhzRE5hMCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvZW5vdmVsc29sdWNpb25lcy5zaGFyZXBvaW50LmNvbUA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwiaWF0IjoxNTU3NTEyMzQ2LCJuYmYiOjE1NTc1MTIzNDYsImV4cCI6MTU1NzU0MTQ0NiwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJuYW1laWQiOiI2NTQ4ZDEyMS1jMDUxLTQ3YTEtYWYyYi1lZmRlYzVmOTllNGNAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwib2lkIjoiOGY4NjgwNDUtN2VlZS00Mzc0LWEyZjEtMzA3OTIzODcwYWM3Iiwic3ViIjoiOGY4NjgwNDUtN2VlZS00Mzc0LWEyZjEtMzA3OTIzODcwYWM3IiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.zTb9MKATGqcrgeeZAo14vmdpa4MxvmF_mXWRSZIqsYH8SmtIckfHs6t3xh2yNP2PKZTGLPJsp7zn_Ww9xiLNvD31W7Z1h6sq0einjwXF9lkF5vNXFj-UKNTzzBMLHUwTSVsLyH_savg1lNavzis0VVrtTPuMJWxQImI_BTELTlB_afjKjrtUksMNId6GuyECH8B4wLzW9wnBGN9uZuYTcnkxHIq0ry3HIcRw6vmgTQL4hQcM2BiX6NoloiTiIqR2VoUD8xwrcaXTxXhmdhQr0noqx2Pgf8Vr-aN92DAabqoqDwLYRsI3sD22Txd9UWjZ1xAQkGzP4iCe9_TI0M03zw'
            }
        }, environment.urlWeb);

        return configuracionSharepoint;
    }

    ObtenerTodosLosUsuarios() {
        let respuesta = from(this.ObtenerConfiguracion().web.siteUsers.get());
        return respuesta;
    }

    ObtenerUsuarioActual() {
        let respuesta = from(this.ObtenerConfiguracion().web.currentUser.get());
        return respuesta;
    }

    ObtenerUsuarioPorEmail(email : string){
        let respuesta = from(this.ObtenerConfiguracion().web.siteUsers.getByEmail(email).get());
        return respuesta;
    }

    AgregarInfoEmpleado(empleado: Empleado, ObjEmpleado){
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaEmpleados).items.add(ObjEmpleado)
    }

    ActualizarInfoEmpleado(idEmpleado: number, empleado: Empleado) {
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaEmpleados).items.getById(idEmpleado).update({});
    }

    ActualizarInfoEmpleadoGhumana(idEmpleado: number, empleado: Empleado) {
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaEmpleados).items.getById(idEmpleado).update({})
    }

    ObtenerGruposUsuario(usuarioId: number){
        let respuesta = from(this.ObtenerConfiguracion().web.getUserById(usuarioId).groups.get());
        return respuesta;
    }


}