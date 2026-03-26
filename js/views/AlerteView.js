class AlertView {
    constructor() {
        this.container = document.getElementById('alert-container');
        this.btnNotif = document.getElementById('btn-notifications');
        this.statsContainer = document.getElementById('stats-container'); 
        
        // On prépare la boîte de dialogue (modale) dès le chargement
        this.creerBoiteDeDialogue();
    }

    // Création d'une modale native HTML5
    creerBoiteDeDialogue() {
        this.dialog = document.createElement('dialog');
        this.dialog.id = 'alerte-detail-modal';
        
        // On injecte le HTML de la modale
        this.dialog.innerHTML = `
            <h3 style="color: #e11d48; margin-top: 0;">Détail de l'événement</h3>
            <p id="alerte-detail-texte" style="color: #334155; line-height: 1.5;"></p>
            <p id="alerte-detail-heure" style="color: #64748b; font-size: 0.9rem; font-style: italic;"></p>
            <form method="dialog" style="text-align: right; margin-top: 20px;">
                <button style="padding: 8px 16px; background: #334155; color: white; border: none; border-radius: 6px; cursor: pointer;">Fermer</button>
            </form>
        `;
        
        this.dialog.style.border = "none";
        this.dialog.style.borderRadius = "12px";
        this.dialog.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
        this.dialog.style.padding = "25px";
        this.dialog.style.maxWidth = "400px";

        document.body.appendChild(this.dialog);
    }

    // Fonction pour ouvrir la modale avec les infos
    afficherDetail(message) {
        document.getElementById('alerte-detail-texte').textContent = message;
        
        // On rajoute l'heure exacte du clic pour donner un peu plus de détail
        const heure = new Date().toLocaleTimeString('fr-FR');
        document.getElementById('alerte-detail-heure').textContent = "Alerte consultée à : " + heure;
        
        this.dialog.showModal(); 
    }

    demanderPermissionNotification() {
        if (!("Notification" in window)) {
            console.log("Ce navigateur ne supporte pas les notifications desktop");
            return;
        }

        Notification.requestPermission().then((result) => {
            if (result === 'granted') { 
                console.log("Super, les notifications sont activées !");
                this.btnNotif.style.display = 'none';
            }
        });
    }

    envoyerNotificationPush(titre, message) {
        if (Notification.permission === 'granted') {
            const options = {
                body: message,
                icon: '/assets/favicon.png' 
            };
            const notif = new Notification(titre, options);

            // Événement au clic sur la notification système 
            notif.onclick = () => {
                window.focus(); 
                this.afficherDetail(message);
                notif.close(); 
            };
        }
    }

    afficherStats(stats) {
        this.statsContainer.innerHTML = `
            <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                <strong>Intérieur :</strong> Min ${stats.interieur.min}°C | Max ${stats.interieur.max}°C <br>
                <strong>Extérieur :</strong> Min ${stats.exterieur.min}°C | Max ${stats.exterieur.max}°C
            </div>
        `;
    }

    afficherAlertes(alertes) {
        this.container.innerHTML = ''; 
        
        if (alertes.length === 0) return;

        alertes.forEach(message => {
            const alerteDiv = document.createElement('div');
            alerteDiv.setAttribute('role', 'alert');
            alerteDiv.className = 'alerte-box';
            alerteDiv.textContent = message;
            
            alerteDiv.style.cursor = 'pointer';
            alerteDiv.style.background = '#ffe4e6'; 
            alerteDiv.style.borderLeft = '5px solid #e11d48';
            alerteDiv.style.padding = '15px';
            alerteDiv.style.marginBottom = '10px';
            alerteDiv.style.borderRadius = '4px';

            // Événement au clic sur l'alerte dans la page HTML
            alerteDiv.addEventListener('click', () => {
                this.afficherDetail(message);
            });

            this.container.appendChild(alerteDiv);
            
            // On envoie aussi la notification Push
            this.envoyerNotificationPush("Alerte Domotique", message);
        });
    }

    afficherTemperaturesDirect(int, ext) {
        const valInt = document.getElementById('valeur-int');
        const valExt = document.getElementById('valeur-ext');
        
        if (valInt) valInt.textContent = int;
        if (valExt) valExt.textContent = ext;
    }
}