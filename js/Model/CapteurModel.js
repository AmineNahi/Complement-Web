class CapteurModel {
    constructor(type, name, temp, timestamp) {
        this.type = type;
        this.name = name;
        this.temp = temp;
        this.timeStamp = timestamp;
    }

    displayValue() {
        console.log(this.name, this.type, this.temp,this.timeStamp)
        const boxCapteur = document.createElement("capteur-thermique");
        boxCapteur.id = "capteur-" + this.name;
        
        const label = document.createElement("span");
        label.slot = "nom";
        label.textContent = this.name;
        
        const value = document.createElement("span");
        value.slot = "valeur";
        value.id = "valeur-" + this.name;
        value.textContent = this.temp;
        
        const main = document.getElementById('capteurs-container')
        if (main) {
            main.appendChild(boxCapteur);
            boxCapteur.appendChild(label);
            boxCapteur.appendChild(value);
        }
    }
}