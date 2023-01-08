
import Boekenlijst from "./boekenlijst.js";
import Ledenlijst from "./ledenlijst.js";
import Notificaties from "./notificaties.js";
import OntlenenTerugbrengen from "./ontlenen-terugbrengen.js";
import Statistieken from "./statistieken.js";

// Via het notificaties object kunnen andere objecten boodschappen aan de bibliothecaris geven.
const notificaties = new Notificaties();

// Aangeven dat de gevens zullen worden geladen
notificaties.showInfoMessage("Gegevens worden geladen...");

// Aanmaken van het statistieken overzicht object.
// Dit object zal zichzelf bijwerken om de x seconden.
const statistieken = new Statistieken(notificaties);
statistieken.render();

// Aanmaken van het boekenlijst object.
// Dit object zal zichzelf bijwerken om de x seconden.
const boekenlijst = new Boekenlijst(notificaties);
boekenlijst.render();

// Aanmaken van het ledelijst object.
// Dit object zal zichzelf bijwerken om de x seconden.
const ledenlijst = new Ledenlijst(notificaties);
ledenlijst.render();

// Aanmaken van het ontlenen-terugbrengen object.
const ontlenenTerugbrengen = new OntlenenTerugbrengen(notificaties, statistieken, boekenlijst, ledenlijst);
ontlenenTerugbrengen.render();