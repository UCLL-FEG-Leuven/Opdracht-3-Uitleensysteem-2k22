import Lid from "./lid.js";
import { BASE_URL, INTERVAL_IN_MSEC } from "./parameters.js";

const tbody = document.querySelector("#leden tbody");

export default class Leden {
    constructor() {
        setInterval(async () => {
            await this.render();
        }, INTERVAL_IN_MSEC);
    }

    async render() {  
        let response = await fetch(`${BASE_URL}/leden`);
        let ledenNoClass = await response.json();
        let ledenWithClass = ledenNoClass.map(l => new Lid(l.lidnummer, l.naam, l.voornaam, l.email));

        tbody.innerHTML = "";
        ledenWithClass.forEach(l => {
            l.render(tbody);
        });   
    }
}