class AlertController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.initEvents();

        // Bouton notifications
        const btn = document.getElementById('btn-notifications');
        if (btn) {
        btn.addEventListener('click', () => {
            this.view.demanderPermissionNotification();
        });
        }
    }

    initEvents() {
        if (this.view.btnNotif) {
            this.view.btnNotif.addEventListener('click', () => { 
                this.view.demanderPermissionNotification();
            });
        }
    }
}