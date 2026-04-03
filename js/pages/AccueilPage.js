const AccueilPage = {
  render() {
    return `
      <section aria-labelledby="titre-accueil">
        <h1 id="titre-accueil">Tableau de bord</h1>

        <!-- Bouton notifications -->
        <button id="btn-notifications" style="margin: 1rem 0;">
          Activer les notifications
        </button>

        <!-- Alertes -->
        <div id="alert-container" aria-live="polite"></div>

        <!-- Onglets -->
        <div role="tablist" aria-label="Navigation des sections">
          <button role="tab" aria-selected="true" aria-controls="panel-historique" tabindex="0">
            Historique
          </button>
          <button role="tab" aria-selected="false" aria-controls="panel-infos" tabindex="-1">
            Informations
          </button>
        </div>

        <!-- Panel historique — visible par défaut, PAS d'attribut hidden -->
        <div id="panel-historique" role="tabpanel">
          <canvas id="historique-graph" aria-label="Graphique des températures"></canvas>
        </div>

        <!-- Panel informations — caché par défaut -->
        <div id="panel-infos" role="tabpanel" hidden>

          <!-- Capteurs — uniquement dans ce panel -->
          <div class="capteurs-grid">
            <capteur-thermique>
              <span slot="nom">Intérieur</span>
              <span id="valeur-int" slot="valeur">--</span>
            </capteur-thermique>
            <capteur-thermique>
              <span slot="nom">Extérieur</span>
              <span id="valeur-ext" slot="valeur">--</span>
            </capteur-thermique>
          </div>

        </div>

      </section>
    `;
  },

  init() {
    try {
      new HistoriqueView();
    } catch (e) {
      console.error("Problème avec le graphique :", e);
    }

    try {
      new AlertController(new AlertModel(), new AlertView());
    } catch (e) {
      console.warn("MVC alertes non actif :", e);
    }

    this._initOnglets();
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