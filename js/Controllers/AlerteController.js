class AlertController {
    constructor(model, alertView, capteurView) {
        this.model = model;
        this.alertView = alertView;
        this.capteurView = capteurView;

        if (this.alertView.btnNotif) {
            this.alertView.btnNotif.addEventListener('click', () => {
                this.alertView.demanderPermissionNotification();
            });
        }
    }

    /**
     * Point d'entrée principal : reçoit le tableau brut des capteurs depuis le WebSocket.
     * Délègue l'analyse au modèle, puis met à jour les vues.
     * @param {Array} capteurs - Tableau d'objets capteurs { Nom, Valeur, Timestamp, type }
     */
    traiterDonnees(capteurs) {
        if (!Array.isArray(capteurs) || capteurs.length === 0) {
            console.warn("[AlertController] Données reçues invalides ou vides.");
            return;
        }

        const resultat = this.model.traiterDonneesBrutes(capteurs);

        if (resultat) {
            // Mise à jour de la vue des alertes
            this.alertView.afficherAlertes(resultat.alertes);

            // Mise à jour de la vue des capteurs (valeurs en temps réel)
            this.capteurView.afficherTemperaturesDirect(
                resultat.valeursDirectes.int,
                resultat.valeursDirectes.ext
            );

            // Mise à jour de la synthèse min/max
            this.capteurView.afficherStats(resultat.stats);

            // Mise à jour du graphique historique si disponible
            if (window.historiqueView) {
                window.historiqueView.ajouterPoint(
                    resultat.valeursDirectes.int,
                    resultat.valeursDirectes.ext
                );
            }
        }
    }
}