class CapteurController {
    constructor() {
        this.init();
    }
    
    init() {
        const dataClass = new Data();
        
        // On lance la machine et on donne les instructions à exécuter à chaque mise à jour
        dataClass.start((currentCapteurs, historique) => {
            
            console.log("Les capteurs actuels :", currentCapteurs);
            console.log("L'historique (50 derniers) :", historique);

            // 1. Vider l'affichage précédent
            const container = document.getElementById('capteurs-container');
            if (container) container.innerHTML = ''; 

            // 2. Afficher les nouvelles valeurs
            if (currentCapteurs && currentCapteurs.length > 0) {
                currentCapteurs.forEach((item) => {
                    const capteur = new CapteurModel(item.type, item.Nom, item.Valeur, item.Timestamp);
                    capteur.displayValue();
                });
            }
        });
    }
}