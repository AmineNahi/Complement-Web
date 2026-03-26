const wsUri = "wss://ws.hothothot.dog:9502";
const apiUrl ="https://api.hothothot.dog/";

let ListCurrentTemp = [];

async function getData(){
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return(result)

  } catch (error) {
    console.error(error.message);
  }
}

const websocket = new WebSocket(wsUri);
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
});

websocket.addEventListener("close", async (event) => {
  // event.wasClean est false si la connexion a crashé ou n'a pas pu s'établir
  if (!event.wasClean) {
    console.log("Le serveur WebSocket ne fonctionne pas ou la connexion a été perdue. Adoption de la méthode API AJAX.");

    // Lancement de ton plan de secours
    // let val = await getData();
    let val = {"HotHotHot":"Api v1.0",
      "capteurs":
      [{"type":"Thermique",
      "Nom":"interieur",
      "Valeur":"16.5",
      "Timestamp":1774513321},{"type":"Thermique",
      "Nom":"exterieur",
      "Valeur":"10",
      "Timestamp":1774513321}]
    }
    if (val.capteurs){
      ListCurrentTemp = (val.capteurs)
    }
    displayValue()
  }
});

function displayValue(){
  const main = document.getElementById("capteurs-container")
  // main.innerHTML = "";
  console.log(ListCurrentTemp)
  ListCurrentTemp.forEach((capteur) => {
      const nameCapteur = document.createElement("div")
      nameCapteur.textContent = capteur.Nom
      const currentTemp = document.createElement("div")
      currentTemp.textContent = capteur.Value 

      const slotTemp = document.createElement("div")
      slotTemp.appendChild(currentTemp)
      slotTemp.appendChild(nameCapteur)
      main.appendChild(slotTemp)
    } 
  ) 
} 

