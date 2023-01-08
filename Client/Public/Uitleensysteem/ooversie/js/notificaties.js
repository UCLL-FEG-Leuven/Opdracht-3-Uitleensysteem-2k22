import {SHOW_MSG_MSEC} from "./parameters.js";

const notificatiesParagraph = document.getElementById("notificaties");

export default class Notificaties {
    constructor() {
        this._currentMessageId = 0;
    }

    showInfoMessage(message) {
        this._showMessage(message, "bg-info text-white");
    }

    showSuccessMessage(message) {
        this._showMessage(message, "bg-success text-white");
    }

    showWarningMessage(message) {
        this._showMessage(message, "bg-warning text-dark");
    }

    showErrorMessage(message) {
        this._showMessage(message, "bg-danger text-white");
    }

    _showMessage(message, classes) {
        const messageId = ++this._currentMessageId;

        notificatiesParagraph.innerText = message;
        notificatiesParagraph.style.visibility = "unset";
        notificatiesParagraph.className = classes;

        // Notificaties bijven x seconden staan
        setTimeout(() => {
            // Als er al nieuwere notificaties zijn: dan mag deze notificatie niets meer verwijderen/unsetten.
            if (messageId === this._currentMessageId) {
                notificatiesParagraph.innerText = "";
                notificatiesParagraph.style.visibility = "hidden";    
                notificatiesParagraph.className = "";
            }
        }, SHOW_MSG_MSEC); 
    }
}