class CapteurView {
    constructor() {
        this.statsContainer = document.getElementById('stats-container');
        this.elInt = document.getElementById('capteur-int');
        this.elExt = document.getElementById('capteur-ext');
    }

    /**
     * Met à jour l'affichage des températures en temps réel dans les Web Components.
     * @param {number|string} int - Température intérieure
     * @param {number|string} ext - Température extérieure
     */
    afficherTemperaturesDirect(int, ext) {
        if (this.elInt) this.elInt.setValeur(int);
        if (this.elExt) this.elExt.setValeur(ext);
    }

}