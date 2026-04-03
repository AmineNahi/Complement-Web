class AlertController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.initEvents();

        // Bouton notifications
        const btn = document.getElementById('btn-notifications');
        if (btn) {
        btn.addEventListener('click', () => {
            this.view.demanderPermissionNotification();
        });
        }

        // Simulation de données toutes les 5 secondes
        // À remplacer plus tard par un vrai WebSocket
        this._simuler();
        setInterval(() => this._simuler(), 5000);
    }

    _simuler() {
        // Génère des températures aléatoires pour tester
        const int = Math.round(15 + Math.random() * 40);
        const ext = Math.round(-5 + Math.random() * 45);

        const { alertes, stats } = this.model.mettreAJourDonnees(int, ext);

        this.view.afficherTemperaturesDirect(int, ext);
        this.view.afficherStats(stats);
        this.view.afficherAlertes(alertes);
    }

    initEvents() {
        if (this.view.btnNotif) {
            this.view.btnNotif.addEventListener('click', () => { 
                this.view.demanderPermissionNotification();
            });
        }
    }
}