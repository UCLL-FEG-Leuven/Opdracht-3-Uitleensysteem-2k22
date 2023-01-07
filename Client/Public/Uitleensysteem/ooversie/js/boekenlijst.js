import ActiveComponent from "./active-component.js";
import Boek from "./boek.js";
import { BASE_URL } from "./parameters.js";

const tbody = document.querySelector("#boeken tbody");

export default class Boekenlijst extends ActiveComponent {
    constructor(rapporteerFoutCallback) {
        super();
        this._rapporteerFoutCallback = rapporteerFoutCallback;
    }

    boekOntleend(isbn) {
        let aantalOntleendeExemplarenTd = document.querySelector(`#boek-${isbn} td:last-child`);
        aantalOntleendeExemplarenTd.innerText = parseInt(aantalOntleendeExemplarenTd.innerText) + 1;
    }

    boekTeruggebracht(isbn) {
        let aantalOntleendeExemplarenTd = document.querySelector(`#boek-${isbn} td:last-child`);
        aantalOntleendeExemplarenTd.innerText = parseInt(aantalOntleendeExemplarenTd.innerText) - 1;
    }

    async refresh() {
        await this.render();        
    }

    async render() {
        try  {
            let response = await fetch(`${BASE_URL}/boeken`);
            if (response.ok) {
                let boekenNoClass = await response.json();
                let boekenWithClass = boekenNoClass.map(b => new Boek(b.isbn, b.uitgever, b.auteur, b.titel, b.exemplaren));
        
                tbody.innerHTML = "";
                boekenWithClass.forEach(b => {
                    b.render(tbody);
                });        
            } else {
                throw await response.text();
            }
        } catch (ex) {
            this._rapporteerFoutCallback(ex);
        }
    }
}