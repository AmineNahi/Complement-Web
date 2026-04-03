const authBtn = document.getElementById('auth-btn');

  authBtn.addEventListener('click', function() {
    if (this.textContent === 'Déconnexion') {
      this.textContent = 'Connexion';
    } else {
      this.textContent = 'Déconnexion';
    }
  });