import Boeken from "./boeken.js";
import Leden from "./leden.js";
import Statistieken from "./statistieken.js";

const statistieken = new Statistieken();
statistieken.render();

const boeken = new Boeken();
boeken.render();

const leden = new Leden();
leden.render();