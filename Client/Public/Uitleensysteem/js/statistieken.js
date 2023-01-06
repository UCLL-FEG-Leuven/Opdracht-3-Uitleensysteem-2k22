import { BASE_URL, INTERVAL_IN_MSEC } from "./parameters.js";

const aantalBoekenInput = document.getElementById("aantalBoeken");
const aantalLedenInput = document.getElementById("aantalLeden");
const aantalOntleendeExemplarenInput = document.getElementById("aantalOntleendeExemplaren");
const aantalLaattijdigeExemplarenInput = document.getElementById("aantalLaattijdigeExemplaren");

export default class Statistieken {
    constructor() {
        setInterval(async () => {
            await this.render();
        }, INTERVAL_IN_MSEC);
    }

    async render() {
        try {
            let response = await fetch(`${BASE_URL}/stats`);
            let stats = await response.json();

            aantalBoekenInput.value = stats.aantalBoeken;
            aantalLedenInput.value = stats.aantalLeden;
            aantalOntleendeExemplarenInput.value = stats.aantalOntleendeExemplaren;
            aantalLaattijdigeExemplarenInput.value = stats.aantalLaattijdigeExemplaren;    
        } catch (ex) {
            console.error("Onverwachte fout: " + ex);
        }
    }
}