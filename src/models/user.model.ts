import { v4 as createUuid } from "uuid";

class UserModel {

    private _idUser: string;

    constructor(
        private _name: string,
        private _userName: string,
        private _email: string,
        private _password: string
    ) {
        this._idUser = createUuid();
    };

    public get idUser (){
        return this._idUser;
    };

    public get name() {
        return this._name;
    };

    public get userName() {
        return this._userName;
    };

    public get email() {
        return this._email;
    };

    public get password() {
        return this._password;
    };

    public get toJson() {
        return {
            id: this.idUser,
            name: this.name,
            userName: this.userName,
            email: this.email,
            password: this.password
        }
    };
};