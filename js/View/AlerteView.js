class AlertView {
    constructor() {
        this.container = document.getElementById('alert-container');
        this.btnNotif = document.getElementById('btn-notifications');
        this.creerBoiteDeDialogue();
    }

    creerBoiteDeDialogue() {
        this.dialog = document.createElement('dialog');
        this.dialog.id = 'alerte-detail-modal';
        this.dialog.setAttribute('aria-modal', 'true');
        this.dialog.setAttribute('aria-labelledby', 'alerte-dialog-title');
        this.dialog.innerHTML = `
            <div style="min-width: 300px;">
                <h3 id="alerte-dialog-title" style="color: #e11d48; margin-top: 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">
                    Détails de l'alerte
                </h3>
                <p>
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
                    <button
                        style="padding: 8px 16px; background: #334155; color: white; border: none; border-radius: 6px; cursor: pointer;"
                        aria-label="Fermer la boîte de dialogue"
                    >Fermer</button>
                </form>
            </div>
        `;
        this.dialog.style.cssText = "border: none; border-radius: 12px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); padding: 20px;";
        document.body.appendChild(this.dialog);
    }

    afficherDetail(alerteData) {
        document.getElementById('alerte-msg').textContent = alerteData.message;
        document.getElementById('alerte-capteur').textContent = alerteData.capteur;
        document.getElementById('alerte-val').textContent = alerteData.valeur;
        document.getElementById('alerte-date').textContent = alerteData.date;
        this.dialog.showModal();
    }

    demanderPermissionNotification() {
        if ('Notification' in window) {
            Notification.requestPermission();
        } else {
            console.warn("Les notifications ne sont pas supportées par ce navigateur.");
        }
    }

    envoyerNotificationPush(titre, alerteData) {
        if ('Notification' in window && Notification.permission === 'granted') {
            const notif = new Notification(titre, {
                body: alerteData.message,
                icon: 'assets/favicon.png'
            });
            notif.onclick = () => {
                window.focus();
                this.afficherDetail(alerteData);
            };
        }
    }

    afficherAlertes(alertes) {
        this.container.innerHTML = '';

        if (alertes.length === 0) return; // Rien à afficher

        alertes.forEach(alerteData => {
            const div = document.createElement('div');
            div.setAttribute('role', 'alert');
            div.className = 'alerte-box';
            div.textContent = alerteData.message;
            div.setAttribute('tabindex', '0'); // Focusable au clavier
            div.setAttribute('aria-label', `Alerte : ${alerteData.message}. Cliquer pour les détails.`);
            div.style.cssText = "cursor: pointer; background: #ffe4e6; border-left: 5px solid #e11d48; padding: 15px; margin-bottom: 10px; border-radius: 4px;";

            // Ouverture au clic ET à la touche Entrée (accessibilité clavier)
            const ouvrirDetail = () => this.afficherDetail(alerteData);
            div.addEventListener('click', ouvrirDetail);
            div.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    ouvrirDetail();
                }
            });

            this.container.appendChild(div);
            this.envoyerNotificationPush("Alerte Domotique", alerteData);
        });
    }
}