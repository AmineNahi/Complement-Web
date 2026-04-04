// js/Controllers/AlerteController.js
class AlertController {
  constructor(model, view) {
    this.model = model;
    this.view  = view;
    this.initEvents();
  }

  initEvents() {
    const btn = document.getElementById('btn-notifications');
    if (btn) {
      btn.addEventListener('click', () => {
        this.view.demanderPermissionNotification();
      });
    }
  }
}