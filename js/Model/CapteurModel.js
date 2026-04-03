/**
 * CapteurModel
 * 
 * Note : Ce modèle n'est pas utilisé dans l'architecture MVC actuelle.
 * La logique de traitement des capteurs est centralisée dans AlertModel
 * qui gère à la fois les températures et les alertes.
 * 
 * Ce fichier est conservé pour référence. Si vous souhaitez séparer les
 * responsabilités, vous pouvez déléguer la lecture des valeurs brutes à
 * cette classe et laisser AlertModel uniquement gérer les seuils.
 */
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