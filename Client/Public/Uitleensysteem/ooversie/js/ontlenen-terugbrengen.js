import { BASE_URL } from "./parameters.js";

const isbnInput = document.getElementById("isbn");
const exemplaarnummerInput = document.getElementById("exemplaarnummer");
const lidnummerInput = document.getElementById("lidnummer");

const ontlenenBtn = document.getElementById("ontlenenBtn");
const terugbrengenBtn = document.getElementById("terugbrengenBtn");

const boeteParagraph = document.getElementById("boete");

export default class OntlenenTerugbrengen {
    constructor(rapporteerFoutCallback, statistieken, boekenlijst, ledenlijst) {
        this._rapporteerFoutCallback = rapporteerFoutCallback;
        this._statistieken = statistieken;
        this._boekenlijst = boekenlijst;
        this._ledenlijst = ledenlijst;        
    }

    render() {
        ontlenenBtn.addEventListener("click", async (e) => {
            try {
                e.preventDefault();
                this._clearBoete();
                
                let response = await fetch(`${BASE_URL}/ontleen`, this._createPostRequestObject());

                // Is de statuscode succesvol?
                if (response.ok) {
                    // Zijn de componenten aan het refreshen?
                    // Ja? Dan is er geen garantie of deze ontlening al ontvangen werd door de backend en of deze al dan niet meegestuurd wordt met de refresh.
                    // Vandaar doen we terug een refresh. Zo zijn we zeker dat het scherm de juiste data toont.
                    // Neen? Dan kunnen we de DOM aanpassen en zijn we zeker dat de DOM van de browsers ook de situatie voorstelt van de backend.
                    if (this._statistieken.refreshing) {
                        this._statistieken.refresh();
                    } else {
                        this._statistieken.boekOntleend();
                    }
                    if (this._boekenlijst.refreshing) {
                        this._boekenlijst.refresh();
                    } else {
                        this._boekenlijst.boekOntleend(isbnInput.value);
                    }
                    if (this._ledenlijst.refreshing) {
                        this._ledenlijst.refresh();
                    } else {
                        this._ledenlijst.boekOntleend(lidnummerInput.value);
                    }
                                                
                    this._clearInputs();        
                } else {
                    throw await response.text();
                }
            } catch (ex) {
                this._rapporteerFoutCallback(ex);
            }
        });

        terugbrengenBtn.addEventListener("click", async (e) => {
            try {
                e.preventDefault(); 
                this._clearBoete();
    
                let response = await fetch(`${BASE_URL}/brengterug`, this._createPostRequestObject());

                // Is de statuscode succesvol?
                if (response.ok) {
                    let boeteObject = await response.json();
                    if (boeteObject.boete) {
                        boeteParagraph.style.visibility = "unset";
                        boeteParagraph.innerText =  `Boete: €${boeteObject.boete}`;
                    } else {
                        boeteParagraph.style.visibility = "hidden";
                        boeteParagraph.innerText = "";
                    }
        
                    // Zijn de componenten aan het refreshen?
                    // Ja? Dan is er geen garantie of deze terugbrening al ontvangen werd door de backend en of deze al dan niet meegestuurd wordt met de refresh.
                    // Vandaar doen we terug een refresh. Zo zijn we zeker dat het scherm de juiste data toont.
                    // Neen? Dan kunnen we de DOM aanpassen en zijn we zeker dat de DOM van de browsers ook de situatie voorstelt van de backend.
                    if (this._statistieken.refreshing) {
                        this._statistieken.refresh();
                    } else {
                        this._statistieken.boekTeruggebracht(boeteObject.boete);
                    }
                    if (this._boekenlijst.refreshing) {
                        this._boekenlijst.refresh();
                    } else {
                        this._boekenlijst.boekTeruggebracht(isbnInput.value);
                    }
                    if (this._ledenlijst.refreshing) {
                        this._ledenlijst.refresh();
                    } else {
                        this._ledenlijst.boekTeruggebracht(lidnummerInput.value);
                    }
                                              
                    this._clearInputs();        
                } else {
                    throw await response.text();
                }
            } catch (ex) {
                this._rapporteerFoutCallback(ex);
            }
         }); 
    }

    _createPostRequestObject() {
        let body = {
            isbn: isbnInput.value,
            exemplaarnummer: parseInt(exemplaarnummerInput.value),
            lidnummer: lidnummerInput.value
        };
        return {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
       };
    }

    _clearBoete() {
        boeteParagraph.style.visibility = "hidden";
        boeteParagraph.innerText = "";        
    }

    _clearInputs() {
        isbnInput.value = "";
        exemplaarnummerInput.value = "";
        lidnummerInput.value = "";
   }
}