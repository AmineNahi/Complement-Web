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
          <button class = "button-onglet" role="tab" aria-selected="true" aria-controls="panel-infos" tabindex="0">
            Informations
          </button>
          <button class = "button-onglet" role="tab" aria-selected="false" aria-controls="panel-historique" tabindex="-1">
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
            <h2>Historique des 50 derniers valeurs</h2>
            <canvas id="historique-graph"></canvas>
        </div>
    </main> 

    <template id="capteur-template">
        <link rel="stylesheet" href="./css/styleAcceuil.css">
        <div class="capteur-box" role="region" aria-label="Capteur de température">
            <div class="nom"><slot name="nom">Capteur Inconnu</slot></div>
            <div class="valeur"><slot name="valeur">0</slot> °C</div>
        </div>
    </template>
     <script src = "./js/data/webSocket.js"></script>
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
    let vueHistorique;

    try {
      vueHistorique = new GraphView();
    } catch (e) {
      console.error("Problème avec le graphique :", e);
    }

    this._initOnglets();

    const dataClass = new Data();
    dataClass.start((currentCapteurs, historique) => {
        
        if (vueHistorique && historique.length > 0) {
            vueHistorique.updateGraph(historique);
        }
    });
  },
  _initOnglets() {
    const tabs   = document.querySelectorAll('[role="tab"]');
    const panels = document.querySelectorAll('[role="tabpanel"]');

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        // Désactiver tous les onglets
        tabs.forEach(t => {
          t.classList.remove('active-tab');
          t.setAttribute('aria-selected', 'false');
          t.setAttribute('tabindex', '-1');
        });

        // Cacher tous les panels
        panels.forEach(p => { p.hidden = true; });

        // Activer l'onglet cliqué
        tab.classList.add('active-tab');
        tab.setAttribute('aria-selected', 'true');
        tab.setAttribute('tabindex', '0');

        // Afficher le panel correspondant
        panels[i].hidden = false;
      });
    });
  }
};

export default AccueilPage;