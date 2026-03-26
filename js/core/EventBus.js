const EventBus = (() => {
  const _listeners = {};

  return {
    /**
     * S'abonner à un événement
     * @param {string} event  - nom de l'événement
     * @param {Function} cb   - fonction appelée quand l'événement est émis
     */
    on(event, cb) {
      if (!_listeners[event]) _listeners[event] = [];
      _listeners[event].push(cb);
    },

    /**
     * Émettre un événement
     * @param {string} event  - nom de l'événement
     * @param {*} data        - données transmises aux abonnés
     */
    emit(event, data) {
      (_listeners[event] || []).forEach(cb => cb(data));
    },

    /**
     * Se désabonner
     */
    off(event, cb) {
      if (!_listeners[event]) return;
      _listeners[event] = _listeners[event].filter(fn => fn !== cb);
    }
  };
})();

export default EventBus;