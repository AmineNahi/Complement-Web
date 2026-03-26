class HistoriqueView {
    constructor() {
        this.ctx = document.getElementById('historique-graph');
        if (this.ctx) {
            this.initGraph();
        }
    }

    genererDonneesFictives() {
        const heures = [];
        const donneesInt = [];
        const donneesExt = [];

        for (let i = 0; i <= 24; i++) {
            heures.push(`${i}h00`);
            
            // Fausse température Intérieure 
            const tempInt = 19 + (Math.random() * 3);
            donneesInt.push(tempInt.toFixed(1));

            // Fausse température Extérieure 
            const baseExt = 15 - Math.abs(12 - i); 
            const tempExt = baseExt + (Math.random() * 4); 
            donneesExt.push(tempExt.toFixed(1));
        }

        return { heures, donneesInt, donneesExt };
    }

    initGraph() {
        let chartStatus = Chart.getChart(this.ctx); 
        if (chartStatus != undefined) {
            chartStatus.destroy(); 
        }
        const data = this.genererDonneesFictives();

        new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: data.heures,
                datasets: [
                    {
                        label: 'Intérieur (°C)',
                        data: data.donneesInt,
                        borderColor: '#e11d48', 
                        backgroundColor: 'rgba(225, 29, 72, 0.1)', 
                        borderWidth: 2,
                        tension: 0.4, 
                        fill: true 
                    },
                    {
                        label: 'Extérieur (°C)',
                        data: data.donneesExt,
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
                plugins: { legend: { position: 'top' } },
                scales: { y: { title: { display: true, text: 'Température (°C)' } } }
            }
        });
    }
}
