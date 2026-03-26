class AlertModel {
    constructor() {
        // Stockage des températures actuelles
        this.tempInterieure = null;
        this.tempExterieure = null;

        // Historique pour la synthèse journalière (Min et Max)
        this.minInt = Infinity;
        this.maxInt = -Infinity;
        this.minExt = Infinity;
        this.maxExt = -Infinity;

        // Tableau contenant les messages d'alerte actifs
        this.alertesActuelles = [];
    }

    /**
     * Met à jour les données du modèle avec les nouvelles valeurs reçues du WebSocket
     * @param {number} int - Température intérieure
     * @param {number} ext - Température extérieure
     * @returns {Object} - Retourne les nouvelles alertes et les stats
     */
    mettreAJourDonnees(int, ext) {
        this.tempInterieure = int;
        this.tempExterieure = ext;

        // Mise à jour des Min et Max
        if (int < this.minInt) this.minInt = int;
        if (int > this.maxInt) this.maxInt = int;
        
        if (ext < this.minExt) this.minExt = ext;
        if (ext > this.maxExt) this.maxExt = ext;

        // On lance l'analyse pour générer les alertes
        this.analyserSeuils();

        // On retourne tout ce dont le Contrôleur aura besoin
        return {
            alertes: this.alertesActuelles,
            stats: this.obtenirSyntheseJournaliere()
        };
    }

    /**
     * Logique métier : Analyse les températures 
     */
    analyserSeuils() {
        let nouvellesAlertes = [];

        // 1. Logique du capteur Extérieur
        if (this.tempExterieure > 35) {
            nouvellesAlertes.push("Hot Hot Hot !");
        } else if (this.tempExterieure < 0) {
            nouvellesAlertes.push("Banquise en vue !");
        }

        // 2. Logique du capteur Intérieur
        if (this.tempInterieure > 50) {
            nouvellesAlertes.push("Appelez les pompiers ou arrêtez votre barbecue !");
        } else if (this.tempInterieure > 22) {
            nouvellesAlertes.push("Baissez le chauffage !");
        } else if (this.tempInterieure < 0) {
            nouvellesAlertes.push("canalisations gelées, appelez SOS plombier et mettez un bonnet !");
        } else if (this.tempInterieure < 12) {
            nouvellesAlertes.push("montez le chauffage ou mettez un gros pull !");
        }

        // On met à jour l'état du modèle
        this.alertesActuelles = nouvellesAlertes;
    }

    /**
     * Retourne les valeurs Min et Max pour l'affichage
     */
    obtenirSyntheseJournaliere() {
        return {
            interieur: { min: this.minInt, max: this.maxInt },
            exterieur: { min: this.minExt, max: this.maxExt }
        };
    }
}