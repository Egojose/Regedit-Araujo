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

    public ObtenerConfiguracionServicios() {
        const configuracionSharepoint = pnp.sp.configure({
            headers: {
                "Accept": "application/json; odata=verbose"
            }
        }, environment.urlWebServ);

        return configuracionSharepoint;
    }

    public ObtenerConfiguracionConPost() {
        const configuracionSharepoint = pnp.sp.configure({
            headers: {
                "Accept": "application/json; odata=verbose",
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImllX3FXQ1hoWHh0MXpJRXN1NGM3YWNRVkduNCIsImtpZCI6ImllX3FXQ1hoWHh0MXpJRXN1NGM3YWNRVkduNCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYXJpYmFzYXMuc2hhcmVwb2ludC5jb21AM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwiaXNzIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsImlhdCI6MTU2NTg4NjQxMywibmJmIjoxNTY1ODg2NDEzLCJleHAiOjE1NjU5MTU1MTMsImlkZW50aXR5cHJvdmlkZXIiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwibmFtZWlkIjoiNDc1OWI1NjctMTk0ZC00MTlhLWE2MTctMmE4NzgzY2NjMmQxQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsIm9pZCI6ImJkN2YxM2MzLTEwMTQtNGY4ZC05ZTA4LWNmODJjNjFiY2Q0ZSIsInN1YiI6ImJkN2YxM2MzLTEwMTQtNGY4ZC05ZTA4LWNmODJjNjFiY2Q0ZSIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjoiZmFsc2UifQ.D39Wxyglgf082tNrmf17NnT_Lua8zqUXnBUNpXpxHdsnjyCFeKGOU9-61C-IL8MZwNeU3wxgKvpzaq9gpp_NtYI5TPn_-gtlzajUER7LCMgCld4H9Qio3MA2LyasSE5LLy6wNa39kEFyVBvOp8FNXFo7v9ZPPliILNHiDa6j-r_-C_jrYC-fdxKc9pMt8lX1SD11NHsTHesJcjr9_Qc08vgNUcc97xQnPGmybJICrhmUtaCev0cSuSrtgpF1wUy8nx5J0vUaG_D0FlKRmRDBmvuJlkUuF4P0CC9FRQ8SMhiwnqf03seYQaTZFYfgl2HtipPJNw-Jb7dFhIJIZZvDFg'
            }
        }, environment.urlWeb);

        return configuracionSharepoint;
    }

    public ObtenerConfiguracionConPost2() {
        const configuracionSharepoint = pnp.sp.configure({
            headers: {
                "Accept": "application/json; odata=verbose",
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkJCOENlRlZxeWFHckdOdWVoSklpTDRkZmp6dyIsImtpZCI6IkJCOENlRlZxeWFHckdOdWVoSklpTDRkZmp6dyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvZW5vdmVsc29sdWNpb25lcy5zaGFyZXBvaW50LmNvbUA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwiaWF0IjoxNTc2MDgzOTYxLCJuYmYiOjE1NzYwODM5NjEsImV4cCI6MTU3NjExMzA2MSwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJuYW1laWQiOiI5YzBhNTEyNS0zMDhhLTRiOTAtOWY2Mi00YzM3MWI2NDdlNDNAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwib2lkIjoiNGVhYjVlMDAtNzA2MS00OGVjLTg3ODItOGVhZmQzY2Y0MjJlIiwic3ViIjoiNGVhYjVlMDAtNzA2MS00OGVjLTg3ODItOGVhZmQzY2Y0MjJlIiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.iXGK8Bo4kuKoBhZoeTb69CCB0Bb3RnmWoQLWWFoa9U4U4ymDzt6nc3sXLx2mAS7WSWi-r7-DAHvCHhPmh2Ne8T6CBc8DmB8T0MpcxDGNl_Za5Lb3RNdWD5FWs4QWk2L5cF0_q1xatalkqC65U0tWUKc3lL_ayaSvDGSqHzek4p9Hh0L1X5w5MKoVADPkoO1Gi7R1Rgra_1NCm-hnliQjRa7gHSsUn8AUaOHASTtgR1N7xFS4gay9ka-2stS9QZ10g97yfPdjNJdlQb4a5574gJzuXCooKdkHvef9aezJwxUy421MA45YrKMWPwfXuZPGj_k0opcH6ko86FOkx1BKQg'
            }
        }, environment.urlRaiz);

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
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaEmpleados).items.add(ObjEmpleado)
    }

    obtenerCeCo() {
        let respuesta = from(this.ObtenerConfiguracionServicios().web.lists.getByTitle(environment.listaCentroCostos).items.get());
        return respuesta;
    }

    ActualizarInfoEmpleado(IdUsuario: number, objEmpleado) {
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaEmpleados).items.getById(IdUsuario).update(objEmpleado);
    }

    async ActualizarUrlEmpleado(IdUsuario: number, objEmpleado) {
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaEmpleados).items.getById(IdUsuario).update(objEmpleado);
    }

    ActualizarInfoEmpleadoGhumana(idEmpleado: number, objEmpleado) {
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaEmpleados).items.getById(idEmpleado).update(objEmpleado)
    }
    
    ActualizarUrl(IdUsuario: number, objEmpleado) {
        return this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaEmpleados).items.getById(IdUsuario).update(objEmpleado);
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

    obtenerUnidadNegocio() {
        let respuesta = this.ObtenerConfiguracionServicios().web.lists.getByTitle(environment.listaUnidadNegocios).items.get();
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

    async AgregarActa(nombre, archivo: File): Promise<any> {
        let mensaje = ""
        let respuesta = await this.ObtenerConfiguracion().web.getFolderByServerRelativeUrl("DocumentosEmpleados").files.add(nombre, archivo);
        return respuesta;
        
    }

    async AgregarAfiliacion(nombre, archivo: File): Promise<any> {
        let mensaje = ""
        let respuesta = await this.ObtenerConfiguracion().web.getFolderByServerRelativeUrl("DocumentosEmpleados").files.add(nombre, archivo);
        return respuesta;
        
    }

    async AgregarFirma(nombre, archivo: File): Promise<any> {
        let mensaje = ""
        let respuesta = await this.ObtenerConfiguracion().web.getFolderByServerRelativeUrl("Firmas").files.add(nombre, archivo);
        return respuesta;
        
    }

    async AgregarFoto(nombre, archivo: File): Promise<any> {
        let respuesta = await this.ObtenerConfiguracionConPost().web.getFolderByServerRelativeUrl('FotoEmpleado').files.add(nombre, archivo);
        return respuesta;
    };

    async AgregarContrato(nombre, archivo: File) : Promise<any> {
        let respuesta = await this.ObtenerConfiguracionConPost().web.getFolderByServerRelativeUrl('Contratos').files.add(nombre, archivo);
        return respuesta;
    };

    async AgregarDocPerfil(nombre, archivo: File): Promise<any> {
        let respuesta = await this.ObtenerConfiguracionConPost().web.getFolderByServerRelativeUrl('DocumentosPerfil').files.add(nombre, archivo);
        return respuesta;
    };

    async AgregarEstudios(nombre, archivo: File): Promise<any> {
        let respuesta = await this.ObtenerConfiguracionConPost().web.getFolderByServerRelativeUrl('CertificadosEstudios').files.add(nombre, archivo);
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

    ActualizarMetaDatosActas(obj, idDocumento){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle("DocumentosEmpleados").items.getById(idDocumento).update(obj);
        return respuesta;
    }

    ActualizarMetaDatosFirmas(obj, idDocumento){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle("Firmas").items.getById(idDocumento).update(obj);
        return respuesta;
    }

    ActualizarMetaDatosAfiliaciones(obj, idDocumento){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle("DocumentosEmpleados").items.getById(idDocumento).update(obj);
        return respuesta;
    }

    obtenerInfoEmpleadoSeleccionado(IdUsuario: number) {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaEmpleados).items.select("*").filter("usuarioId eq " + IdUsuario + "").get());
        return respuesta;
    }

    obtenerInfoEmpleadoUsuario(IdUsuario: number, IdEmpleado: number) {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaEmpleados).items.select("*").filter("ID eq " + IdUsuario + " and usuarioId eq " + IdEmpleado + "").get());
        return respuesta;
    }

    obtenerInfoEmpleados() {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaEmpleados).items.get());
        return respuesta;
    }

    obtenerDocumentos(IdEmpleado: number) {
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle("DocumentosEmpleados").items.select("ID", "Title", "TipoDocumento", "Empleado/Title", "Empleado/ID", "File").expand("File", "Empleado").filter("Empleado eq " + IdEmpleado + "").getAll();
        return respuesta;
    }

    borrarArchivo(IdArchivo: number){
        return this.ObtenerConfiguracion().web.lists.getByTitle("DocumentosEmpleados").items.getById(IdArchivo).delete();
    }

}