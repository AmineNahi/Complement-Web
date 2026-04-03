
class CapteurModel {
    constructor() {
        this.tempInt = null;
        this.tempExt = null;
    }

    traiterDonnees(capteurs) {
        capteurs.forEach(c => {
            const nom = c.Nom ? c.Nom.toLowerCase() : "";
            if (nom === "interieur") this.tempInt = parseFloat(c.Valeur);
            else if (nom === "exterieur") this.tempExt = parseFloat(c.Valeur);
        });

        if (this.tempInt !== null && this.tempExt !== null) {
            return { int: this.tempInt, ext: this.tempExt };
        }
        return null;
    }
}