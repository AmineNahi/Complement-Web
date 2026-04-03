class Data {
  constructor() {
    this.ListCurrentCapteurs = null;
    this.apiUrl = "https://api.hothothot.dog/";
    // this.wsUri = "wss://ws.hothothot.dog:9502";
    this.wsUri = ".";
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
