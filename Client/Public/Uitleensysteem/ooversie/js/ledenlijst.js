import ActiveComponent from "./active-component.js";
import Lid from "./lid.js";
import { BASE_URL } from "./parameters.js";

const tbody = document.querySelector("#leden tbody");

export default class Ledenlijst extends ActiveComponent {
    constructor(notificaties) { 
        super();       
        this._notificaties = notificaties;
    }

    boekOntleend(lidnummer) {
        let aantalOntleendeExemplarenTd = document.querySelector(`#lid-${lidnummer} td:last-child`);
        aantalOntleendeExemplarenTd.innerText = parseInt(aantalOntleendeExemplarenTd.innerText) + 1;
    }

    boekTeruggebracht(lidnummer) {
        let aantalOntleendeExemplarenTd = document.querySelector(`#lid-${lidnummer} td:last-child`);
        aantalOntleendeExemplarenTd.innerText = parseInt(aantalOntleendeExemplarenTd.innerText) - 1;
    }

    async render() {          
        try {
            super.rendering = true;

            let response = await fetch(`${BASE_URL}/leden`);
            if (response.ok) {
                let ledenNoClass = await response.json();
                let ledenWithClass = ledenNoClass.map(l => new Lid(l.lidnummer, l.naam, l.voornaam, l.email, l.ontleendeExemplaren));
        
                tbody.innerHTML = "";
                ledenWithClass.forEach(l => {
                    l.render(tbody);
                });    
            } else {
                throw await response.text();
            }
        } catch (ex) {
            this._notificaties.showErrorMessage(ex);            
        } finally {
            super.rendering = false;
        }
    }
}