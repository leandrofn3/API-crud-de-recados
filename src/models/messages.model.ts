import { v4 as createUuid } from "uuid";

export class MessangeModel {
    private _idMassage: string;
    private _dateTimeCadrerated: Date;

    constructor(
        private _title: string,
        private _description: string,
        private _idUser: string
    ) {
        this._idMassage = createUuid();
        this._dateTimeCadrerated = new Date();
    }

    public get idMessage() {
        return this._idMassage;
    };

    public get title(){
        return this._title;
    };

    public get description(){
        return this._description;
    };

    public get idUser(){
        return this._idUser;
    };

    public get dateTimeCadrerated(){
        return this._dateTimeCadrerated;
    };

    public get toJson(){
        return ({
            id: this._idMassage,
            title: this.title,
            description: this.description,
            idUser: this._idUser,
            dateTimeCadrerated: this.dateTimeCadrerated
        });
    };
}