class AlertModel {
    constructor() {
        this.tempInterieure = null;
        this.tempExterieure = null;
        
        // Stockage des deux timestamps
        this.timestampInt = null;
        this.timestampExt = null;

        this.minInt = Infinity;
        this.maxInt = -Infinity;
        this.minExt = Infinity;
        this.maxExt = -Infinity;
        this.alertesActuelles = [];
    }

    /**
     * Traite le tableau de données brutes contenant les deux capteurs [cite: 487]
     */
    traiterDonneesBrutes(capteurs) {
        let tempInt = null;
        let tempExt = null;
        let tsInt = null;
        let tsExt = null;

        capteurs.forEach(capteur => {
            if (capteur.Nom === "interieur") {
                tempInt = parseFloat(capteur.Valeur); 
                tsInt = capteur.Timestamp; // Récupère le timestamp intérieur
            } else if (capteur.Nom === "exterieur") {
                tempExt = parseFloat(capteur.Valeur);
                tsExt = capteur.Timestamp; // Récupère le timestamp extérieur
            }
        });

        if (tempInt !== null && tempExt !== null) {
            return this.mettreAJourDonnees(tempInt, tempExt, tsInt, tsExt);
        }
        
        return null;
    }

    /**
     * Met à jour les valeurs et les statistiques journalières [cite: 467, 492]
     */
    mettreAJourDonnees(int, ext, tsInt, tsExt) {
        this.tempInterieure = int;
        this.tempExterieure = ext;
        this.timestampInt = tsInt;
        this.timestampExt = tsExt;

        // Mise à jour des Min/Max
        if (int < this.minInt) this.minInt = int;
        if (int > this.maxInt) this.maxInt = int;
        if (ext < this.minExt) this.minExt = ext;
        if (ext > this.maxExt) this.maxExt = ext;

        // Analyse des seuils avec les timestamps respectifs
        this.analyserSeuils();

        return {
            alertes: this.alertesActuelles,
            stats: this.obtenirSyntheseJournaliere(),
            valeursDirectes: { int: this.tempInterieure, ext: this.tempExterieure }
        };
    }

    /**
     * Logique d'alerte conforme au cahier des charges [cite: 468, 469, 470, 471, 472, 473]
     */
    analyserSeuils() {
        let nouvellesAlertes = [];
        
        // Formattage des deux dates pour les détails 
        const dateInt = new Date(this.timestampInt * 1000).toLocaleString('fr-FR');
        const dateExt = new Date(this.timestampExt * 1000).toLocaleString('fr-FR');

        // --- Logique Capteur Extérieur ---
        if (this.tempExterieure > 35) {
            nouvellesAlertes.push({ message: "Hot Hot Hot !", capteur: "Extérieur", valeur: this.tempExterieure, date: dateExt });
        } else if (this.tempExterieure < 0) {
            nouvellesAlertes.push({ message: "Banquise en vue !", capteur: "Extérieur", valeur: this.tempExterieure, date: dateExt });
        }

        // --- Logique Capteur Intérieur ---
        if (this.tempInterieure > 50) {
            nouvellesAlertes.push({ message: "Appelez les pompiers ou arrêtez votre barbecue !", capteur: "Intérieur", valeur: this.tempInterieure, date: dateInt });
        } else if (this.tempInterieure > 22) {
            nouvellesAlertes.push({ message: "Baissez le chauffage !", capteur: "Intérieur", valeur: this.tempInterieure, date: dateInt });
        } else if (this.tempInterieure < 0) {
            nouvellesAlertes.push({ message: "Canalisations gelées, appelez SOS plombier et mettez un bonnet !", capteur: "Intérieur", valeur: this.tempInterieure, date: dateInt });
        } else if (this.tempInterieure < 12) {
            nouvellesAlertes.push({ message: "Montez le chauffage ou mettez un gros pull !", capteur: "Intérieur", valeur: this.tempInterieure, date: dateInt });
        }

        this.alertesActuelles = nouvellesAlertes;
    }

    obtenirSyntheseJournaliere() {
        return {
            interieur: { min: this.minInt, max: this.maxInt },
            exterieur: { min: this.minExt, max: this.maxExt }
        };
    }
}