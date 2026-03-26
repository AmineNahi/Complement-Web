import EventBus from '../core/EventBus.js';

const Router = (() => {

  // Table de routage
  const _routes = {
    accueil:       () => import('../pages/AccueilPage.js'),
    documentation: () => import('../pages/DocumentationPage.js'),
  };

  // Injection du contenu
  const _outlet = document.getElementById('app-content');

  return {
    init() {
      // Abonnement aux changements de page
      EventBus.on('nav:pageChanged', ({ pageId }) => {
        this._loadPage(pageId);
      });

      // Chargement de la page correspondant à l'URL actuelle au démarrage
      const initialPage = window.location.hash.replace('#', '') || 'accueil';
      this._loadPage(initialPage);
    },

    async _loadPage(pageId) {
      const route = _routes[pageId];

      if (!route) {
        _outlet.innerHTML = `<p>Page introuvable.</p>`;
        return;
      }

      try {
        // Promesse : attente que le module soit chargé
        const module = await route();

        // Tous module expose une fonction render() qui renvoie du HTML
        _outlet.innerHTML = module.default.render();

        // Si la page a besoin de brancher des evenements, elle peut exposer une fonction init
        if (typeof module.default.init === 'function') {
          module.default.init();
        }

      } catch (err) {
        console.error(`Erreur lors du chargement de la page "${pageId}"`, err);
        _outlet.innerHTML = `<p>Une erreur est survenue.</p>`;
      }
    }
  };
})();

export default Router;