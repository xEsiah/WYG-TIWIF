# Projet Final : Application de Gestion de Collection (MEAN)

## 📋 Présentation de WYG-TIWIF

Ce projet est une application Full Stack (MEAN) permettant la gestion complète d'une collection de destinations de voyage et le suivi d'autres utilisateurs.

- **Thème :** Application de gestion de projet de voyage
- **Stack Technique :** MongoDB (Mongoose), Express, Angular, Node.js (JWT pour l'auth)

---

## ✨ Fonctionnalités

### 🧳 Gestion des Destinations (CRUD)

- **Ajout :** Création d'une destination avec pays, budget, villes et recherche d'images via l'API Unsplash.
- **Affichage :** Liste complète des voyages prévus.
- **Modification :** Mise à jour du statut "Visité", du pays, du budget ou des villes.
- **Suppression :** Retrait définitif d'une destination.

### 👥 Social & Profil

- **Système de Follow :** Recherchez et suivez d'autres utilisateurs par leur pseudo.
- **Profil Utilisateur :** Personnalisation de l'avatar parmi une sélection et visualisation des statistiques (abonnés/abonnements).
- **Tableau de Bord :** Vue d'ensemble avec la dernière destination ajoutée et le flux des abonnements.

---

## ⚙️ Prérequis et Installation

Le projet est divisé en deux dossiers : `backend` (API) et `frontend` (Interface).

### 1. Installation des dépendances

```bash
# Installation du Backend
cd backend
npm install

# Installation du Frontend
cd ../frontend
npm install
```

### 2. Variables d'environnement

#### Backend

```plaintext
MONGO_URI=votre_lien_mongodb
JWT_SECRET=votre_cle_secrete
PORT=3000
```

#### Frontend

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000/api",
  unsplashKey: "votre_cle_unsplash",
};
```

### 3. Démarrer le projet

```bash
# Lancer l'application depuis le dossier frontend
npm run dev
```

---

## 🛠 Structure du Projet

- **Backend :** Architecture par endpoints (Routes, Controllers, Models). Middleware d'authentification JWT pour sécuriser les données utilisateur.
- **Frontend :**
  - **Components :** Destinations, Profil, Subscriptions, Auth.
  - **Services :** Centralisation des appels API (AuthService, DestinationService, UserService).
  - **Interceptors :** Injection automatique du token JWT dans les headers de chaque requête.

---

## 🛡️ Authentification

L'accès aux fonctionnalités est protégé par un `authGuard`. Les utilisateurs non connectés sont automatiquement redirigés vers la page de login.

**Comptes de test :**

- Présents dans le dossier ressources avec les variables d'environnements

---
