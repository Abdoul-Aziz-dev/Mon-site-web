# 🎓 GSEAB - Système de Gestion Scolaire

![Next.js](https://img.shields.io/badge/Next.js-16.2.1-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-green)
![MySQL](https://img.shields.io/badge/MySQL-Database-orange)

Système de gestion scolaire complet pour le **Groupe Scolaire Elhadj Amadou Barry (GSEAB)** développé avec Next.js, React 19, Prisma et MySQL.

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [Structure du projet](#-structure-du-projet)
- [API Routes](#-api-routes)
- [Déploiement](#-déploiement)
- [Identifiants de test](#-identifiants-de-test)

## ✨ Fonctionnalités

### 🔐 Authentification
- Système de login multi-rôles (Élève, Enseignant, Admin)
- Inscription avec validation
- Sessions sécurisées avec localStorage
- Protection des routes par rôle

### 👨🎓 Espace Élève
- Tableau de bord personnalisé
- Consultation des cours et notes
- Emploi du temps
- Messagerie avec les enseignants
- Profil dynamique

### 🧑🏫 Espace Enseignant
- Gestion des classes
- Saisie et modification des notes
- Publication d'annonces
- Messagerie avec les élèves
- Consultation de l'emploi du temps

### 🛡️ Espace Administrateur
- Gestion complète des étudiants (CRUD)
- Gestion des enseignants (CRUD)
- Gestion des cours (CRUD)
- Publication d'actualités
- Paramètres du site
- Messagerie globale

### 🌐 Pages Publiques
- Page d'accueil avec actualités
- Présentation de l'école
- Liste des cours
- Page de contact
- Dark mode

## 🛠️ Technologies

- **Framework:** Next.js 16.2.1 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript
- **Database:** MySQL
- **ORM:** Prisma
- **Styling:** CSS-in-JS (inline styles)
- **Server:** Node.js

## 📦 Installation

### Prérequis

- Node.js 18+ 
- MySQL 8+
- npm ou yarn

### Étapes

1. **Cloner le repository**
```bash
git clone https://github.com/votre-username/school-app.git
cd school-app
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer la base de données**
```bash
# Créer la base de données MySQL
mysql -u root -p
CREATE DATABASE gseab;
exit;
```

4. **Configurer les variables d'environnement**
```bash
# Copier le fichier .env.example
cp .env.example .env

# Éditer .env avec vos informations
DATABASE_URL="mysql://root:votre_password@localhost:3306/gseab"
```

5. **Initialiser Prisma**
```bash
npx prisma generate
npx prisma db push
```

6. **Importer les données de test (optionnel)**
```bash
# Utiliser les fichiers SQL dans le dossier mabase/
mysql -u root -p gseab < mabase/01_init.sql
mysql -u root -p gseab < mabase/02_seed.sql
```

7. **Lancer le serveur de développement**
```bash
npm run dev
```

8. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

## ⚙️ Configuration

### Base de données

Le fichier `prisma/schema.prisma` contient 17 modèles :
- admin, student, teacher
- course, classroom, enrollment
- grade, schedule
- news, announcement
- message, teachermessage, studentmessage
- adminstudentmessage, adminteachermessage
- session, settings

### Variables d'environnement

Créez un fichier `.env` à la racine :
```env
DATABASE_URL="mysql://root@localhost:3306/gseab"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 🚀 Utilisation

### Commandes disponibles

```bash
# Développement
npm run dev

# Build production
npm run build

# Démarrer en production
npm start

# Linter
npm run lint

# Prisma Studio (interface DB)
npx prisma studio
```

## 📁 Structure du projet

```
school-app/
├── app/
│   ├── api/              # Routes API (42 endpoints)
│   ├── admin/            # Interface administrateur
│   ├── teacher/          # Interface enseignant
│   ├── student/          # Interface élève
│   ├── components/       # Composants réutilisables
│   ├── login/            # Page de connexion
│   ├── register/         # Page d'inscription
│   └── (pages publiques) # Homepage, about, contact, etc.
├── lib/
│   └── prisma.ts         # Client Prisma
├── prisma/
│   └── schema.prisma     # Schéma de base de données
├── public/               # Assets statiques
└── mabase/               # Scripts SQL
```

## 🔌 API Routes

### Authentification
- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription

### Étudiants
- `GET /api/students` - Liste des étudiants
- `POST /api/students` - Créer un étudiant
- `GET /api/students/[id]` - Détails d'un étudiant
- `PUT /api/students/[id]` - Modifier un étudiant
- `DELETE /api/students/[id]` - Supprimer un étudiant

### Enseignants
- `GET /api/teachers` - Liste des enseignants
- `POST /api/teachers` - Créer un enseignant
- `GET /api/teachers/[id]` - Détails d'un enseignant
- `PUT /api/teachers/[id]` - Modifier un enseignant
- `DELETE /api/teachers/[id]` - Supprimer un enseignant

### Cours
- `GET /api/courses` - Liste des cours
- `POST /api/courses` - Créer un cours
- `PUT /api/courses/[id]` - Modifier un cours
- `DELETE /api/courses/[id]` - Supprimer un cours

### Notes
- `GET /api/grades` - Liste des notes
- `POST /api/grades` - Ajouter une note

### Actualités
- `GET /api/news` - Liste des actualités
- `POST /api/news` - Créer une actualité
- `PUT /api/news/[id]` - Modifier une actualité
- `DELETE /api/news/[id]` - Supprimer une actualité

### Autres
- `GET /api/schedule` - Emplois du temps
- `GET /api/classrooms` - Classes
- `POST /api/messages` - Envoyer un message
- `POST /api/teacher/reply` - Répondre à un message

## 🌍 Déploiement

Consultez le fichier `DEPLOIEMENT_AWS.md` pour un guide complet de déploiement sur AWS EC2.

### Build de production

```bash
npm run build
npm start
```

## 🔑 Identifiants de test

### Élève
```
Email: mamadou.diallo@gseab.gn
Password: password123
```

### Enseignant
```
Email: alpha.diallo@gseab.gn
Password: password123
```

### Administrateur
```
Email: groupe8@gmail.com
Password: groupe8@@22
```

## 📊 Statistiques

- **42 pages** générées
- **42 routes API**
- **17 modèles** de base de données
- **50+ composants** React
- **0 erreurs** TypeScript
- **100% fonctionnel**

## 🔒 Sécurité

⚠️ **Important pour la production:**
- Implémenter bcrypt pour le hachage des mots de passe
- Utiliser JWT pour les sessions
- Configurer HTTPS
- Ajouter rate limiting sur les API
- Valider toutes les entrées utilisateur
- Sécuriser les variables d'environnement

## 📝 License

Ce projet est développé pour le Groupe Scolaire Elhadj Amadou Barry (GSEAB).

## 👥 Contributeurs

- Développé par Groupe 8

## 📞 Support

Pour toute question ou problème, consultez la documentation ou créez une issue sur GitHub.

---

**Fait avec ❤️ pour GSEAB**
