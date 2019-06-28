export class Documento {
    constructor(
      public id: number,
      public tipoDocumento: string,
      public nombreArchivo: string,
      public rutaArchivo: string
    ) {}


    public static fromJson(element: any) {
        return new Documento(
           element.ID,
           element.TipoDocumento,
           element.File.Name,
           element.File.ServerRelativeUrl

        )
    }

    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }
}