# Application Todo Full-Stack

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)


Une application complète de liste de tâches React + Node.js + MySQL avec fonctionnalité CRUD complète.

## Fonctionnalités

- ✅ **Frontend (React + Tailwind CSS)**
  - React 18 moderne avec Hooks
  - **Tailwind CSS v3** pour un design professionnel
  - Design entièrement responsive
  - Gestion de tâches en temps réel
  - Interface utilisateur élégante et moderne
  - Animations et transitions fluides
  - Support mobile optimisé

- ✅ **Backend (Node.js + Express)**
  - API RESTful complète
  - Intégration MySQL avec pool de connexions
  - CORS configuré pour communication frontend
  - Gestion d'erreurs robuste
  - Validation des entrées stricte
  - Logging des requêtes

- ✅ **Base de Données (MySQL)**
  - Création automatique des tables
  - Schéma optimisé avec timestamps
  - Données d'exemple incluses
  - Support des transactions

## Structure du Projet

```
fullstack-todo-app/
├── backend/                 # API Node.js Express
│   ├── config/
│   │   └── database.js      # Connexion base de données
│   ├── routes/
│   │   └── todos.js         # Routes API Todo
│   ├── database/
│   │   └── schema.sql       # Schéma base de données
│   ├── .env.example         # Modèle variables d'environnement
│   ├── package.json         # Dépendances backend
│   └── server.js            # Fichier serveur principal
├── frontend/                # Application React
│   ├── src/
│   │   ├── components/      # Composants React
│   │   ├── services/        # Couche service API
│   │   ├── App.jsx          # Composant App principal
│   │   ├── main.jsx         # Point d'entrée React
│   │   └── index.css        # Styles Tailwind CSS
│   ├── index.html           # Modèle HTML
│   ├── package.json         # Dépendances (inclut Tailwind CSS v3)
│   ├── vite.config.js       # Configuration Vite
│   ├── tailwind.config.js   # Configuration Tailwind CSS
│   └── postcss.config.js    # Configuration PostCSS
└── README.md               # Ce fichier
```

## Prérequis

Avant d'exécuter cette application, assurez-vous d'avoir :

- **Node.js** (v14 ou supérieur)
- **MySQL** (v5.7 ou supérieur)
- **npm** ou **yarn**

## Installation et Configuration

### 1. Cloner/Télécharger le Projet

```bash
cd fullstack-todo-app
```

### 2. Configuration de la Base de Données

1. **Créer une base de données MySQL :**
   ```sql
   CREATE DATABASE todo_app_db;
   ```

