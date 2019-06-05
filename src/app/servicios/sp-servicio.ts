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
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkhCeGw5bUFlNmd4YXZDa2NvT1UyVEhzRE5hMCIsImtpZCI6IkhCeGw5bUFlNmd4YXZDa2NvT1UyVEhzRE5hMCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYXJpYmFzYXMuc2hhcmVwb2ludC5jb21AM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwiaXNzIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsImlhdCI6MTU1OTY2MTE2MSwibmJmIjoxNTU5NjYxMTYxLCJleHAiOjE1NTk2OTAyNjEsImlkZW50aXR5cHJvdmlkZXIiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwibmFtZWlkIjoiNDc1OWI1NjctMTk0ZC00MTlhLWE2MTctMmE4NzgzY2NjMmQxQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsIm9pZCI6ImJkN2YxM2MzLTEwMTQtNGY4ZC05ZTA4LWNmODJjNjFiY2Q0ZSIsInN1YiI6ImJkN2YxM2MzLTEwMTQtNGY4ZC05ZTA4LWNmODJjNjFiY2Q0ZSIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjoiZmFsc2UifQ.UkK1xXjaX12b5sxyobnJ1QdzpT1WhqrCzUBvVn62DtlpDGciKDwmE_WtioUdGFHqWrkd14A9YPE6Hmd7TY5XR8dOH8XN-K8fIbNvajVeYOopODSCKSwWy7RB1GIx8Dj4dtt4BjeLVYaeKpTFLZOyiA4-yeqmsIpcAtNULepUukG5jVrEb5W-Ie1D_nW6u4lrTW1cWDbBsbYp56puMeewxcJ4DsRZE6NydQ4U3z-ngK-hh4U_dl7vWbvZXDj5qDYbfGtImASveSc5W4Nbd0SeyRREfghwKmyvnSPcsaT_FGjmqWQLDshaKT8sO8-j8F_VOrtMRK99-AC8kzM-0m4Q5Q'
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
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaEmpleados).items.add(ObjEmpleado)
    }

    ActualizarInfoEmpleado(idEmpleado: number, empleado: Empleado) {
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaEmpleados).items.getById(idEmpleado).update({});
    }

    ActualizarInfoEmpleadoGhumana(idEmpleado: number, empleado: Empleado) {
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaEmpleados).items.getById(idEmpleado).update({})
    }

    ObtenerGruposUsuario(usuarioId: number){
        let respuesta = from(this.ObtenerConfiguracion().web.getUserById(usuarioId).groups.get());
        return respuesta;
    }

    agregarAdjuntoHojaVida(IdUsuario: number, nombreArchivo: string, archivo: File) {
        let item = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaDocumentos).items.getById(IdUsuario);
        return item.attachmentFiles.add(nombreArchivo, archivo);
    }

    // agregarAdjuntoCertificados(IdUsuario: number, nombreArchivo: string, archivo: File) {
    //     let item = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaContratos).items.getById(IdContrato);
    //     return item.attachmentFiles.add(nombreArchivo, archivo);
    // }

    // agregarAdjuntoDiplomas(IdUsuario: number, nombreArchivo: string, archivo: File) {
    //     let item = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaContratos).items.getById(IdContrato);
    //     return item.attachmentFiles.add(nombreArchivo, archivo);
    // }


}