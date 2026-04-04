class HistoriqueView {
    constructor() {
        this.ctx = document.getElementById('historique-graph');
        this.chart = null; 
        if (this.ctx) {
            this.initGraph();
        }
    }

    initGraph() {
        let chartStatus = Chart.getChart(this.ctx); 
        if (chartStatus != undefined) {
            chartStatus.destroy(); 
        }

        this.chart = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: [], 
                datasets: [
                    {
                        label: 'Intérieur (°C)',
                        data: [], 
                        borderColor: '#e11d48', 
                        backgroundColor: 'rgba(225, 29, 72, 0.1)', 
                        borderWidth: 2,
                        tension: 0.4, 
                        fill: true 
                    },
                    {
                        label: 'Extérieur (°C)',
                        data: [], 
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

    updateGraph(list50LastValue) {
        if (!this.chart) return;

        const labels = [];
        const dataInt = [];
        const dataExt = [];

        list50LastValue.forEach(groupeCapteurs => {
            let interieur = groupeCapteurs.find(c => c.Nom.toLowerCase() === 'interieur');
            let exterieur = groupeCapteurs.find(c => c.Nom.toLowerCase() === 'exterieur');

            if (groupeCapteurs.length > 0) {
                let ts = groupeCapteurs[0].Timestamp;
                const date = new Date(ts.toString().length === 10 ? ts * 1000 : ts); 
                labels.push(date.toLocaleTimeString('fr-FR'));
            }

            dataInt.push(interieur ? parseFloat(interieur.Valeur) : null);
            dataExt.push(exterieur ? parseFloat(exterieur.Valeur) : null);
        });

        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = dataInt;
        this.chart.data.datasets[1].data = dataExt;

        this.chart.update(); 
    }
}