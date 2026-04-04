class CapteurModel {
    constructor(type, name, temp, timestamp) {
        this.type = type;
        this.name = name;
        this.temp = temp;
        this.timeStamp = timestamp;
    }

    displayValue() {
        // console.log(this.name, this.type, this.temp,this.timeStamp)
        const boxCapteur = document.createElement("capteur-thermique");
        boxCapteur.id = "capteur-" + this.name;
        boxCapteur.classList.add("capteur-box")
        
        const label = document.createElement("span");
        label.slot = "nom";
        label.classList.add("nom");
        label.textContent = this.name;
        
        const value = document.createElement("span");
        value.slot = "valeur";
        value.classList.add("valeur");
        value.id = "valeur-" + this.name;
        value.textContent = this.temp + "°C";
        
        const main = document.getElementById('capteurs-container')
        // const main = document.querySelector('main'); 
        if (main) {
            main.appendChild(boxCapteur);
            boxCapteur.appendChild(label);
            boxCapteur.appendChild(value);
        }
    }
}