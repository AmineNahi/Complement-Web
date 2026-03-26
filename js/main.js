import NavController from './controllers/NavController.js';
import Router from './router/Router.js';

// Le Controller init le Model et la View puis le Router s'abonne à l'EventBus
NavController.init();
Router.init();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log('Service Worker enregistré'))
    .catch(err => console.error('Erreur SW :', err));
}