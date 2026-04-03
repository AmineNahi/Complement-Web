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

    traiterDonnees(capteurs) {
        const resultat = this.model.traiterDonneesBrutes(capteurs);

        if (resultat) {
            this.alertView.afficherAlertes(resultat.alertes);
                if (this.capteurView) {
                this.capteurView.afficherStats(resultat.stats);
                this.capteurView.afficherTemperaturesDirect(resultat.valeursDirectes.int, resultat.valeursDirectes.ext); 
            }
        }
    }
}