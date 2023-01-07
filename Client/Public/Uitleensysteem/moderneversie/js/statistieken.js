import { BASE_URL } from "./parameters.js";

const aantalBoekenInput = document.getElementById("aantalBoeken");
const aantalLedenInput = document.getElementById("aantalLeden");
const aantalOntleendeExemplarenInput = document.getElementById("aantalOntleendeExemplaren");
const aantalLaattijdigeExemplarenInput = document.getElementById("aantalLaattijdigeExemplaren");

export default class Statistieken {
    constructor() {
    }

    boekOntleend() {        
        aantalOntleendeExemplarenInput.vaue = parseInt(aantalOntleendeExemplarenInput.value) + 1;
    }

    boekTeruggebracht(teLaat) {
        aantalOntleendeExemplarenInput.vaue = parseInt(aantalOntleendeExemplarenInput.value) - 1;
        if (teLaat) {
            aantalLaattijdigeExemplarenInput.value = parseInt(aantalLaattijdigeExemplarenInput.value) - 1;
        }
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