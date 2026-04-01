# 🚀 GUIDE COMPLET DE DÉPLOIEMENT - GSEAB SUR AWS EC2

**Projet:** Système de Gestion Scolaire GSEAB  
**Date:** Avril 2025  
**Serveur:** AWS EC2 (Amazon Linux)  
**URL:** http://13.60.231.236:3000  
**Développeur:** Abdoul-Aziz-dev

---

## 📋 TABLE DES MATIÈRES

1. [Prérequis](#prérequis)
2. [Configuration de la base de données MySQL](#configuration-mysql)
3. [Clonage du projet depuis GitHub](#clonage-github)
4. [Configuration de l'environnement](#configuration-environnement)
5. [Installation des dépendances](#installation-dépendances)
6. [Configuration Prisma et base de données](#configuration-prisma)
7. [Import des données de test](#import-données)
8. [Configuration Next.js](#configuration-nextjs)
9. [Lancement de l'application](#lancement-application)
10. [Configuration AWS Security Group](#configuration-security-group)
11. [Accès à l'application](#accès-application)
12. [Identifiants de test](#identifiants-test)
13. [Maintenance et gestion](#maintenance)

---

## 1. PRÉREQUIS

### Informations du serveur EC2
- **Instance ID:** i-08a4192cac311b069
- **Nom:** Serveur Web
- **IP Publique:** 13.60.231.236
- **IP Privée:** 172.31.46.103
- **Utilisateur:** ec2-user
- **OS:** Amazon Linux

### Logiciels installés
- Node.js 20.x
- npm 10.x
- MySQL 8.x
- Git

---

## 2. CONFIGURATION DE LA BASE DE DONNÉES MYSQL

### 2.1 Connexion à MySQL
```bash
sudo mysql -u root -p
```

### 2.2 Création de la base de données
```sql
CREATE DATABASE gseab;
```

### 2.3 Création de l'utilisateur
```sql
CREATE USER 'aziz'@'localhost' IDENTIFIED BY 'aziz';
GRANT ALL PRIVILEGES ON gseab.* TO 'aziz'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 2.4 Test de connexion
```bash
mysql -u aziz -p gseab
# Mot de passe: aziz
EXIT;
```

---

## 3. CLONAGE DU PROJET DEPUIS GITHUB

### 3.1 Aller dans le répertoire home
```bash
cd /home/ec2-user
```

### 3.2 Cloner le repository GitHub
```bash
git clone https://github.com/Abdoul-Aziz-dev/Mon-site-web.git
```

### 3.3 Entrer dans le dossier du projet
```bash
cd Mon-site-web
```

### 3.4 Vérifier les fichiers clonés
```bash
ls -la
```

Vous devriez voir :
- app/
- prisma/
- lib/
- package.json
- README.md
- etc.

---

## 4. CONFIGURATION DE L'ENVIRONNEMENT

### 4.1 Créer le fichier .env
```bash
nano .env
```

### 4.2 Contenu du fichier .env
```env
DATABASE_URL="mysql://aziz:aziz@localhost:3306/gseab"
NODE_ENV=production
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4.3 Sauvegarder et quitter
- **Ctrl + O** → Entrée (sauvegarder)
- **Ctrl + X** (quitter)

### 4.4 Vérifier le fichier
```bash
cat .env
```

---

## 5. INSTALLATION DES DÉPENDANCES

### 5.1 Installer les packages npm
```bash
npm install
```

**Résultat attendu:**
```
added 389 packages in 10s
```

---

## 6. CONFIGURATION PRISMA ET BASE DE DONNÉES

### 6.1 Générer le client Prisma
```bash
npx prisma generate
```

**Résultat attendu:**
```
✔ Generated Prisma Client to ./node_modules/@prisma/client
```

### 6.2 Créer les tables dans la base de données
```bash
npx prisma db push
```

**Résultat attendu:**
```
🚀 Your database is now in sync with your Prisma schema.
```

### 6.3 Vérifier les tables créées
```bash
mysql -u aziz -p gseab
# Mot de passe: aziz

SHOW TABLES;
EXIT;
```

Vous devriez voir 17 tables :
- admin
- student
- teacher
- course
- classroom
- enrollment
- grade
- schedule
- news
- announcement
- message
- teachermessage
- studentmessage
- adminstudentmessage
- adminteachermessage
- session
- settings

---

## 7. IMPORT DES DONNÉES DE TEST

### 7.1 Importer le script d'initialisation
```bash
mysql -u aziz -p gseab < mabase/01_init.sql
# Mot de passe: aziz
```

**Résultat attendu:**
```
Database gseab created successfully!
```

### 7.2 Importer les données de seed
```bash
mysql -u aziz -p gseab < mabase/02_seed.sql
# Mot de passe: aziz
```

**Résultat attendu:**
```
Seed data inserted successfully!
```

### 7.3 Vérifier les données importées
```bash
mysql -u aziz -p gseab
# Mot de passe: aziz

SELECT COUNT(*) FROM student;
SELECT COUNT(*) FROM teacher;
SELECT COUNT(*) FROM admin;
SELECT COUNT(*) FROM course;
SELECT COUNT(*) FROM news;
EXIT;
```

**Résultats attendus:**
- 10 étudiants
- 6 enseignants
- 2 admins
- 40 cours
- 25 actualités

---

## 8. CONFIGURATION NEXT.JS

### 8.1 Problème rencontré
Erreur : "Blocked cross-origin request to Next.js dev resource"

### 8.2 Solution : Créer next.config.js
```bash
nano next.config.js
```

### 8.3 Contenu du fichier next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['13.60.231.236'],
};

export default nextConfig;
```

### 8.4 Sauvegarder et quitter
- **Ctrl + O** → Entrée
- **Ctrl + X**

### 8.5 Modifier package.json (optionnel - pour supprimer le warning)
```bash
nano package.json
```

Ajouter `"type": "module",` après la première ligne :

```json
{
  "name": "school-app",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  ...
}
```

---

## 9. LANCEMENT DE L'APPLICATION

### 9.1 Mode développement (pour tester)
```bash
cd /home/ec2-user/Mon-site-web
npm run dev
```

**Résultat attendu:**
```
▲ Next.js 16.2.1 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://172.31.46.103:3000
✓ Ready in 770ms
```

### 9.2 Mode production (recommandé)

#### Étape 1 : Builder l'application
```bash
npm run build
```

**Durée:** 2-5 minutes

**Résultat attendu:**
```
✓ Compiled successfully
✓ Generating static pages (42/42)
```

#### Étape 2 : Lancer en production
```bash
npm start
```

### 9.3 Lancer avec PM2 (pour production - reste actif après déconnexion)

#### Installer PM2
```bash
sudo npm install -g pm2
```

#### Lancer l'application avec PM2
```bash
cd /home/ec2-user/Mon-site-web
pm2 start npm --name "gseab" -- start
```

#### Sauvegarder la configuration PM2
```bash
pm2 save
```

#### Configurer PM2 pour démarrer au boot
```bash
pm2 startup
# Copier et exécuter la commande affichée
```

#### Commandes PM2 utiles
```bash
# Voir les applications en cours
pm2 list

# Voir les logs
pm2 logs gseab

# Redémarrer l'application
pm2 restart gseab

# Arrêter l'application
pm2 stop gseab

# Supprimer l'application
pm2 delete gseab
```

---

## 10. CONFIGURATION AWS SECURITY GROUP

### 10.1 Ouvrir le port 3000

1. **Aller dans AWS Console**
   - EC2 → Instances
   - Sélectionner l'instance `i-08a4192cac311b069`

2. **Accéder au Security Group**
   - Onglet "Security"
   - Cliquer sur le lien du Security Group

3. **Modifier les règles entrantes**
   - Onglet "Inbound rules"
   - Cliquer sur "Edit inbound rules"

4. **Ajouter une règle**
   - Cliquer sur "Add rule"
   - **Type:** TCP personnalisé (Custom TCP)
   - **Port range:** 3000
   - **Source:** 0.0.0.0/0 (Anywhere-IPv4)
   - **Description:** Application Next.js GSEAB

5. **Sauvegarder**
   - Cliquer sur "Save rules"

### 10.2 Vérifier que le port est ouvert
```bash
# Depuis un autre terminal
curl http://13.60.231.236:3000
```

---

## 11. ACCÈS À L'APPLICATION

### 11.1 URL d'accès
```
http://13.60.231.236:3000
```

### 11.2 Depuis différents appareils

**Ordinateur:**
- Ouvrir le navigateur (Chrome, Firefox, Edge, Safari)
- Taper l'URL : `http://13.60.231.236:3000`

**Téléphone/Tablette:**
- Ouvrir le navigateur mobile
- Taper l'URL : `http://13.60.231.236:3000`
- ⚠️ Note : Le site n'est pas encore responsive pour mobile

**N'importe où dans le monde:**
- Tant que le serveur EC2 est actif
- Avec une connexion Internet

---

## 12. IDENTIFIANTS DE TEST

### 12.1 Compte ÉTUDIANT
```
Email: mamadou.diallo@gseab.gn
Mot de passe: password123
Rôle: Élève
```

**Fonctionnalités accessibles:**
- Tableau de bord personnalisé
- Consultation des cours
- Consultation des notes
- Emploi du temps
- Messagerie avec enseignants

### 12.2 Compte ENSEIGNANT
```
Email: alpha.diallo@gseab.gn
Mot de passe: password123
Rôle: Prof.
```

**Fonctionnalités accessibles:**
- Tableau de bord
- Gestion des classes
- Saisie des notes
- Publication d'annonces
- Messagerie avec élèves
- Emploi du temps

### 12.3 Compte ADMINISTRATEUR
```
Email: groupe8@gmail.com
Mot de passe: groupe8@@22
Rôle: Admin
```

**Fonctionnalités accessibles:**
- Vue d'ensemble
- Gestion des étudiants (CRUD)
- Gestion des enseignants (CRUD)
- Gestion des cours (CRUD)
- Gestion des actualités (CRUD)
- Messagerie globale
- Paramètres du site

### 12.4 Autres comptes disponibles

**Étudiants:**
- aissatou.sow@gseab.gn (password123)
- oumar.barry@gseab.gn (password123)
- aladji.diallo@gseab.gn (1234)

**Enseignants:**
- fatoumata.barry@gseab.gn (password123)
- souleymane.sow@gseab.gn (password123)

**Admin:**
- admin@school.local (secure_password_hash)

---

## 13. MAINTENANCE ET GESTION

### 13.1 Vérifier que l'application tourne
```bash
# Avec npm
ps aux | grep node

# Avec PM2
pm2 list
```

### 13.2 Voir les logs en temps réel
```bash
# Avec PM2
pm2 logs gseab

# Avec npm (si lancé manuellement)
# Les logs s'affichent directement dans le terminal
```

### 13.3 Redémarrer l'application
```bash
# Avec PM2
pm2 restart gseab

# Avec npm (arrêter puis relancer)
# Ctrl + C dans le terminal
npm run dev
# ou
npm start
```

### 13.4 Mettre à jour le code depuis GitHub
```bash
cd /home/ec2-user/Mon-site-web

# Arrêter l'application
pm2 stop gseab
# ou Ctrl + C si lancé manuellement

# Récupérer les derniers changements
git pull origin main

# Réinstaller les dépendances si nécessaire
npm install

# Régénérer Prisma si le schema a changé
npx prisma generate
npx prisma db push

# Rebuilder l'application
npm run build

# Relancer l'application
pm2 restart gseab
# ou
npm start
```

### 13.5 Sauvegarder la base de données
```bash
# Créer un backup
mysqldump -u aziz -p gseab > backup_gseab_$(date +%Y%m%d).sql

# Restaurer un backup
mysql -u aziz -p gseab < backup_gseab_20250401.sql
```

### 13.6 Vérifier l'espace disque
```bash
df -h
```

### 13.7 Vérifier la mémoire
```bash
free -h
```

### 13.8 Nettoyer les fichiers temporaires
```bash
cd /home/ec2-user/Mon-site-web

# Supprimer node_modules et réinstaller
rm -rf node_modules
npm install

# Supprimer le cache Next.js
rm -rf .next
npm run build
```

---

## 14. PROBLÈMES COURANTS ET SOLUTIONS

### 14.1 Page blanche dans le navigateur

**Problème:** Le site charge mais affiche une page blanche

**Solution:**
1. Vérifier les erreurs dans le terminal SSH
2. Ouvrir la console du navigateur (F12)
3. Vérifier que `next.config.js` contient l'IP publique
4. Faire Ctrl + F5 pour forcer le rechargement

### 14.2 Erreur "Cannot connect to database"

**Problème:** L'application ne peut pas se connecter à MySQL

**Solution:**
```bash
# Vérifier que MySQL tourne
sudo systemctl status mysqld

# Redémarrer MySQL si nécessaire
sudo systemctl restart mysqld

# Vérifier les identifiants dans .env
cat .env

# Tester la connexion manuellement
mysql -u aziz -p gseab
```

### 14.3 Port 3000 inaccessible

**Problème:** Impossible d'accéder à http://13.60.231.236:3000

**Solution:**
1. Vérifier que l'application tourne : `pm2 list` ou `ps aux | grep node`
2. Vérifier le Security Group AWS (port 3000 ouvert)
3. Vérifier le firewall : `sudo firewall-cmd --list-all`

### 14.4 Erreur "Module not found"

**Problème:** Erreur lors du lancement de l'application

**Solution:**
```bash
cd /home/ec2-user/Mon-site-web
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 14.5 Application s'arrête après déconnexion SSH

**Problème:** Le site ne fonctionne plus après avoir fermé le terminal

**Solution:** Utiliser PM2 au lieu de npm directement
```bash
pm2 start npm --name "gseab" -- start
pm2 save
```

---

## 15. COMMANDES RÉCAPITULATIVES

### Démarrage rapide complet
```bash
# 1. Se connecter à EC2
ssh -i "votre-cle.pem" ec2-user@13.60.231.236

# 2. Aller dans le projet
cd /home/ec2-user/Mon-site-web

# 3. Lancer l'application
npm run dev
# ou en production
pm2 start npm --name "gseab" -- start
```

### Mise à jour du projet
```bash
cd /home/ec2-user/Mon-site-web
pm2 stop gseab
git pull origin main
npm install
npx prisma generate
npm run build
pm2 restart gseab
```

### Vérification de l'état
```bash
# Application
pm2 list
pm2 logs gseab

# Base de données
mysql -u aziz -p gseab -e "SELECT COUNT(*) FROM student;"

# Serveur
df -h
free -h
```

---

## 16. INFORMATIONS TECHNIQUES

### 16.1 Architecture du projet
```
Mon-site-web/
├── app/                    # Pages et composants Next.js
│   ├── api/               # Routes API (42 endpoints)
│   ├── admin/             # Interface administrateur
│   ├── teacher/           # Interface enseignant
│   ├── student/           # Interface élève
│   └── components/        # Composants réutilisables
├── prisma/
│   └── schema.prisma      # Schéma de base de données (17 modèles)
├── lib/
│   └── prisma.ts          # Client Prisma
├── mabase/                # Scripts SQL
│   ├── 01_init.sql
│   └── 02_seed.sql
├── public/                # Assets statiques
├── .env                   # Variables d'environnement
├── next.config.js         # Configuration Next.js
└── package.json           # Dépendances npm
```

### 16.2 Technologies utilisées
- **Framework:** Next.js 16.2.1 (App Router)
- **UI:** React 19
- **Langage:** TypeScript 5
- **Base de données:** MySQL 8
- **ORM:** Prisma 5.21.1
- **Serveur:** Node.js 20.x
- **Process Manager:** PM2

### 16.3 Statistiques du projet
- **97 fichiers** créés
- **42 pages** générées
- **42 routes API**
- **17 modèles** de base de données
- **50+ composants** React
- **15,795 lignes** de code ajoutées

---

## 17. SÉCURITÉ ET BONNES PRATIQUES

### 17.1 Pour la production (recommandations)

⚠️ **À implémenter avant mise en production réelle:**

1. **Mots de passe:**
   - Implémenter bcrypt pour hasher les mots de passe
   - Changer tous les mots de passe par défaut

2. **Sessions:**
   - Utiliser JWT pour les sessions
   - Implémenter refresh tokens

3. **HTTPS:**
   - Configurer un certificat SSL
   - Utiliser Nginx comme reverse proxy
   - Rediriger HTTP vers HTTPS

4. **Sécurité API:**
   - Ajouter rate limiting
   - Valider toutes les entrées utilisateur
   - Implémenter CORS correctement

5. **Base de données:**
   - Créer des backups automatiques
   - Utiliser des mots de passe forts
   - Limiter les privilèges utilisateur

6. **Monitoring:**
   - Configurer des alertes
   - Monitorer les logs
   - Surveiller les performances

### 17.2 Changer les identifiants admin

```bash
mysql -u aziz -p gseab

UPDATE admin 
SET email = 'votre-email@example.com', 
    password = 'votre-mot-de-passe-securise' 
WHERE email = 'groupe8@gmail.com';

EXIT;
```

---

## 18. SUPPORT ET RESSOURCES

### 18.1 Documentation
- **README.md** - Documentation générale du projet
- **AUDIT_COMPLET.md** - Rapport d'audit complet
- **DEPLOIEMENT_AWS.md** - Guide de déploiement détaillé

### 18.2 Repository GitHub
```
https://github.com/Abdoul-Aziz-dev/Mon-site-web
```

### 18.3 Commandes Git utiles
```bash
# Voir l'historique des commits
git log --oneline

# Voir les fichiers modifiés
git status

# Créer une branche
git checkout -b nouvelle-branche

# Pousser les changements
git add .
git commit -m "Description des changements"
git push origin main
```

---

## 19. CHECKLIST DE DÉPLOIEMENT

### ✅ Avant le déploiement
- [ ] Code testé localement
- [ ] Base de données configurée
- [ ] Variables d'environnement définies
- [ ] Dépendances installées
- [ ] Build réussi sans erreurs

### ✅ Pendant le déploiement
- [ ] Code cloné depuis GitHub
- [ ] .env créé avec les bonnes valeurs
- [ ] npm install exécuté
- [ ] Prisma généré et DB synchronisée
- [ ] Données de test importées
- [ ] next.config.js configuré
- [ ] Application lancée avec succès

### ✅ Après le déploiement
- [ ] Port 3000 ouvert dans Security Group
- [ ] Application accessible depuis le navigateur
- [ ] Login testé pour chaque rôle
- [ ] Toutes les fonctionnalités testées
- [ ] PM2 configuré pour production
- [ ] Backups configurés

---

## 20. CONTACT ET CRÉDITS

**Projet:** GSEAB - Système de Gestion Scolaire  
**Développeur:** Abdoul-Aziz-dev  
**GitHub:** https://github.com/Abdoul-Aziz-dev  
**Repository:** https://github.com/Abdoul-Aziz-dev/Mon-site-web

**Développé pour:** Groupe Scolaire Elhadj Amadou Barry (GSEAB)

**Date de déploiement:** Avril 2025  
**Version:** 1.0.0  
**Statut:** ✅ Déployé et fonctionnel

---

**Fait avec ❤️ pour GSEAB**

🎉 **FÉLICITATIONS ! Votre application est maintenant déployée et accessible en ligne !** 🎉
