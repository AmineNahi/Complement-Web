class AlertView {
    constructor() {
        // Cibler l'élément HTML qui contiendra les alertes
        this.container = document.getElementById('alert-container');
    }

    afficherAlertes(alertes) {
        this.container.innerHTML = ''; // On nettoie les anciennes alertes
        
        if (alertes.length === 0) return;

        alertes.forEach(message => {
            // 1. Affichage sur la page (Boîte de dialogue)
            const alerteDiv = document.createElement('div');
            alerteDiv.setAttribute('role', 'alert'); // Important pour l'accessibilité
            alerteDiv.className = 'alerte-box';
            alerteDiv.textContent = message;
            this.container.appendChild(alerteDiv);

            // 2. Déclenchement de la notification Push (si autorisé)
            this.declencherNotification(message);
        });
    }

    declencherNotification(message) {
        if (Notification.permission === 'granted') {
            new Notification("Alerte HotHotHot", { body: message });
        }
    }
}