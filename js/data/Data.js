class Data {
    constructor() {
        this.ListCurrentCapteurs = null;
        this.List50LastValue = [];
        this.apiUrl = "https://api.hothothot.dog/";
        this.wsUri = "wss://ws.hothothot.dog:9502";
        this.apiInterval = null;
    }

    start(onDataReady) {
        this.connectWebSocket(onDataReady);
    }

    connectWebSocket(onDataReady) {
        const websocket = new WebSocket(this.wsUri);

        websocket.addEventListener("open", () => {
            console.log("[WS] Connecté");
            websocket.send("ping");
        });

        websocket.addEventListener("message", (e) => {
            if (e.data === "ping" || e.data === "pong") return;
            
            try {
                const data = JSON.parse(e.data);
                const capteurs = Array.isArray(data) ? data : (data.capteurs || []);
                
                this.updateData(capteurs, onDataReady);
            } catch (err) {
                console.error("[WS] Erreur de parsing:", err);
            }
        });

        websocket.addEventListener("close", () => {
            console.log("[WS] Déconnecté. Bascule sur l'API (toutes les 30s)...");
            this.startApiPolling(onDataReady);
        });
    }

    startApiPolling(onDataReady) {
        if (this.apiInterval) return;

        this.fetchApiData(onDataReady);

        this.apiInterval = setInterval(() => {
            this.fetchApiData(onDataReady);
        }, 30000);
    }

    async fetchApiData(onDataReady) {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const data = await response.json();
            console.log("data",data);
            const capteurs = Array.isArray(data) ? data : (data.capteurs || []);
            console.log("capteurs",capteurs);
            this.updateData(capteurs, onDataReady);
        } catch (error) {
            console.error("[API] Erreur de récupération:", error.message);
        }
    }
    updateData(nouvellesDonnees, onDataReady) {
        this.ListCurrentCapteurs = nouvellesDonnees;

        this.List50LastValue.push(nouvellesDonnees);
        
        if (this.List50LastValue.length > 50) {
            this.List50LastValue.shift(); 
        }

        if (typeof onDataReady === "function") {
            onDataReady(this.ListCurrentCapteurs, this.List50LastValue);
        }
    }
}
