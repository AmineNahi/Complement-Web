class AlertController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.initWebSocket();
    }

    initWebSocket() {
        // Connexion au serveur WebSocket 
        this.socket = new WebSocket('wss://ws.hothothot.dog:9502');

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data); 
            const alertes = this.model.analyserTemperatures(data.int, data.ext);
            this.view.afficherAlertes(alertes);
        };
    }
}

// Initialisation de l'application
const appAlertes = new AlertController(new AlertModel(), new AlertView());