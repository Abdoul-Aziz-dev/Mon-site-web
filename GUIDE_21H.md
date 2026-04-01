# 🚀 GUIDE COMPLET - MySQL + WampServer + GSEAB App
## À exécuter à 21h00

---

## ✅ ÉTAPE 1: Vérifier que WampServer est actif

1. Cherche l'icône WampServer dans la barre des tâches (en bas à droite)
2. Clique dessus → "Start All Services"
3. Attends que tout soit VERT ✅

Si tu vois:
- 🟢 Apache: ON
- 🟢 MySQL: ON
- 🟢 PHP: ON

C'est BON! ✅

---

## ✅ ÉTAPE 2: Configurer MySQL avec WampServer

### Option A: Via WampServer GUI (Plus facile)
1. WampServer → MySQL → MySQL Console
2. Entre le mot de passe (tape juste ENTER si pas de mot de passe)
3. Une fenêtre noire s'ouvre
4. Copie-colle ces commandes:

```sql
CREATE DATABASE IF NOT EXISTS gseab;
EXIT;
```

### Option B: Via ligne de commande
Ouvre CMD et tape:

```cmd
cd "C:\wamp64\bin\mysql\mysql8.0.35\bin"
mysql -u root -p
```

(Tape le mot de passe ou appuie sur ENTER)

Puis dans MySQL:
```sql
CREATE DATABASE IF NOT EXISTS gseab;
EXIT;
```

---

## ✅ ÉTAPE 3: Vérifier la connexion

1. Ouvre PowerShell ou CMD
2. Tape:
```cmd
mysql -u root -p -h localhost
```

3. Tu devrais voir `mysql>` 
4. Tape: `SHOW DATABASES;`
5. Tu devrais voir `gseab` dans la liste ✅

---

## ✅ ÉTAPE 4: Lancer le projet

**Dans un terminal (CMD ou PowerShell):**

```cmd
cd c:\Users\USER\Documents\Site-web\school-app

REM Génère Prisma Client
npx prisma generate

REM Crée les tables dans MySQL
npx prisma db push

REM Remplit avec les données
npx prisma db seed

REM Lance le serveur
npm run dev
```

---

## ✅ ÉTAPE 5: Ouvrir dans le navigateur

```
http://localhost:3000
```

Tu devrais voir la page d'accueil GSEAB! 🎉

---

## 📊 Vérifier que MySQL est connecté

**Commande pour voir les données:**

```cmd
cd c:\Users\USER\Documents\Site-web\school-app
npx prisma studio
```

Cela ouvre une interface pour voir toutes les données en direct! 🔍

---

## ⚠️ Si tu as des erreurs

### Erreur: "Cannot find module 'tsx'"
```cmd
npm install
npx prisma db push
npx prisma db seed
npm run dev
```

### Erreur: "Access denied for user 'root'"
1. Ouvre WampServer → MySQL → MySQL Admin
2. Clique sur phpMyAdmin
3. À gauche: "New" → Create database "gseab"

### Erreur: "Cannot connect to MySQL server"
1. Vérifie que WampServer est VERT ✅
2. Clique sur l'icône WampServer → "Restart All Services"

---

## 🎯 Résumé des 4 commandes principales

À 21h, tu dois juste taper ÇA:

```cmd
cd c:\Users\USER\Documents\Site-web\school-app
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev
```

PUIS ouvre: http://localhost:3000

**C'EST TOUT!** ✨

---

## 📞 Notes importantes

**Mot de passe MySQL par défaut avec WampServer:**
- Username: `root`
- Password: (vide - tape juste ENTER)

**Si tu as changé le mot de passe:**
- Modifie le `.env`:
```env
DATABASE_URL="mysql://root:TON_MOT_DE_PASSE@localhost:3306/gseab"
```

**Si MySQL refuse la connexion:**
1. Va dans WampServer → MySQL → MySQL Admin
2. Entre dans phpMyAdmin
3. Note le mot de passe affichage

---

## ✅ À 21h00 précises:

1. ✅ Ouvre VSCode
2. ✅ Dossier: `c:\Users\USER\Documents\Site-web\school-app`
3. ✅ Ouvre Terminal
4. ✅ Copie les 4 commandes ci-dessus
5. ✅ Ouvre http://localhost:3000
6. ✅ Enjoy! 🎉

**Tout est prêt, tu vas juste activer la machine!** 🚀
