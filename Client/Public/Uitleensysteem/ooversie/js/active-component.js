import { REFRESH_INTERVAL_MSEC } from "./parameters.js";

// Deze 'base' class (= klasse waarvan overgeërfd moet worden) kan gebruikt worden door classes die zichzelf actief refresen.
export default class ActiveComponent {
    constructor() {
        setInterval(() => {
            this._refreshing = true;
            this.refresh();
            this._refreshing = false;
        }, REFRESH_INTERVAL_MSEC);
    }

    get refreshing() {
        return this._refreshing;
    }

    async refresh() {         
    }
}