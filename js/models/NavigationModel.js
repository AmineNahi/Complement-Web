import EventBus from '../core/EventBus.js';

const NavigationModel = (() => {
  let _state = {
    currentPage: 'accueil',
    items: [
      { id: 'accueil',       label: 'Accueil',        href: '#accueil' },
      { id: 'documentation', label: 'Documentation',  href: '#documentation' }
    ]
  };

  return {
    getItems() {
      return [..._state.items];
    },

    getCurrentPage() {
      return _state.currentPage;
    },

    /**
     * Changer la page active
     */
    setCurrentPage(pageId) {
      const exists = _state.items.some(item => item.id === pageId);
      if (!exists) return;

      _state.currentPage = pageId;

      EventBus.emit('nav:pageChanged', { pageId });
    }
  };
})();

export default NavigationModel;