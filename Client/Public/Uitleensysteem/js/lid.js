export default class Lid {
    constructor(lidnummer, naam, voornaam, email) {
        this._lidnummer = lidnummer;
        this._naam = naam;
        this._voornaam = voornaam;
        this._email = email;
    }

    get lidnummer() {
        return this._lidnummer;
    }

    get naam() {
        return this._naam;
    }

    get voornaam() {
        return this._voornaam;
    }

    get email() {
        return this._email;
    }

    render(tbody) {
        tbody.insertAdjacentHTML("beforeend", 
        `<tr>
            <td>${this.lidnummer}</td>
            <td>${this.naam}</td>
            <td>${this.voornaam}</td>
            <td>${this.email}</td>
            <td>TODO</td>
         </tr>`);
    }
}