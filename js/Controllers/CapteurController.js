class CapteurController {
    constructor() {
        this.listCapteur = [];
    }
    
    init() {
        
        const dataService = new Data();
        dataService.loadData();
    }

    mettreAJourDonnees(donneesBrutes) {        
        this.listCapteur = [];

        donneesBrutes.forEach((item) => {
            const capteur = new CapteurModel(item.type, item.Nom, item.Valeur, item.Timestamp);
            this.listCapteur.push(capteur);
            
            const existingBox = document.getElementById("capteur-" + capteur.name);
            if (existingBox) {
                const valueSpan = existingBox.querySelector('#valeur-' + capteur.name);
                if (valueSpan) {
                    valueSpan.textContent = capteur.temp;
                }
            } else {
                capteur.displayValue();
            }
        });

        if (window.appAlertes) {
            window.appAlertes.traiterDonnees(this.listCapteur);
        }
    }
}