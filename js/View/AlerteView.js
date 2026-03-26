class AlertView {
    constructor() {
        this.container = document.getElementById('alert-container');
        this.btnNotif = document.getElementById('btn-notifications');
        this.statsContainer = document.getElementById('stats-container'); 
        
        // On prépare la boîte de dialogue (modale)
        this.creerBoiteDeDialogue();
    }

    creerBoiteDeDialogue() {
        this.dialog = document.createElement('dialog');
        this.dialog.id = 'alerte-detail-modal';
        
        // Structure HTML pour afficher TOUS les détails récupérés du modèle
        this.dialog.innerHTML = `
            <div style="min-width: 300px;">
                <h3 style="color: #e11d48; margin-top: 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">
                    Détails de l'alerte
                </h3>
                
                <p style="margin: 15px 0;">
                    <strong style="display: block; color: #64748b; font-size: 0.8rem; text-transform: uppercase;">Message</strong>
                    <span id="alerte-msg" style="font-weight: bold; color: #1e293b;"></span>
                </p>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
                    <p>
                        <strong style="display: block; color: #64748b; font-size: 0.8rem; text-transform: uppercase;">Capteur</strong>
                        <span id="alerte-capteur" style="color: #1e293b;"></span>
                    </p>
                    <p>
                        <strong style="display: block; color: #64748b; font-size: 0.8rem; text-transform: uppercase;">Valeur</strong>
                        <span id="alerte-val" style="color: #1e293b;"></span> °C
                    </p>
                </div>

                <p style="background: #f8fafc; padding: 10px; border-radius: 6px; border: 1px solid #e2e8f0;">
                    <strong style="display: block; color: #64748b; font-size: 0.8rem; text-transform: uppercase;">Date du relevé</strong>
                    <span id="alerte-date" style="color: #475569; font-family: monospace;"></span>
                </p>
                
                <form method="dialog" style="text-align: right; margin-top: 20px;">
                    <button style="padding: 8px 16px; background: #334155; color: white; border: none; border-radius: 6px; cursor: pointer;">Fermer</button>
                </form>
            </div>
        `;
        
        this.dialog.style.border = "none";
        this.dialog.style.borderRadius = "12px";
        this.dialog.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)";
        this.dialog.style.padding = "20px";

        document.body.appendChild(this.dialog);
    }

    // Affiche la modale avec les données de l'objet alerteData
    afficherDetail(alerteData) {
        document.getElementById('alerte-msg').textContent = alerteData.message;
        document.getElementById('alerte-capteur').textContent = alerteData.capteur;
        document.getElementById('alerte-val').textContent = alerteData.valeur;
        document.getElementById('alerte-date').textContent = alerteData.date;
        
        this.dialog.showModal(); 
    }

    // ... (méthodes demanderPermissionNotification et afficherStats inchangées)

    envoyerNotificationPush(titre, alerteData) {
        if (Notification.permission === 'granted') {
            const options = {
                body: alerteData.message,
                icon: 'assets/favicon.png' 
            };
            const notif = new Notification(titre, options);

            // Si l'utilisateur clique sur la notification système
            notif.onclick = () => {
                window.focus();
                this.afficherDetail(alerteData); // On affiche la modale avec les détails
            };
        }
    }

    afficherAlertes(alertes) {
        this.container.innerHTML = ''; 
        if (alertes.length === 0) return;

        alertes.forEach(alerteData => {
            const alerteDiv = document.createElement('div');
            alerteDiv.className = 'alerte-box';
            
            // On affiche le message et un petit indicateur de temps (optionnel)
            alerteDiv.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>${alerteData.message}</span>
                    <small style="opacity: 0.6; font-size: 0.7rem;">Cliquer pour détails</small>
                </div>
            `;
            
            // Style de la box
            alerteDiv.style.cursor = 'pointer';
            alerteDiv.style.background = '#ffe4e6'; 
            alerteDiv.style.borderLeft = '5px solid #e11d48';
            alerteDiv.style.padding = '12px';
            alerteDiv.style.marginBottom = '8px';
            alerteDiv.style.borderRadius = '4px';

            // Événement au clic
            alerteDiv.addEventListener('click', () => {
                this.afficherDetail(alerteData);
            });

            this.container.appendChild(alerteDiv);
            this.envoyerNotificationPush("Alerte " + alerteData.capteur, alerteData);
        });
    }

    afficherTemperaturesDirect(int, ext) {
        const valInt = document.getElementById('valeur-int');
        const valExt = document.getElementById('valeur-ext');
        if (valInt) valInt.textContent = int;
        if (valExt) valExt.textContent = ext;
    }
}