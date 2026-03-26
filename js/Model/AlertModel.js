class AlertModel {
    constructor() {
        this.alertes = [];
    }

    analyserTemperatures(tempInt, tempExt) {
        let nouvellesAlertes = [];

        // Logique Extérieure 
        if (tempExt > 35) {
            nouvellesAlertes.push("Hot Hot Hot !");
        } else if (tempExt < 0) {
            nouvellesAlertes.push("Banquise en vue !");
        }

        // Logique Intérieure
        if (tempInt > 50) {
            nouvellesAlertes.push("Appelez les pompiers ou arrêtez votre barbecue !");
        } else if (tempInt > 22) {
            nouvellesAlertes.push("Baissez le chauffage !");
        } else if (tempInt < 0) {
            nouvellesAlertes.push("canalisations gelées, appelez SOS plombier et mettez un bonnet !");
        } else if (tempInt < 12) {
            nouvellesAlertes.push("montez le chauffage ou mettez un gros pull !");
}
        this.alertes = nouvellesAlertes;
        return this.alertes;
    }
}