import ActiveComponent from "./active-component.js";
import { BASE_URL } from "./parameters.js";

const aantalBoekenInput = document.getElementById("aantalBoeken");
const aantalLedenInput = document.getElementById("aantalLeden");
const aantalOntleendeExemplarenInput = document.getElementById("aantalOntleendeExemplaren");
const aantalLaattijdigeExemplarenInput = document.getElementById("aantalLaattijdigeExemplaren");

export default class Statistieken extends ActiveComponent {
    constructor(rapporteerFoutCallback) {
        super();
        this._rapporteerFoutCallback = rapporteerFoutCallback;
    }

    boekOntleend() {        
        aantalOntleendeExemplarenInput.value = parseInt(aantalOntleendeExemplarenInput.value) + 1;
    }

    boekTeruggebracht(teLaat) {
        aantalOntleendeExemplarenInput.value = parseInt(aantalOntleendeExemplarenInput.value) - 1;
        if (teLaat) {
            aantalLaattijdigeExemplarenInput.value = parseInt(aantalLaattijdigeExemplarenInput.value) - 1;
        }
    }

    async refresh() {
        await this.render();        
    }

    async render() {
        try {
            let response = await fetch(`${BASE_URL}/stats`);
            if (response.ok) {
                let stats = await response.json();

                aantalBoekenInput.value = stats.aantalBoeken;
                aantalLedenInput.value = stats.aantalLeden;
                aantalOntleendeExemplarenInput.value = stats.aantalOntleendeExemplaren;
                aantalLaattijdigeExemplarenInput.value = stats.aantalLaattijdigeExemplaren;        
            } else {
                throw await response.text();
            }
        } catch (ex) {
            this._rapporteerFoutCallback(ex);
        }
    }
}