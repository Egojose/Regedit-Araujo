export class Empleado {
    constructor(
        public nombreCompleto: string,
        public usuario: any,
        public primerNombre: string,
        public segundoNombre: string,
        public primerApellido: string,
        public segundoApellido: string,
        public numeroDocumento: string,
        public tipoDocumento: string,
        public fechaIngreso: Date,
        public tipoContrato: string,
        public cargo: string,
        public salario: string,
        public lugarExpedicion: string,
        public salarioTexto: string,
        public area: string,
        public jefe: any,
        public direccion: string,
        public celular: string,
        public sede: string,
        public extension: string

    ) {}


    public static fromJson(element: any) {
        return new Empleado(
            element.Title,
            element.usuario,
            element.PrimerNombre,
            element.SegundoNombre,
            element.PrimerApellido,
            element.SegundoApellido,
            element.NumeroDocumento,
            element.TipoDocumento,
            element.FechaIngreso,
            element.TipoContrato,
            element.Cargo,
            element.Salario,
            element.LugarExpedicion,
            element.SalarioTexto,
            element.Area,
            element.Jefe,
            element.Direccion,
            element.Celular,
            element.Sede,
            element.Extension
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