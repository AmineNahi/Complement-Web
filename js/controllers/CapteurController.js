class CapteurController {
    constructor() {
        this.init();
    }
    
    init() {
        const dataClass = new Data();
        
        dataClass.start((currentCapteurs, historique) => {
            
            console.log("Les capteurs actuels :", currentCapteurs);
            console.log("L'historique (50 derniers) :", historique);

            const boxHistoryContainer = document.getElementById("historique-container");
            
            if (boxHistoryContainer) {
                boxHistoryContainer.innerHTML = ''; 

                historique.forEach((groupeCapteurs) => {
                    const row = document.createElement('div');
                    row.classList.add("capteur-box")
                    
                    let texteLigne = "";

                    if (groupeCapteurs.length > 0) {
                        let ts = groupeCapteurs[0].Timestamp;
                        const date = new Date(ts.toString().length === 10 ? ts * 1000 : ts);
                        texteLigne += `[${date.toLocaleTimeString('fr-FR')}] `;
                    }

                    groupeCapteurs.forEach(capteur => {
                        texteLigne += `${capteur.Nom}: ${capteur.Valeur}°C | `;
                    });

                    row.textContent = texteLigne;
                    boxHistoryContainer.appendChild(row);
                });
            }

            const container = document.getElementById('capteurs-container');
            if (container) container.innerHTML = ''; 

            if (currentCapteurs && currentCapteurs.length > 0) {
                currentCapteurs.forEach((item) => {
                    const capteur = new CapteurModel(item.type, item.Nom, item.Valeur, item.Timestamp);
                    capteur.displayValue();
                });
            }
        });
    }
}