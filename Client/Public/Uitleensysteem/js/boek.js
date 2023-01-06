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
        return this._auteur;
    }

    get titel() {
        return this._isbn;
    }

    render(tbody) {
        tbody.insertAdjacentHTML("beforeend", 
        `<tr>
            <td>${this.isbn}</td>
            <td>${this.uitgever}</td>
            <td>${this.auteur}</td>
            <td>${this.titel}</td>
            <td>TODO</td>
            <td>TODO</td>
         </tr>`);
    }
}