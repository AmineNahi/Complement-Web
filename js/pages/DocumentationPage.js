const DocumentationPage = {
  render() {
    return `
    <div id="page-doc">
        <div class="container">
            <h1>Documentation du projet HotHotHot</h1>
            
            <h2>Présentation de l'équipe :</h2>
            <ul>
                <li><strong>Acemyan--de Oliveira</strong> : Développeur</li>
                <li><strong>Atherly Evan</strong> : Développeur</li>
                <li><strong>Nahi Amine</strong> : Développeur</li>
                <li><strong>Palot Thomas</strong> : Développeur</li>
            </ul>

            <h2>Outils utilisés et organisation :</h2>
            <ul>
                <li>
                    <strong>Dépôt git :</strong> 
                    <a href="https://github.com/AmineNahi/Complement-Web" target="_blank" rel="noopener noreferrer">
                        Lien vers le dépôt GitHub
                    </a>
                </li>
                <li>
                    <strong>Gestion de projet :</strong> 
                    Utilisation de Git et GitHub pour le versionnement du code et le travail collaboratif. 
                    Organisation du projet en architecture MVC (Model - View - Controller) afin de séparer les responsabilités. 
                    Répartition des tâches entre les membres de l'équipe et communication régulière pour suivre l'avancement. 
                </li>
                <li>
                    <strong>Principales difficultés :</strong> 
                    Mise en place du Service Worker, 
                    configuration du manifest.json pour rendre la PWA installable,  
                    configuration du certificat pour le HTTPS,
                </li>
                <li>
                    <strong>Changements si le projet devait être recommencé :</strong> 
                    Tester plus tôt les fonctionnalités PWA, 
                    ajouter des tests réguliers pour détecter rapidement les erreurs, 
                    et améliorer la gestion des erreurs dans le Service Worker.
                </li>
            </ul>
        </div>
    </div>
    `;
  }
};

export default DocumentationPage;