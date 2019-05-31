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
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkhCeGw5bUFlNmd4YXZDa2NvT1UyVEhzRE5hMCIsImtpZCI6IkhCeGw5bUFlNmd4YXZDa2NvT1UyVEhzRE5hMCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvc3Bzbmlwcy5zaGFyZXBvaW50LmNvbUAzYWNkMjk0NS00N2U4LTRhNWMtOWM2OC0yOTM5NjkxMDllNGQiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwiaWF0IjoxNTU5MjQyMjkyLCJuYmYiOjE1NTkyNDIyOTIsImV4cCI6MTU1OTI3MTM5MiwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEAzYWNkMjk0NS00N2U4LTRhNWMtOWM2OC0yOTM5NjkxMDllNGQiLCJuYW1laWQiOiI1NzAxNWU4ZS0zZjc1LTQxZWUtOTc2Ni04MzA5OTA5MWY4MWJAM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwib2lkIjoiMjEzMGMxMTMtOTliNi00NmEyLWIzZDgtOWU2MzYwMDFmNjQ2Iiwic3ViIjoiMjEzMGMxMTMtOTliNi00NmEyLWIzZDgtOWU2MzYwMDFmNjQ2IiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.obhP2uqQi7IFlaGg75QOMkrTrl2zNfKyBLDUwER0fu3zt0_iuku1oc-c5pdAExI9ggmJpmpg8cgFz4Qon5K5m6kDfwBR5GEJ_En7BNfec5vepNSYKY0MsBNwN6gBpUgItWnH8U3_BP8OxDPra1ohDUs5iYa6PGaJO1E2l8x2K1c1-1YNGBRpqB4_ucG6A2JPfUCrzYb4vM8LNIU9b1el5HY3HMhoevvywSN1dsFXiC2n1zYEP6tfLVT2v0649EDhMW6z6gPsa--eRj7t0yja07i0aXFWd9p2Xa9lLcSNr7fj-BTOd4NSI_kaSXrGJimo5ugo9luE63BtapOW2lyfnQ'
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