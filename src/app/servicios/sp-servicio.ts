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
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkhCeGw5bUFlNmd4YXZDa2NvT1UyVEhzRE5hMCIsImtpZCI6IkhCeGw5bUFlNmd4YXZDa2NvT1UyVEhzRE5hMCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvc3Bzbmlwcy5zaGFyZXBvaW50LmNvbUAzYWNkMjk0NS00N2U4LTRhNWMtOWM2OC0yOTM5NjkxMDllNGQiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwiaWF0IjoxNTU5NDAxMDI2LCJuYmYiOjE1NTk0MDEwMjYsImV4cCI6MTU1OTQzMDEyNiwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEAzYWNkMjk0NS00N2U4LTRhNWMtOWM2OC0yOTM5NjkxMDllNGQiLCJuYW1laWQiOiI1NzAxNWU4ZS0zZjc1LTQxZWUtOTc2Ni04MzA5OTA5MWY4MWJAM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwib2lkIjoiMjEzMGMxMTMtOTliNi00NmEyLWIzZDgtOWU2MzYwMDFmNjQ2Iiwic3ViIjoiMjEzMGMxMTMtOTliNi00NmEyLWIzZDgtOWU2MzYwMDFmNjQ2IiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.mwLIdmAUoi6zf-uLRjdpAkTB23KMCf_Wv6pJnly9mS-tKDx5UetO9VIlESx-kYWjONK3BH5n72WsoudwRA_b2rEFWCXTWY4atMEsTykhAbvzyUSGw6m-0sWSuEY65mUN9LcHfTUY3P8ryliJtg27zJsNAJ9s76sAXwp63-WTU5qBZTrtUUm1Nq0P-16C4ufWwJKxiY4kCZ8gXxQaHXJzHN7K5_3AQoz77zl6qGK9NOh7GeOBv7XvdfFxOYcxa04j31c1FQ4qoO4fBmOdHyceIvss4kaz7fPkKXlMP9cuKyzePKBbR7CA4pRXD4L9OH5ab-WsJ6bCpO8_M-4RQR2eTw'
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

    AgregarInfoEmpleado(ObjEmpleado){
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