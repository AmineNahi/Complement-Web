import EventBus from '../core/EventBus.js';

const NavigationView = (() => {
  let _navEl = null;

  return {
    /**
     * Création du DOM et abonnement à l'eventBus
     */
    init(items, currentPage) {
      _navEl = document.querySelector('#main-nav');
      console.log('_navEl trouvé :', _navEl);        // doit afficher l'élément nav
      console.log('items reçus :', items);  
      if (!_navEl) return;

      this._render(items, currentPage);
      this._bindARIA();

      EventBus.on('nav:pageChanged', ({ pageId }) => {
        this._updateActiveLink(pageId);
      });
    },

    /**
     * Construction du HTML du menu
     */
    _render(items, currentPage) {
      _navEl.innerHTML = `
        <ul role="list">
          ${items.map(item => `
            <li>
              
                <a href="${item.href}"
                data-page="${item.id}"
                ${item.id === currentPage ? 'aria-current="page"' : ''}
              >
                ${item.label}
              </a>
            </li>
          `).join('')}
        </ul>
      `;
    },

    /**
     * Mise à jour aria-current
     */
    _updateActiveLink(pageId) {
      _navEl.querySelectorAll('a[data-page]').forEach(link => {
        link.removeAttribute('aria-current');
      });

      const activeLink = _navEl.querySelector(`a[data-page="${pageId}"]`);
      if (activeLink) {
        activeLink.setAttribute('aria-current', 'page');
      }
    },

    /**
     * Indiquer les clics sur les liens au controller via l'EventBus
     */
    _bindARIA() {
      _navEl.addEventListener('click', (e) => {
        const link = e.target.closest('a[data-page]');
        if (!link) return;

        e.preventDefault();

        const pageId = link.dataset.page;
        EventBus.emit('nav:linkClicked', { pageId });
      });
    }
  };
})();

export default NavigationView;