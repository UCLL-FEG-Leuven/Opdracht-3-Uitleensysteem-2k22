import Boek from "./boek.js";
import { BASE_URL, INTERVAL_IN_MSEC } from "./parameters.js";

const tbody = document.querySelector("#boeken tbody");

export default class Boeken {
    constructor() {
        setInterval(async () => {
            await this.render();
        }, INTERVAL_IN_MSEC);
    }

    async render() {  
        let response = await fetch(`${BASE_URL}/boeken`);
        let boekenNoClass = await response.json();
        let boekenWithClass = boekenNoClass.map(b => new Boek(b.isbn, b.uitgever, b.auteur, b.titel));

        tbody.innerHTML = "";
        boekenWithClass.forEach(b => {
            b.render(tbody);
        });   
    }
}