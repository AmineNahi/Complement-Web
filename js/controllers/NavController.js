import EventBus from '../core/EventBus.js';
import NavigationModel from '../models/NavigationModel.js';
import NavigationView from '../views/NavigationView.js';

const NavController = (() => {
  return {

    init() {
      // Récupération de l'état initial du modèle
      const items = NavigationModel.getItems();
      const currentPage = NavigationModel.getCurrentPage();

      // Initialisations de la vue avec les données récupérées précédemment
      NavigationView.init(items, currentPage);

      // Ecoute des actions utilisateur
      EventBus.on('nav:linkClicked', ({ pageId }) => {
        this._handleNavigation(pageId);
      });

      // Gestion du bouton de retour
      window.addEventListener('popstate', (e) => {
        const pageId = e.state?.pageId ?? 'accueil';
        this._handleNavigation(pageId, false);
      });
    },

    _handleNavigation(pageId, pushHistory = true) {
      // Controller indique au modèle de changer d'état
      NavigationModel.setCurrentPage(pageId);
      
      if (pushHistory) {
        history.pushState({ pageId }, '', `#${pageId}`);
      }
    }
  };
})();

export default NavController;