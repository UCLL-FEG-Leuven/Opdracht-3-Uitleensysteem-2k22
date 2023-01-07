import {SHOW_ERROR_MSG_MSEC} from "./parameters.js";

import Boekenlijst from "./boekenlijst.js";
import Ledenlijst from "./ledenlijst.js";
import OntlenenTerugbrengen from "./ontlenen-terugbrengen.js";
import Statistieken from "./statistieken.js";

// Function die door de objecten kan gebruikt worden om te rapporteren dat er een fout is opgetreden.
const errorParagraph = document.getElementById("error");
const rapporteerFout = (foutmelding) => {
    errorParagraph.innerText = foutmelding;
    errorParagraph.style.visibility = "unset";

    // Fouten bijven x seconden staan
    setTimeout(() => {
        errorParagraph.innerText = "";
        errorParagraph.style.visibility = "hidden";
    }, SHOW_ERROR_MSG_MSEC);    
}

// Aanmaken van het statistieken overzicht object.
// Dit object zal zichzelf bijwerken om de x seconden.
const statistieken = new Statistieken(rapporteerFout);
statistieken.render();

// Aanmaken van het boekenlijst object.
// Dit object zal zichzelf bijwerken om de x seconden.
const boekenlijst = new Boekenlijst(rapporteerFout);
boekenlijst.render();

// Aanmaken van het ledelijst object.
// Dit object zal zichzelf bijwerken om de x seconden.
const ledenlijst = new Ledenlijst(rapporteerFout);
ledenlijst.render();

// Aanmaken van het ontlenen-terugbrengen object.
const ontlenenTerugbrengen = new OntlenenTerugbrengen(rapporteerFout, statistieken, boekenlijst, ledenlijst);
ontlenenTerugbrengen.render();