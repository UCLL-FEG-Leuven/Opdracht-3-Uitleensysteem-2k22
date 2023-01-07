import Boekenlijst from "./boekenlijst.js";
import Ledenlijst from "./ledenlijst.js";
import OntlenenTerugbrengen from "./ontlenen-terugbrengen.js";
import Statistieken from "./statistieken.js";

// Aanmaken van het statistieken overzicht object.
// Dit object zal zichzelf bijwerken om de x seconden.
const statistieken = new Statistieken();
statistieken.render();

// Aanmaken van het boekenlijst object.
// Dit object zal zichzelf bijwerken om de x seconden.
const boekenlijst = new Boekenlijst();
boekenlijst.render();

// Aanmaken van het ledelijst object.
// Dit object zal zichzelf bijwerken om de x seconden.
const ledenlijst = new Ledenlijst();
ledenlijst.render();

// Aanmaken van het ontlenen-terugbrengen object.
const ontlenenTerugbrengen = new OntlenenTerugbrengen(statistieken, boekenlijst, ledenlijst);
ontlenenTerugbrengen.render();