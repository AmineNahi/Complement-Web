const wsUri = "wss://ws.hothothot.dog:9502";
const apiUrl = "https://api.hothothot.dog/";

const log = (msg) => console.log(`[WebSocket] ${msg}`);

// --- Fallback AJAX sur l'API REST ---
async function demarrerFallbackAPI() {
    log("Passage en mode secours API (AJAX).");

    async function fetchAPI() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            const capteurs = Array.isArray(data) ? data : data.capteurs;
            console.log("[API] données reçues :", capteurs);
            if (capteurs && window.appAlertes) {
                window.appAlertes.traiterDonnees(capteurs);
            }
        } catch (err) {
            console.error("[API] Erreur fetch :", err);
            // Si l'API est aussi inaccessible, on utilise les données mock
            if (window.appAlertes) {
                window.appAlertes.traiterDonnees([
                    { type: "Thermique", Nom: "interieur", Valeur: "16.5", Timestamp: Math.floor(Date.now() / 1000) },
                    { type: "Thermique", Nom: "exterieur", Valeur: "10",   Timestamp: Math.floor(Date.now() / 1000) }
                ]);
            }
        }
    }

    // Premier appel immédiat puis toutes les 5 secondes
    fetchAPI();
    setInterval(fetchAPI, 5000);
}

// --- Connexion WebSocket principale ---
function connecterWebSocket() {
    const websocket = new WebSocket(wsUri);

    websocket.addEventListener("open", () => {
        log("CONNECTED");
        setInterval(() => {
            if (websocket.readyState === WebSocket.OPEN) {
                websocket.send("ping");
            }
        }, 1000);
    });

    websocket.addEventListener("message", (e) => {
        if (e.data === "pong" || e.data === "ping") return;
        try {
            const data = JSON.parse(e.data);
            const capteurs = Array.isArray(data) ? data : data.capteurs;
            console.log("[WS] data brute:", e.data);
            console.log("[WS] capteurs:", capteurs);
            if (capteurs && window.appAlertes) {
                window.appAlertes.traiterDonnees(capteurs);
            }
        } catch (err) {
            console.error("[WS] Erreur parse:", err, e.data);
        }
    });

    websocket.addEventListener("close", (event) => {
        if (!event.wasClean) {
            log("Serveur WebSocket déconnecté. Tentative API REST...");
            demarrerFallbackAPI();
        } else {
            log(`Connexion fermée proprement. Code : ${event.code}`);
        }
    });

    websocket.addEventListener("error", (err) => {
        console.error("[WS] Erreur WebSocket :", err);
    });

    return websocket;
}

// Appelé par index.html APRÈS l'initialisation du MVC
window.connecterWebSocket = connecterWebSocket;