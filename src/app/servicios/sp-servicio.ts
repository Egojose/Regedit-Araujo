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

    public ObtenerConfiguracionRaiz() {
        const configuracionSharepoint = pnp.sp.configure({
            headers: {
                "Accept": "application/json; odata=verbose"
            }
        }, environment.urlRaiz);

        return configuracionSharepoint;
    }

    public ObtenerConfiguracionConPost() {
        const configuracionSharepoint = pnp.sp.configure({
            headers: {
                "Accept": "application/json; odata=verbose",
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyIsImtpZCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYXJpYmFzYXMuc2hhcmVwb2ludC5jb21AM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwiaXNzIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsImlhdCI6MTU2MDE3NDUyMSwibmJmIjoxNTYwMTc0NTIxLCJleHAiOjE1NjAyMDM2MjEsImlkZW50aXR5cHJvdmlkZXIiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwibmFtZWlkIjoiNDc1OWI1NjctMTk0ZC00MTlhLWE2MTctMmE4NzgzY2NjMmQxQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsIm9pZCI6ImJkN2YxM2MzLTEwMTQtNGY4ZC05ZTA4LWNmODJjNjFiY2Q0ZSIsInN1YiI6ImJkN2YxM2MzLTEwMTQtNGY4ZC05ZTA4LWNmODJjNjFiY2Q0ZSIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjoiZmFsc2UifQ.ATpd9t-Ybe9mzhG-L09ouLCpSX1J1PXLn0harx25kRw3g-MyIc2U8NPZAs_nRgWrRExbj1Tf3ogMJb53wHXCmZok1BJ6TBpBS70ZWhBl25NmoVCxCPXWmq5RZanBvnPsotH6YrAolSHENmeC9xW4bE5F_CplIvHAqOJPvPuZ1nDxIaaQXRHGSk_NTmyeo3tiGp0hyjzYqWYktJbgcWVQVMhkMCD5I-xtV5HHvYIRo7BEYnNVNLBqPDhjw7oWPqt-VxmSH7scgSvt661cgQkmF9iBnAX9I8azvIkPmDgcD_LZDaVC6zpU5OIRYQXsIxEVuAt2UNz8mpdN7H88QnBVRw'
            }
        }, environment.urlWeb);

        return configuracionSharepoint;
    }

    ObtenerTodosLosUsuarios() {
        let respuesta = from(this.ObtenerConfiguracionRaiz().web.siteUsers.get());
        return respuesta;
    }

    ObtenerUsuarioActual() {
        let respuesta = from(this.ObtenerConfiguracionRaiz().web.currentUser.get());
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

    obtenerSedes() {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaSede).items.get());
        return respuesta;
    }

    obtenerArea() {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaArea).items.get());
        return respuesta;
    }

    obtenerCargo() {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaCargo).items.get());
        return respuesta;
    }

    // agregarAdjuntoHojaVida(IdUsuario: number, nombreArchivo: string, archivo: File) {
    //     let item = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaDocumentos).items.getById(IdUsuario);
    //     return item.attachmentFiles.add(nombreArchivo, archivo);
    // }

    AgregarHojaDeVida(objHojaDeVida){
        return this.ObtenerConfiguracionConPost().web.getFolderByServerRelativeUrl('https://aribasas.sharepoint.com/sites/Intranet/Gestion-humana/Documentos%20compartidos').folders.getByName('Hoja de vida').files.add
        // return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaDocumentos).items.add(ObjHojaDeVida)
    }

    obtenerInfoEmpleadoSeleccionado(IdUsuario: number) {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaEmpleados).items.select("*").filter("IdUsuario eq " + IdUsuario + "").get());
        return respuesta;
    }

    obtenerInfoEmpleados() {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaEmpleados).items.get());
        return respuesta;
    }

    // agregarAdjuntoCertificados(IdUsuario: number, nombreArchivo: string, archivo: File) {
    //     let item = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaContratos).items.getById(IdContrato);
    //     return item.attachmentFiles.add(nombreArchivo, archivo);
    // }

    // agregarAdjuntoDiplomas(IdUsuario: number, objDiploma) {
    //     let item = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaDocumentos).items.getById(IdUsuario);
    //     return item.attachmentFiles.add(nombreArchivo, archivo);
    // }


}