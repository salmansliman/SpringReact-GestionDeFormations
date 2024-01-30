# Gestionnaire de Formation

Bienvenue dans notre projet de fin de module - Développement d’une application web pour la gestion d’un centre de formation. Cette application offre une solution complète pour la gestion des documents de projets de formation, la planification des formations, l'affectation des formateurs, la gestion des coûts de formation, et bien plus encore.

## Objectifs

- Gérer les documents des projets de formation.
- Panifier les formations et affecter les formateurs.
- Gérer les coûts de formation.

## Fonctionnalités

1. **Authentification :** Interface d'authentification pour les rôles : admin, formateur et assistant.
2. **Gestion des Formations :** Ajout de formations par l'admin avec spécification du nombre d’heures, du coût, des objectifs et du programme détaillé.
3. **Gestion des Formateurs :** Ajout de formateurs par l'admin avec mots-clés caractérisant leurs compétences.
4. **Gestion des Entreprises :** Ajout d'une liste d'entreprises par l'admin ou l'assistant avec informations telles que nom, adresse, téléphone, url, et email.
5. **Planification des Formations :** Planification d'une nouvelle formation par l'admin ou l'assistant en affectant un formateur et une entreprise à des dates spécifiques sur le calendrier.
6. **Inscription des Individus :** Inscription des individus à une formation via un formulaire dédié sur la page d'accueil.
7. **Page d'Accueil Publique :** Page d'accueil publique affichant toutes les formations avec des filtres sur la catégorie, la ville et la date.
8. **Évaluation des Formations :** Envoi d'un lien aux participants pour évaluer la formation et le formateur.
9. **Inscription des Formateurs Externes :** Inscription d'un formateur externe sur la plateforme en montrant son intérêt et en donnant ses mots-clés.
10. **Aspect Global :** Prise en compte de l'ergonomie, la conception graphique, la modélisation en couche, la sécurité et la simplicité du code.

## Guide de Démarrage

### Backend

1. Importez "Formation-Backend" dans votre Spring Tool Suite ou IntelliJ.
2. Exécutez le projet en tant qu'application Spring Boot.

### Frontend

1. Accédez à "Formation-Frontend".
```bash
cd chemin/vers/Formation-Frontend
```

2. Installez les dépendances.
```bash
npm install --legacy-peer-deps
```

3. Lancez l'application frontend.
```bash
npm run dev
```
Technologies Utilisées
- BackEnd : Spring Boot
- FrontEnd : React + Vute
- Database : MySQL

Merci de prendre le temps d'examiner notre projet. Nous sommes impatients de recevoir vos retours. 🚀


