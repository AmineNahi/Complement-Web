class AlertView {
    constructor() {
        this.container = document.getElementById('alert-container');
        this.btnNotif = document.getElementById('btn-notifications');
        this.statsContainer = document.getElementById('stats-container'); 
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
            } else {
                console.log("L'utilisateur a refusé les notifications.");
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
        }
    }

    afficherStats(stats) {
        this.statsContainer.innerHTML = `
            <div>
                <strong>Intérieur :</strong> Min ${stats.interieur.min}°C | Max ${stats.interieur.max}°C
            </div>
            <div>
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
            this.container.appendChild(alerteDiv);
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