const BASE_URL = "https://uitleensysteem.azurewebsites.net/api/u0032465";
const REFRESH_INTERVAL_IN_MSEC = 5000;

/* STATISTIEKEN */
const aantalBoekenInput = document.getElementById("aantalBoeken");
const aantalLedenInput = document.getElementById("aantalLeden");
const aantalOntleendeExemplarenInput = document.getElementById("aantalOntleendeExemplaren");
const aantalLaattijdigeExemplarenInput = document.getElementById("aantalLaattijdigeExemplaren");
const getStatistieken = async () => {
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

/* BOEKEN */
const boekenTbody = document.querySelector("#boeken tbody");
const getBoeken = async () => {
    try {
        let response = await fetch(`${BASE_URL}/boeken`);
        let boeken = await response.json();

        boekenTbody.innerHTML = "";
        boeken.forEach(boek => {
            boekenTbody.innerHTML += 
            `<tr>
                <td>${boek.isbn}</td>
                <td>${boek.uitgever}</td>
                <td>${boek.auteur}</td>
                <td>${boek.titel}</td>
                <td>${boek.exemplaren.length}</td>
                <td>${boek.exemplaren.filter(b => b.ontleend).length}</td>
            </tr>`;
        });
    } catch (ex) {
        console.error("Onverwachte fout: " + ex);
    }
}


/* LEDEN */
const ledenTbody = document.querySelector("#leden tbody");
const getLeden = async () => {
    try {
        let response = await fetch(`${BASE_URL}/leden`);
        let leden = await response.json();

        ledenTbody.innerHTML = "";
        leden.forEach(lid => {
            ledenTbody.innerHTML += 
            `<tr class="${(lid.ontleendeExemplaren.filter(e => new Date(e.datumTerug) < new Date()).length > 0 ? 'bg-danger' : '')}">
                <td>${lid.lidnummer}</td>
                <td>${lid.naam}</td>
                <td>${lid.voornaam}</td>
                <td><a href="mailto:${lid.email}">${lid.email}</a></td>
                <td>${lid.ontleendeExemplaren.length}</td>
            </tr>`;
        });
    } catch (ex) {
        console.error("Onverwachte fout: " + ex);
    }
}

/* ONTLENEN-TERUGBRENGEN */
const isbnInput = document.getElementById("isbn");
const exemplaarnummerInput = document.getElementById("exemplaarnummer");
const lidnummerInput = document.getElementById("lidnummer");
const ontlenenBtn = document.getElementById("ontlenenBtn");
const terugbrengenBtn = document.getElementById("terugbrengenBtn");
const boeteParagraph = document.getElementById("boete");

ontlenenBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    
    boeteParagraph.style.visibility = "hidden";
    boeteParagraph.innerText = "";

    let body = {
        isbn: isbnInput.value,
        exemplaarnummer: parseInt(exemplaarnummerInput.value),
        lidnummer: lidnummerInput.value
    };

    let response = await fetch(`${BASE_URL}/ontleen`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    isbnInput.value = "";
    exemplaarnummerInput.value = "";
    lidnummerInput.value = "";
 });

 terugbrengenBtn.addEventListener("click", async (e) => {
     e.preventDefault(); 

     boeteParagraph.style.visibility = "hidden";
     boeteParagraph.innerText = "";

     let body = {
        isbn: isbnInput.value,
        exemplaarnummer: parseInt(exemplaarnummerInput.value),
        lidnummer: lidnummerInput.value
     };

     let response = await fetch(`${BASE_URL}/brengterug`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
     });
     let boeteObject = await response.json();
     if (boeteObject.boete) {
         boeteParagraph.style.visibility = "unset";
         boeteParagraph.innerText =  `Boete: €${boeteObject.boete}`;
     }

     isbnInput.value = "";
     exemplaarnummerInput.value = "";
     lidnummerInput.value = "";
}); 


/* START */

// De gegevens een eerste maal opladen en tonen.
getStatistieken();
getBoeken();
getLeden();

// Elke 5 seconden worden de gegevens op het scherm bijgewerkt.
setInterval(() => {
    getStatistieken();
    getBoeken();
    getLeden();
}, REFRESH_INTERVAL_IN_MSEC);