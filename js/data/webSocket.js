class Data {
    constructor() {
        this.wsUri = "wss://ws.hothothot.dog:9502";
        this.apiUrl = "https://api.hothothot.dog/";
        this.websocket = null;
        this.intervalAPI = null; 
    }

    log(msg) {
        console.log(`[WebSocket] ${msg}`);
    }

    loadData() {
        this.websocket = new WebSocket(this.wsUri);

        this.websocket.addEventListener("open", () => {
            this.log("CONNECTED");
            this.websocket.send("ping");
            
            setInterval(() => {
                if (this.websocket.readyState === WebSocket.OPEN) {
                    this.websocket.send("ping");
                }
            }, 1000);
        });

        this.websocket.addEventListener("message", (e) => {
            if (e.data === "pong" || e.data === "ping") return;
            try {
                const data = JSON.parse(e.data);
                const capteurs = Array.isArray(data) ? data : data.capteurs;
                
                if (capteurs && window.appCapteurs) {
                    window.appCapteurs.mettreAJourDonnees(capteurs);
                }
            } catch (err) {
                console.error("[WS] Erreur parse:", err, e.data);
            }
        });

        this.websocket.addEventListener("close", (event) => {
            if (!event.wasClean) {
                this.log("Déconnecté. Tentative API REST...");
                this.demarrerFallbackAPI();
            } else {
                this.log(`Connexion fermée proprement. Code : ${event.code}`);
            }
        });

        this.websocket.addEventListener("error", (err) => {
            console.error("[WS] Erreur WebSocket :", err);
        });
    }


    async fetchAPI() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            const capteurs = Array.isArray(data) ? data : data.capteurs;
            console.log("[API] données reçues :", capteurs);
            
            if (capteurs && window.appCapteurs) {
                window.appCapteurs.mettreAJourDonnees(capteurs);
            }
        } catch (err) {
            console.error("[API] Erreur fetch :", err);
        }
    }

    demarrerFallbackAPI() {
        this.log("Passage en mode secours API (AJAX).");
        
        this.fetchAPI();
        
        if (!this.intervalAPI) {
            this.intervalAPI = setInterval(() => {
                this.fetchAPI();
            }, 5000);
        }
    }
}