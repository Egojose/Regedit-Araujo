import { environment } from "src/environments/environment.prod";
import { default as pnp, Web } from 'sp-pnp-js';
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
        }, environment.urlWeb);

        return configuracionSharepoint;
    }

    public ObtenerConfiguracionConPost() {
        const configuracionSharepoint = pnp.sp.configure({
            headers: {
                "Accept": "application/json; odata=verbose",
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyIsImtpZCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYXJpYmFzYXMuc2hhcmVwb2ludC5jb21AM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwiaXNzIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsImlhdCI6MTU2MDQ4MTU5NSwibmJmIjoxNTYwNDgxNTk1LCJleHAiOjE1NjA1MTA2OTUsImlkZW50aXR5cHJvdmlkZXIiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwibmFtZWlkIjoiNDc1OWI1NjctMTk0ZC00MTlhLWE2MTctMmE4NzgzY2NjMmQxQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsIm9pZCI6ImJkN2YxM2MzLTEwMTQtNGY4ZC05ZTA4LWNmODJjNjFiY2Q0ZSIsInN1YiI6ImJkN2YxM2MzLTEwMTQtNGY4ZC05ZTA4LWNmODJjNjFiY2Q0ZSIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjoiZmFsc2UifQ.BuQSGNcV9gNVpg2ehqR_s_zCoiG7FX4Mf-Mmc3mVelRnBgaFJCAqdb73WM2akazh4UQcLlQ00N6vUO3dWyyGG5nGsS2EYMFcYZmoruJk5TDzF5zkYeZ73snV1nbRauJC1i74l_RTW0AhtRLhXIStuqDYdBTjKG4GzT4itUOlf4iNJykg0YHgN32dMcTH1bC2z6OK1t8XhczRfbk8RFqQTxOxoMJVUdgyUfeGKE71HB_6erBKcJ2x0qbTXya7-nluYUA0VKb_YJ1jBqnzRxalYW-Wu9tf0Km5Oof4kCYGqmgigiX5vNL0HsRp5RiMp6B6MJIoBxuXve5H0nNfInXYcg'
            }
        }, environment.urlWeb);

        return configuracionSharepoint;
    }

    public ObtenerConfiguracionConPost2() {
        const configuracionSharepoint = pnp.sp.configure({
            headers: {
                "Accept": "application/json; odata=verbose",
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyIsImtpZCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYXJpYmFzYXMuc2hhcmVwb2ludC5jb21AM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwiaXNzIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsImlhdCI6MTU2MDI5MDY0OSwibmJmIjoxNTYwMjkwNjQ5LCJleHAiOjE1NjAzMTk3NDksImlkZW50aXR5cHJvdmlkZXIiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwibmFtZWlkIjoiNDc1OWI1NjctMTk0ZC00MTlhLWE2MTctMmE4NzgzY2NjMmQxQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsIm9pZCI6ImJkN2YxM2MzLTEwMTQtNGY4ZC05ZTA4LWNmODJjNjFiY2Q0ZSIsInN1YiI6ImJkN2YxM2MzLTEwMTQtNGY4ZC05ZTA4LWNmODJjNjFiY2Q0ZSIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjoiZmFsc2UifQ.QdVxUC4Pq6vi1QrW-dpYs-8dR0xsU0QTjO5yxhntgVnIWeZthZItMXirSplSX5Z0NfSSV7-phZQmw90Fza7Gd9bO-A4ZMmto7xHfKglbybldcQJit9tRONxAY7a5JkOV-fceGUFV5G1UqSXqFdntLytbK9rGvx-cD95yIFcvjwGlBYnEeeqaLJZ_UoyG76pT4uqXjS-ubmKd6jH34Ht85UTioR97ymc4xWAVt0Tql6ct7F8XuN8_GVfxAW5TfC3Cf1O3kYPz2UvOeNNbz7se2EfXrfILUS7TCwsOjQ_1R1x6UdOPItzeAuUgHj4RiFShSvwKfRVdWivy6pzb5kxFWA'
            }
        }, environment.urlRaiz);

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

    ActualizarInfoEmpleado(IdUsuario: number, objEmpleado) {
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaEmpleados).items.getById(IdUsuario).update(objEmpleado);
    }

    ActualizarInfoEmpleadoGhumana(idEmpleado: number, objEmpleado) {
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaEmpleados).items.getById(idEmpleado).update(objEmpleado)
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

    async AgregarHojaDeVida(nombre, archivo: File): Promise<any> {
        let mensaje = ""
        let respuesta = await this.ObtenerConfiguracion().web.getFolderByServerRelativeUrl("DocumentosEmpleados").files.add(nombre, archivo);
        return respuesta;
        
    }

    async AgregarHojaCorporativa(nombre, archivo: File): Promise<any> {
        let mensaje = ""
        let respuesta = await this.ObtenerConfiguracion().web.getFolderByServerRelativeUrl("DocumentosEmpleados").files.add(nombre, archivo);
        return respuesta;
        
    }

    async AgregarCertificado(nombre, archivo: File): Promise<any> {
        let mensaje = ""
        let respuesta = await this.ObtenerConfiguracion().web.getFolderByServerRelativeUrl("DocumentosEmpleados").files.add(nombre, archivo);
        return respuesta;
        
    }

    async AgregarDiploma(nombre, archivo: File): Promise<any> {
        let mensaje = ""
        let respuesta = await this.ObtenerConfiguracion().web.getFolderByServerRelativeUrl("DocumentosEmpleados").files.add(nombre, archivo);
        return respuesta;
        
    }
    
    ActualizarMetaDatosHV(obj, idDocumento){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle("DocumentosEmpleados").items.getById(idDocumento).update(obj);
        return respuesta;
    }

    ActualizarMetaDatosHVCorporativa(obj, idDocumento){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle("DocumentosEmpleados").items.getById(idDocumento).update(obj);
        return respuesta;
    }

    ActualizarMetaDatosCertificado(obj, idDocumento){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle("DocumentosEmpleados").items.getById(idDocumento).update(obj);
        return respuesta;
    }

    ActualizarMetaDatosDiploma(obj, idDocumento){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle("DocumentosEmpleados").items.getById(idDocumento).update(obj);
        return respuesta;
    }

    obtenerInfoEmpleadoSeleccionado(IdUsuario: number) {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaEmpleados).items.select("*").filter("usuarioId eq " + IdUsuario + "").get());
        return respuesta;
    }

    obtenerInfoEmpleados() {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaEmpleados).items.get());
        return respuesta;
    }


}