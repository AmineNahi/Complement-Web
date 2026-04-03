class AlertModel {
    constructor(listcapteur) {
        this.capteurOfApp = listcapteur;
        this.tempInterieure = null;
        this.tempExterieure = null;

        this.timestampInt = null;
        this.timestampExt = null;

        this.minInt = Infinity;
        this.maxInt = -Infinity;
        this.minExt = Infinity;
        this.maxExt = -Infinity;

        this.alertesActuelles = [];
    }

    traiterDonneesBrutes(capteursModels) {
        let miseAJour = false;

        capteursModels.forEach(capteur => {
            const nomOriginal = capteur.name ? capteur.name.toLowerCase() : "";
            const nom = nomOriginal.includes("interieur") ? "interieur" : 
                        nomOriginal.includes("exterieur") ? "exterieur" : nomOriginal;

            const valeur = parseFloat(capteur.temp);
            const ts = capteur.timeStamp;

            if (isNaN(valeur)) return;

            if (nom === "interieur") {
                if (this.tempInterieure !== valeur) {
                    this.tempInterieure = valeur;
                    this.timestampInt = ts;
                    miseAJour = true; 
                    
                    if (valeur < this.minInt) this.minInt = valeur;
                    if (valeur > this.maxInt) this.maxInt = valeur;
                }

            } else if (nom === "exterieur") {
                if (this.tempExterieure !== valeur) {
                    this.tempExterieure = valeur;
                    this.timestampExt = ts;
                    miseAJour = true; 
                    
                    if (valeur < this.minExt) this.minExt = valeur;
                    if (valeur > this.maxExt) this.maxExt = valeur;
                }
            }
        });

        if (miseAJour) {
            this.analyserSeuils();
            return {
                alertes: this.alertesActuelles,
                stats: this.obtenirSyntheseJournaliere(),
                valeursDirectes: {
                    int: this.tempInterieure !== null ? this.tempInterieure : "--",
                    ext: this.tempExterieure !== null ? this.tempExterieure : "--"
                }
            };
        }

        return null;
    }   

    analyserSeuils() {
        const nouvellesAlertes = [];

        const dateInt = this.timestampInt
            ? new Date(this.timestampInt * 1000).toLocaleString('fr-FR')
            : "N/A";
        const dateExt = this.timestampExt
            ? new Date(this.timestampExt * 1000).toLocaleString('fr-FR')
            : "N/A";

        if (this.tempExterieure !== null) {
            if (this.tempExterieure > 35) {
                nouvellesAlertes.push({
                    message: "Hot Hot Hot!",
                    capteur: "Extérieur",
                    valeur: this.tempExterieure,
                    date: dateExt
                });
            } else if (this.tempExterieure < 0) {
                nouvellesAlertes.push({
                    message: "Banquise en vue !",
                    capteur: "Extérieur",
                    valeur: this.tempExterieure,
                    date: dateExt
                });
            }
        }

        if (this.tempInterieure !== null) {
            if (this.tempInterieure > 50) {
                nouvellesAlertes.push({
                    message: "Appelez les pompiers ou arrêtez votre barbecue !",
                    capteur: "Intérieur",
                    valeur: this.tempInterieure,
                    date: dateInt
                });
            } else if (this.tempInterieure > 0) {
                nouvellesAlertes.push({
                    message: "Baissez le chauffage !",
                    capteur: "Intérieur",
                    valeur: this.tempInterieure,
                    date: dateInt
                });
            } else if (this.tempInterieure < 0) {
                nouvellesAlertes.push({
                    message: "canalisations gelées, appelez SOS plombier et mettez un bonnet!",
                    capteur: "Intérieur",
                    valeur: this.tempInterieure,
                    date: dateInt
                });
            } else if (this.tempInterieure < 12) {
                nouvellesAlertes.push({
                    message: "montez le chauffage ou mettez un gros pull!",
                    capteur: "Intérieur",
                    valeur: this.tempInterieure,
                    date: dateInt
                });
            }
        }

        this.alertesActuelles = nouvellesAlertes;
    }

    obtenirSyntheseJournaliere() {
        return {
            interieur: {
                min: this.minInt === Infinity ? "--" : this.minInt,
                max: this.maxInt === -Infinity ? "--" : this.maxInt
            },
            exterieur: {
                min: this.minExt === Infinity ? "--" : this.minExt,
                max: this.maxExt === -Infinity ? "--" : this.maxExt
            }
        };
    }
}