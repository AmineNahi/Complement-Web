class CapteurController {
    constructor() {
        this.listCapteur = [];
        this.getData();
    }
    
    async getData() {
        const data = new Data();
        
        const capteurList = await data.getData(); 
        
        if (capteurList && capteurList.capteurs) {
            capteurList.capteurs.forEach((item) => {
                console.log(item)
                const capteur = new CapteurModel(item.type, item.Nom, item.Valeur, item.Timestamp);
                this.listCapteur.push(capteur);
                capteur.displayValue();
            });
        }
    }
}