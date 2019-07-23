export class Ceco{
    constructor(public nombre: string, public ceco, public id: number) {}

    public static fromJson(element: any) {
        return new Ceco(element.Title, element.CentroCosto, element.ID);
    }

    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }
}