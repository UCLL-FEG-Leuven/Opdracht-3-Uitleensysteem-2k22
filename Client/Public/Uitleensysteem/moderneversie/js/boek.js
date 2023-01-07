export default class Boek {
    constructor(isbn, uitgever, auteur, titel, exemplaren) {        
        this._isbn = isbn;
        this._uitgever = uitgever;
        this._auteur = auteur;
        this._titel = titel;
        this._exemplaren = exemplaren;
    }

    get isbn() {
        return this._isbn;
    }

    get uitgever() {
        return this._uitgever;
    }

    get auteur() {
        return this._auteur;
    }

    get titel() {
        return this._titel;
    }

    get aantalExemplaren() {
        return this._exemplaren.length;
    }

    get aantalExemplarenOntleend() {
        return this._exemplaren.filter(e => e.ontleend).length;
    }

    render(tbody) {
        tbody.insertAdjacentHTML("beforeend", 
        `<tr id="boek-${this.isbn}">
            <td>${this.isbn}</td>
            <td>${this.uitgever}</td>
            <td>${this.auteur}</td>
            <td>${this.titel}</td>
            <td>${this.aantalExemplaren}</td>
            <td>${this.aantalExemplarenOntleend}</td>
         </tr>`);
    }
}