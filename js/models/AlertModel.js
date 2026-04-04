class AlertModel {
    constructor() {
        this.tempInterieure = null;
        this.tempExterieure = null;

        this.minInt = Infinity;
        this.maxInt = -Infinity;
        this.minExt = Infinity;
        this.maxExt = -Infinity;

        this.alertesActuelles = [];
    }

    mettreAJourDonnees(int, ext) {
        this.tempInterieure = int;
        this.tempExterieure = ext;

        if (int < this.minInt) this.minInt = int;
        if (int > this.maxInt) this.maxInt = int;
        if (ext < this.minExt) this.minExt = ext;
        if (ext > this.maxExt) this.maxExt = ext;

        this.analyserSeuils();

        return {
            alertes: this.alertesActuelles,
            stats: this.obtenirSyntheseJournaliere()
        };
    }

    analyserSeuils() {
        let nouvellesAlertes = [];

        // Capteur extérieur
        if (this.tempExterieure > 35) {
            nouvellesAlertes.push("Hot Hot Hot !");
        } else if (this.tempExterieure < 0) {
            nouvellesAlertes.push("Banquise en vue !");
        }


        if (this.tempInterieure > 50) {
            nouvellesAlertes.push("Appelez les pompiers ou arrêtez votre barbecue !");
        } else if (this.tempInterieure > 22) {
            nouvellesAlertes.push("Baissez le chauffage !");
        } else if (this.tempInterieure < 0) {
            nouvellesAlertes.push("Canalisations gelées, appelez SOS plombier et mettez un bonnet !");
        } else if (this.tempInterieure < 12) {
            nouvellesAlertes.push("Montez le chauffage ou mettez un gros pull !");
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