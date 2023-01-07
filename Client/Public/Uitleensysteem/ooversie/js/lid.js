export default class Lid {
    constructor(lidnummer, naam, voornaam, email, ontleendeExemplaren) {
        this._lidnummer = lidnummer;
        this._naam = naam;
        this._voornaam = voornaam;
        this._email = email;
        this._ontleendeExemplaren = ontleendeExemplaren;
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

    get aantalOntleendeExemplaren() {
        return this._ontleendeExemplaren.length;
    }

    render(tbody) {
        tbody.insertAdjacentHTML("beforeend", 
        `<tr id="lid-${this.lidnummer}" class="${(this._ontleendeExemplaren.filter(e => new Date(e.datumTerug) < new Date()).length > 0 ? 'bg-danger' : '')}">
            <td>${this.lidnummer}</td>
            <td>${this.naam}</td>
            <td>${this.voornaam}</td>
            <td><a href="mailto:${this.email}">${this.email}</a></td>
            <td>${this.aantalOntleendeExemplaren}</td>
         </tr>`);
    }
}