2. **Optionnel : Exécuter le schéma manuellement (l'app créera automatiquement les tables) :**
   ```bash
   mysql -u votre_nom_utilisateur -p todo_app_db < backend/database/schema.sql
   ```

### 3. Configuration du Backend

1. **Naviguer vers le répertoire backend :**
   ```bash
   cd backend
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement :**
   ```bash
   cp .env.example .env
   ```

4. **Modifier le fichier `.env` avec votre configuration MySQL :**
   ```env
   DB_HOST=localhost
   DB_USER=votre_nom_utilisateur_mysql
   DB_PASSWORD=votre_mot_de_passe_mysql
   DB_NAME=todo_app_db
   DB_PORT=3306
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

5. **Démarrer le serveur backend :**
   ```bash
   # Mode développement (avec redémarrage automatique)
   npm run dev

   # Ou mode production
   npm start
   ```

   Le backend sera disponible à `http://localhost:3001`

### 4. Configuration du Frontend

1. **Ouvrir un nouveau terminal et naviguer vers le répertoire frontend :**
   ```bash
   cd frontend
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   ```

3. **Démarrer le serveur de développement frontend :**
   ```bash
   npm run dev
   ```

   Le frontend sera disponible à `http://localhost:5173`

## Utilisation

1. **Accéder à l'application** à `http://localhost:5173`
2. **Ajouter des tâches** en utilisant le formulaire de saisie
3. **Basculer l'achèvement** en cliquant sur la case à cocher ou le bouton cercle
4. **Supprimer des tâches** en cliquant sur le bouton ✕
5. **Voir les statistiques** en bas de la liste des tâches

## Points de Terminaison API

Le backend fournit les points de terminaison API REST suivants :

| Méthode | Point de Terminaison | Description |
|---------|---------------------|-------------|
| GET | `/api/todos` | Obtenir toutes les tâches |
| GET | `/api/todos/:id` | Obtenir une tâche par ID |
| POST | `/api/todos` | Créer une nouvelle tâche |
| PUT | `/api/todos/:id` | Mettre à jour une tâche |
| DELETE | `/api/todos/:id` | Supprimer une tâche |
| GET | `/api/health` | Vérification de santé |

### Exemple d'Utilisation de l'API

```bash
# Obtenir toutes les tâches
curl http://localhost:3001/api/todos

# Créer une nouvelle tâche
curl -X POST http://localhost:3001/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Apprendre React","completed":false}'

# Basculer l'achèvement d'une tâche
curl -X PUT http://localhost:3001/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Supprimer une tâche
curl -X DELETE http://localhost:3001/api/todos/1
```

## Développement

### Développement Backend

- **Redémarrage automatique :** Utilisez `npm run dev` pour le redémarrage automatique du serveur lors des changements de fichiers
- **Logs :** Vérifiez la console pour le statut de connexion à la base de données et les requêtes API
- **Base de données :** Les tables sont créées automatiquement au premier lancement

### Développement Frontend

- **Rechargement à chaud :** Vite fournit un remplacement de module à chaud instantané
- **Tailwind CSS :** Styles utilitaires avec configuration personnalisée
- **Proxy API :** Configuré pour proxifier les requêtes `/api` vers le backend
- **Gestion d'erreurs :** Vérifiez la console du navigateur pour les erreurs API
- **Responsive :** Design adaptatif pour mobile, tablette et desktop

## Construction pour la Production

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm run build
npm run preview
```

## Dépannage

### Problèmes Courants

1. **Échec de connexion à la base de données**
   - Vérifiez que le serveur MySQL fonctionne
   - Vérifiez les identifiants de la base de données dans `.env`
   - Assurez-vous que la base de données existe

2. **Le frontend ne peut pas se connecter au backend**
   - Assurez-vous que le backend fonctionne sur le port 3001
   - Vérifiez la configuration CORS
   - Vérifiez les URLs API dans le frontend

3. **Port déjà utilisé**
   - Changez le PORT dans le `.env` du backend
   - Utilisez un port différent pour le frontend dans `vite.config.js`

4. **Erreurs de module non trouvé**
   - Exécutez `npm install` dans les répertoires respectifs
   - Supprimez node_modules et réinstallez si nécessaire

### Messages d'Erreur

- **"Échec du chargement des tâches"** - Serveur backend non démarré ou problème de base de données
- **"Échec de l'ajout de tâche"** - Vérifiez les logs du backend pour les erreurs de validation
- **Erreurs réseau** - Vérifiez que les deux serveurs fonctionnent

## Technologies Utilisées

- **Frontend :** React 18, Vite, Axios, Tailwind CSS v3
- **Backend :** Node.js, Express.js, MySQL2
- **Base de données :** MySQL
- **Styling :** Tailwind CSS avec PostCSS et Autoprefixer
- **Développement :** Nodemon, ESLint
- **Build :** Vite (bundling rapide et HMR)

## Fonctionnalités Tailwind CSS

L'application utilise **Tailwind CSS v3** avec les fonctionnalités suivantes :

- **Design System** : Palette de couleurs personnalisée avec thème bleu
- **Responsive Design** : Breakpoints mobiles, tablettes et desktop
- **Composants Stylisés** : Boutons, cartes, formulaires avec états hover/focus
- **Utilitaires Avancés** : Flexbox, Grid, spacing, typography
- **Animations** : Transitions fluides et micro-interactions
- **Mode Sombre** : Prêt pour l'implémentation future

## Licence

Licence MIT
---

**Bon codage ! 🚀**
