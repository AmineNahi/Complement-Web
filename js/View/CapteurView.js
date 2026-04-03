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

    /**
     * Affiche la synthèse journalière min/max dans le conteneur de stats.
     * @param {Object} stats - { interieur: { min, max }, exterieur: { min, max } }
     */
    afficherStats(stats) {
        if (!this.statsContainer) return;

        this.statsContainer.innerHTML = `
            <div
                style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;"
                role="region"
                aria-label="Synthèse journalière des températures"
            >
                <p>
                    <strong>Intérieur :</strong>
                    <span aria-label="Minimum intérieur">${stats.interieur.min}°C</span> /
                    <span aria-label="Maximum intérieur">${stats.interieur.max}°C</span>
                    &nbsp;|&nbsp;
                    <strong>Extérieur :</strong>
                    <span aria-label="Minimum extérieur">${stats.exterieur.min}°C</span> /
                    <span aria-label="Maximum extérieur">${stats.exterieur.max}°C</span>
                </p>
            </div>
        `;
    }
}