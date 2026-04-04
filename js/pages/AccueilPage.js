const AccueilPage = {
  render() {
    return `
        <h1>Tableau de bord domotique</h1> 

        <div class="actions-container">
            <button id="btn-notifications">Activer les notifications</button>
        </div>

        <div id="stats-container"></div>
        <div id="alert-container" aria-live="polite"></div>
        
        <div role="tablist" aria-label="Navigation des sections">
          <button class="button-onglet" role="tab" aria-selected="true" aria-controls="panel-infos" tabindex="0">
            Informations
          </button>
          <button class="button-onglet" role="tab" aria-selected="false" aria-controls="panel-historique" tabindex="-1">
            Historique
          </button>
        </div>

        <div id="panel-infos" role="tabpanel">
          <div class="capteurs-container" id="capteurs-container"></div>
        </div>

        <div id="panel-historique" role="tabpanel" hidden>
          <div class="historique-container" id="historique-container"></div>
        </div>

        <div class="graph-container">
            <h2>Historique des 50 dernières valeurs</h2>
            <canvas id="historique-graph"></canvas>
        </div>

    <template id="capteur-template">
        <link rel="stylesheet" href="./css/styleAcceuil.css">
        <div class="capteur-box" role="region" aria-label="Capteur de température">
            <div class="nom"><slot name="nom">Capteur Inconnu</slot></div>
            <div class="valeur"><slot name="valeur">0</slot> °C</div>
        </div>
    </template>
    <script src="./js/data/webSocket.js"></script>
    <script>
        customElements.define('capteur-thermique',
            class extends HTMLElement {
                constructor() {
                    super();
                    const template = document.getElementById('capteur-template').content;
                    this.attachShadow({mode: 'open'}).appendChild(template.cloneNode(true));
                }
            }
        );
    </script>
    `;
  },

  init() {
    // --- CORRECTION 1 : Instanciation de AlertView, AlertModel, AlertController ---
    const alerteView    = new AlertView();
    const alerteModel   = new AlertModel();
    const alerteController = new AlertController(alerteModel, alerteView);

    // --- CORRECTION 2 : Une seule instance de Data pour tout ---
    const dataClass = new Data();

    let vueHistorique;
    try {
      vueHistorique = new GraphView();
    } catch (e) {
      console.error("Problème avec le graphique :", e);
    }

    this._initOnglets();

    dataClass.start((currentCapteurs, historique) => {

      // Mise à jour du graphique
      if (vueHistorique && historique.length > 0) {
        vueHistorique.updateGraph(historique);
      }

      // Mise à jour de l'historique texte
      const boxHistoryContainer = document.getElementById("historique-container");
      if (boxHistoryContainer) {
        boxHistoryContainer.innerHTML = '';
        historique.forEach((groupeCapteurs) => {
          const row = document.createElement('div');
          row.classList.add("capteur-box");
          let texteLigne = "";
          if (groupeCapteurs.length > 0) {
            let ts = groupeCapteurs[0].Timestamp;
            const date = new Date(ts.toString().length === 10 ? ts * 1000 : ts);
            texteLigne += `[${date.toLocaleTimeString('fr-FR')}] `;
          }
          groupeCapteurs.forEach(capteur => {
            texteLigne += `${capteur.Nom}: ${capteur.Valeur}°C | `;
          });
          row.textContent = texteLigne;
          boxHistoryContainer.appendChild(row);
        });
      }

      // Mise à jour des capteurs affichés
      const container = document.getElementById('capteurs-container');
      if (container) container.innerHTML = '';
      if (currentCapteurs && currentCapteurs.length > 0) {
        currentCapteurs.forEach((item) => {
          const capteur = new CapteurModel(item.type, item.Nom, item.Valeur, item.Timestamp);
          capteur.displayValue();
        });
      }

      // --- CORRECTION 3 : Brancher les alertes sur les données reçues ---
      const capteurInt = currentCapteurs.find(c => c.Nom.toLowerCase() === 'interieur');
      const capteurExt = currentCapteurs.find(c => c.Nom.toLowerCase() === 'exterieur');

      if (capteurInt && capteurExt) {
        const result = alerteModel.mettreAJourDonnees(
          parseFloat(capteurInt.Valeur),
          parseFloat(capteurExt.Valeur)
        );
        alerteView.afficherAlertes(result.alertes);
        alerteView.afficherStats(result.stats);
      }
    });
  },

  _initOnglets() {
    const tabs   = document.querySelectorAll('[role="tab"]');
    const panels = document.querySelectorAll('[role="tabpanel"]');

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => {
          t.classList.remove('active-tab');
          t.setAttribute('aria-selected', 'false');
          t.setAttribute('tabindex', '-1');
        });
        panels.forEach(p => { p.hidden = true; });

        tab.classList.add('active-tab');
        tab.setAttribute('aria-selected', 'true');
        tab.setAttribute('tabindex', '0');
        panels[i].hidden = false;
      });
    });
  }
};

export default AccueilPage;