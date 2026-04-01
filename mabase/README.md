# 📊 Scripts MySQL pour GSEAB School App

## 📁 Fichiers disponibles

### 1. `01_init.sql` - Initialisation complète
- ✅ Crée la base de données `gseab`
- ✅ Crée toutes les tables (13 tables)
- ✅ Configure les relations (Foreign Keys)
- ✅ Crée les index de performance
- **À exécuter EN PREMIER**

### 2. `02_seed.sql` - Données de test
- ✅ Insère les données d'exemple
- ✅ Admin, Profs, Étudiants, Cours
- ✅ Notes, Emploi du temps, Annonces
- **À exécuter APRÈS `01_init.sql`**

### 3. `03_reset.sql` - Réinitialiser la DB
- ⚠️ SUPPRIME TOUTES LES DONNÉES
- À utiliser pour repartir de zéro en développement
- **À exécuter AVEC PRÉCAUTION**

---

## 🚀 Instructions d'utilisation

### Option 1: Avec MySQL Workbench
1. Ouvrir MySQL Workbench
2. Fichier → Open SQL Script
3. Sélectionner `01_init.sql`
4. Cliquer "Execute"
5. Répéter avec `02_seed.sql`

### Option 2: Avec le terminal CMD
```cmd
mysql -u root -p < 01_init.sql
mysql -u root -p < 02_seed.sql
```

### Option 3: Ligne par ligne dans MySQL CLI
```cmd
mysql -u root -p
source C:\Users\USER\Documents\Site-web\school-app\mabase\01_init.sql;
source C:\Users\USER\Documents\Site-web\school-app\mabase\02_seed.sql;
EXIT;
```

---

## 📝 Notes importantes

**Mot de passe MySQL:**
- Remplace `-p` par `-pTON_MOT_DE_PASSE` si tu as un mot de passe
- Ou ajoute `-p` seul pour que MySQL te le demande

**Base de données:**
- Nom: `gseab`
- Utilisateur: `root` (par défaut)
- Hôte: `localhost`
- Port: `3306` (défaut)

**Données de test:**
- Admin: `groupe8@gmail.com` / `groupe8@@22`
- 4 Professeurs
- 5 Étudiants
- 5 Cours
- 6 Notes
- 5 Emplois du temps

---

## ✅ Vérification

Pour vérifier que tout est OK:

```sql
USE gseab;
SHOW TABLES;
SELECT COUNT(*) as admin_count FROM Admin;
SELECT COUNT(*) as student_count FROM Student;
SELECT COUNT(*) as course_count FROM Course;
```

---

## 🔄 Remise à zéro complète

Si tu veux recommencer:

```cmd
mysql -u root -p < 03_reset.sql
mysql -u root -p < 01_init.sql
mysql -u root -p < 02_seed.sql
```

---

## 🐛 Dépannage

**Erreur: "Access denied for user 'root'@'localhost'"**
→ Vérifier le mot de passe MySQL

**Erreur: "Can't connect to local MySQL server"**
→ Vérifier que MySQL est démarré (Services Windows)

**Erreur: "Database 'gseab' already exists"**
→ Exécuter `03_reset.sql` d'abord, puis `01_init.sql`

---

## 📞 Support

Pour plus de détails, consulte:
- Documentation Prisma: https://www.prisma.io/docs/
- Documentation MySQL: https://dev.mysql.com/doc/

