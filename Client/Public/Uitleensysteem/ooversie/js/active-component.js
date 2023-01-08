import { REFRESH_INTERVAL_MSEC } from "./parameters.js";

// Deze 'base' class (= klasse waarvan overgeërfd moet worden) kan gebruikt worden door classes die zichzelf actief refresen.
export default class ActiveComponent {
    constructor() {
        setInterval(() => {
            this.render();
        }, REFRESH_INTERVAL_MSEC);
    }

    get rendering() {
        return this._rendering;
    }

    set rendering(value) {
        this._rendering = value;
    }

    async render() {         
    }
}