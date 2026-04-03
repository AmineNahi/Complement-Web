class HistoriqueView {
    constructor() {
        this.ctx = document.getElementById('historique-graph');
        this.chart = null;

        // Données en mémoire : on garde les 24 derniers points
        this.maxPoints = 24;
        this.labels = [];
        this.donneesInt = [];
        this.donneesExt = [];

        if (this.ctx) {
            this._initGraphAvecDonneesFictives();
        }
    }

    /**
     * Initialise le graphique avec des données fictives simulant les 24 dernières heures.
     * Ces données seront progressivement remplacées par les vraies valeurs WebSocket
     * via ajouterPoint().
     */
    _initGraphAvecDonneesFictives() {
        const maintenant = new Date();

        for (let i = this.maxPoints; i >= 0; i--) {
            const d = new Date(maintenant.getTime() - i * 60 * 60 * 1000);
            this.labels.push(`${d.getHours()}h00`);

            const tempInt = parseFloat((19 + Math.random() * 3).toFixed(1));
            const baseExt = 15 - Math.abs(12 - (this.maxPoints - i));
            const tempExt = parseFloat((baseExt + Math.random() * 4).toFixed(1));

            this.donneesInt.push(tempInt);
            this.donneesExt.push(tempExt);
        }

        this._creerOuMettreAJourChart();
    }

    /**
     * Crée le Chart.js ou le recrée s'il existait déjà.
     */
    _creerOuMettreAJourChart() {
        // Destruction de l'instance précédente si elle existe
        const existant = Chart.getChart(this.ctx);
        if (existant) existant.destroy();

        this.chart = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: [
                    {
                        label: 'Intérieur (°C)',
                        data: this.donneesInt,
                        borderColor: '#e11d48',
                        backgroundColor: 'rgba(225, 29, 72, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Extérieur (°C)',
                        data: this.donneesExt,
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: { mode: 'index', intersect: false }
                },
                scales: {
                    y: { title: { display: true, text: 'Température (°C)' } }
                }
            }
        });
    }

    /**
     * Ajoute un nouveau point de données réel (appelé par AlertController).
     * Supprime le point le plus ancien si on dépasse maxPoints.
     * @param {number|string} tempInt - Nouvelle température intérieure
     * @param {number|string} tempExt - Nouvelle température extérieure
     */
    ajouterPoint(tempInt, tempExt) {
        if (!this.chart) return;

        const now = new Date();
        const label = `${now.getHours()}h${String(now.getMinutes()).padStart(2, '0')}`;

        // Glissement : on retire l'ancien point si on atteint la limite
        if (this.labels.length >= this.maxPoints) {
            this.labels.shift();
            this.donneesInt.shift();
            this.donneesExt.shift();
        }

        this.labels.push(label);
        this.donneesInt.push(tempInt !== "--" ? parseFloat(tempInt) : null);
        this.donneesExt.push(tempExt !== "--" ? parseFloat(tempExt) : null);

        // Mise à jour du graphique sans le recréer
        this.chart.data.labels = this.labels;
        this.chart.data.datasets[0].data = this.donneesInt;
        this.chart.data.datasets[1].data = this.donneesExt;
        this.chart.update('none'); // 'none' = pas d'animation pour les mises à jour fréquentes
    }
}