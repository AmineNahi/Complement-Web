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
    displayValue()
  }
});

function displayValue(){
  const main = document.getElementById("capteurs-container")
  // main.innerHTML = "";
  console.log(ListCurrentTemp)
  ListCurrentTemp.forEach((capteur) => {
    const boxCapteur = document.createElement("capteur-thermique")
    boxCapteur.id = "capteur-"+capteur.Nom
    const label = document.createElement("span")
    label.slot = "nom"
    label.textContent = capteur.Nom
    const value = document.createElement("span")
    value.slot = "valeur"
    value.id = "valeur-"+capteur.Nom
    value.textContent = capteur.Valeur
    main.appendChild(boxCapteur)
    boxCapteur.appendChild(label)
    boxCapteur.appendChild(value)
    } 
  ) 
} 

