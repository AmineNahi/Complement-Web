class Data {
  constructor() {
    this.ListCurrentCapteurs = null;
    this.apiUrl = "https://api.hothothot.dog/";
    this.wsUri = "wss://ws.hothothot.dog:9502";
    //this.wsUri = ".";
  }

  loadData(){
    // --- Connexion WebSocket ---
    const websocket = new WebSocket(wsUri);

    websocket.addEventListener("open", () => {
        log("CONNECTED");
        websocket.send("ping");
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
            log("Déconnecté. Tentative API REST...");
            getData();
        } else {
            log(`Connexion fermée proprement. Code : ${event.code}`);
        }
    });

    websocket.addEventListener("error", (err) => {
        console.error("[WS] Erreur WebSocket :", err);
    });
  }
  
  loadData(){
    const websocket = new WebSocket(this.wsUri);
    websocket.addEventListener("open", () => {
      log("CONNECTED");
      pingInterval = setInterval(() => {
        log(`SENT: ping: ${counter}`);
        websocket.send("ping");
      }, 1000);
    });

    websocket.addEventListener("message", (e) =>{
      const message = JSON.parse(e.data);
      log(`RECEIVED: ${message.iteration}: ${message.content}`);
      counter++;
      console.log(message)
    });

    websocket.addEventListener("close", async (event) => {
      // event.wasClean est false si la connexion a crashé ou n'a pas pu s'établir
      if (!event.wasClean) {
        console.log("Le serveur WebSocket ne fonctionne pas ou la connexion a été perdue. Adoption de la méthode API AJAX.");

        // Lancement de ton plan de secours
        let val = await getData();
        if (val.capteurs){
          ListCurrentTemp = (val.capteurs)
        }
        console.log(ListCurrentTemp)
      }
    }); 
  }
  async getData(){
    console.log("la")
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      return(result)

    } catch (error) {
      console.error(error.message);
    }
  }
}
