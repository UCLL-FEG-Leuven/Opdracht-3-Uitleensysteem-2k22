import { BASE_URL } from "./parameters.js";

const isbnInput = document.getElementById("isbn");
const exemplaarnummerInput = document.getElementById("exemplaarnummer");
const lidnummerInput = document.getElementById("lidnummer");

const ontlenenBtn = document.getElementById("ontlenenBtn");
const terugbrengenBtn = document.getElementById("terugbrengenBtn");

const boeteParagraph = document.getElementById("boete");

export default class OntlenenTerugbrengen {
    constructor(statistieken, boekenlijst, ledenlijst) {
        this._statistieken = statistieken;
        this._boekenlijst = boekenlijst;
        this._ledenlijst = ledenlijst;
    }

    render() {
        ontlenenBtn.addEventListener("click", async (e) => {
           e.preventDefault();
           this._clearBoete();
           
           let response = await fetch(`${BASE_URL}/ontleen`, this._createPostRequestObject());

           this._statistieken.boekOntleend();
           this._boekenlijst.boekOntleend(isbnInput.value);
           this._ledenlijst.boekOntleend(lidnummerInput.value);

           this._clearInputs();
        });

        terugbrengenBtn.addEventListener("click", async (e) => {
            e.preventDefault(); 
            this._clearBoete();

            let response = await fetch(`${BASE_URL}/brengterug`, this._createPostRequestObject());
            let boeteObject = await response.json();
            if (boeteObject.boete) {
                boeteParagraph.style.visibility = "unset";
                boeteParagraph.innerText =  `Boete: €${boeteObject.boete}`;
            } else {
                boeteParagraph.style.visibility = "hidden";
                boeteParagraph.innerText = "";
            }

            this._statistieken.boekTeruggebracht();
            this._boekenlijst.boekTeruggebracht(isbnInput.value);
            this._ledenlijst.boekTeruggebracht(lidnummerInput.value);
  
            this._clearInputs();
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