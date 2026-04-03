class AlertController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.initEvents();
    }

    initEvents() {
        if (this.view.btnNotif) {
            this.view.btnNotif.addEventListener('click', () => { 
                this.view.demanderPermissionNotification();
            });
        }
    }

    // traiterDonnees(capteurs) {
    //     // Donne le tableau brut au Modèle
    //     const resultat = this.model.traiterDonneesBrutes(capteurs);

    //     // On met à jour la Vue
    //     if (resultat) {
    //         this.view.afficherAlertes(resultat.alertes);
    //         this.view.afficherStats(resultat.stats);
    //         this.view.afficherTemperaturesDirect(resultat.valeursDirectes.int, resultat.valeursDirectes.ext); 
    //     }
    // }
}