export default class Boek {
    constructor(isbn, uitgever, auteur, titel) {        
        this._isbn = isbn;
        this._uitgever = uitgever;
        this._auteur = auteur;
        this._titel = titel;
    }

    get isbn() {
        return this._isbn;
    }

    get uitgever() {
        return this._uitgever;
    }

    get auteur() {
        return this._uiteur;
    }

    get titel() {
        return this._isbn;
    }

    render(tbody) {
        // TODO
    }
}