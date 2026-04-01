# 🚀 Guide de Déploiement AWS EC2 - GSEAB

## Prérequis
- Compte AWS actif
- Accès à la console AWS
- Clé SSH (sera créée pendant le processus)

---

## ÉTAPE 1 : Créer une instance EC2

### 1.1 Connexion à AWS
1. Va sur https://aws.amazon.com/console/
2. Connecte-toi avec ton compte
3. Cherche "EC2" dans la barre de recherche
4. Clique sur "Instances" → "Launch Instance"

### 1.2 Configuration de l'instance
**Nom :** `gseab-production`

**Image (AMI) :** 
- Choisis **Ubuntu Server 22.04 LTS** (gratuit avec Free Tier)

**Type d'instance :**
- Choisis **t2.micro** (gratuit avec Free Tier - 1 vCPU, 1 GB RAM)

**Paire de clés (Key pair) :**
- Clique sur "Create new key pair"
- Nom : `gseab-key`
- Type : RSA
- Format : `.pem` (pour Mac/Linux) ou `.ppk` (pour Windows avec PuTTY)
- **IMPORTANT :** Télécharge et sauvegarde cette clé, tu ne pourras plus la télécharger !

**Paramètres réseau :**
- ✅ Autoriser le trafic SSH (port 22)
- ✅ Autoriser le trafic HTTPS (port 443)
- ✅ Autoriser le trafic HTTP (port 80)

**Stockage :**
- 20 GB (gratuit avec Free Tier)

### 1.3 Lancer l'instance
- Clique sur "Launch Instance"
- Attends 2-3 minutes que l'instance démarre
- Note l'**adresse IP publique** (ex: `54.123.45.67`)

---

## ÉTAPE 2 : Se connecter à l'instance EC2

### Option A : Depuis Windows (PowerShell)
```powershell
# Place ta clé dans un dossier sécurisé
cd C:\Users\TON_NOM\.ssh
# Connecte-toi (remplace l'IP par la tienne)
ssh -i "gseab-key.pem" ubuntu@54.123.45.67
```

### Option B : Depuis la console AWS (plus simple)
1. Va dans EC2 → Instances
2. Sélectionne ton instance
3. Clique sur "Connect" en haut
4. Choisis "EC2 Instance Connect"
5. Clique sur "Connect"

---

## ÉTAPE 3 : Installer les dépendances sur le serveur

Une fois connecté en SSH, exécute ces commandes :

```bash
# Mettre à jour le système
sudo apt update && sudo apt upgrade -y

# Installer Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Vérifier l'installation
node -v  # Doit afficher v20.x.x
npm -v   # Doit afficher 10.x.x

# Installer MySQL
sudo apt install -y mysql-server

# Sécuriser MySQL
sudo mysql_secure_installation
# Réponds : Y, 2 (STRONG), ton_mot_de_passe, Y, Y, Y, Y

# Installer Git
sudo apt install -y git

# Installer PM2 (pour garder l'app en ligne)
sudo npm install -g pm2
```

---

## ÉTAPE 4 : Configurer MySQL

```bash
# Se connecter à MySQL
sudo mysql

# Dans MySQL, exécute :
CREATE DATABASE gseab CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'gseab_user'@'localhost' IDENTIFIED BY 'TON_MOT_DE_PASSE_FORT';
GRANT ALL PRIVILEGES ON gseab.* TO 'gseab_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## ÉTAPE 5 : Transférer ton projet sur EC2

### Option A : Via Git (recommandé si tu as un repo GitHub)
```bash
cd /home/ubuntu
git clone https://github.com/TON_USERNAME/school-app.git
cd school-app
```

### Option B : Via SCP depuis ton PC Windows
```powershell
# Depuis ton PC (PowerShell), dans le dossier du projet
scp -i "C:\Users\TON_NOM\.ssh\gseab-key.pem" -r . ubuntu@54.123.45.67:/home/ubuntu/school-app
```

---

## ÉTAPE 6 : Configurer le projet sur EC2

```bash
cd /home/ubuntu/school-app

# Créer le fichier .env
nano .env
```

Copie ce contenu (adapte le mot de passe) :
```env
DATABASE_URL="mysql://gseab_user:TON_MOT_DE_PASSE_FORT@localhost:3306/gseab"
NODE_ENV=production
```

Sauvegarde : `Ctrl+X`, puis `Y`, puis `Entrée`

```bash
# Installer les dépendances
npm install

# Générer le client Prisma
npx prisma generate

# Pousser le schéma vers MySQL
npx prisma db push

# Seed la base de données
npx prisma db seed

# Builder le projet
npm run build
```

---

## ÉTAPE 7 : Lancer l'application avec PM2

```bash
# Démarrer l'app
pm2 start npm --name "gseab" -- start

# Configurer PM2 pour redémarrer au boot
pm2 startup
# Copie et exécute la commande affichée

pm2 save

# Vérifier que l'app tourne
pm2 status
pm2 logs gseab
```

---

## ÉTAPE 8 : Configurer Nginx (reverse proxy)

```bash
# Installer Nginx
sudo apt install -y nginx

# Créer la config
sudo nano /etc/nginx/sites-available/gseab
```

Copie ce contenu :
```nginx
server {
    listen 80;
    server_name 54.123.45.67;  # Remplace par ton IP ou domaine

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Activer la config
sudo ln -s /etc/nginx/sites-available/gseab /etc/nginx/sites-enabled/

# Supprimer la config par défaut
sudo rm /etc/nginx/sites-enabled/default

# Tester la config
sudo nginx -t

# Redémarrer Nginx
sudo systemctl restart nginx
```

---

## ÉTAPE 9 : Tester l'application

Ouvre ton navigateur et va sur :
```
http://54.123.45.67
```

Tu devrais voir ton site GSEAB ! 🎉

---

## ÉTAPE 10 (Optionnel) : Ajouter un nom de domaine

### Si tu as un domaine (ex: gseab.com)

1. **Dans ton registrar de domaine (OVH, Namecheap, etc.) :**
   - Crée un enregistrement A
   - Nom : `@` (ou `www`)
   - Valeur : `54.123.45.67` (ton IP EC2)
   - TTL : 3600

2. **Installer un certificat SSL gratuit (HTTPS) :**
```bash
# Installer Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtenir le certificat (remplace par ton domaine)
sudo certbot --nginx -d gseab.com -d www.gseab.com

# Renouvellement automatique
sudo certbot renew --dry-run
```

---

## 📋 Commandes utiles pour gérer ton serveur

```bash
# Voir les logs de l'app
pm2 logs gseab

# Redémarrer l'app
pm2 restart gseab

# Arrêter l'app
pm2 stop gseab

# Mettre à jour le code (si tu utilises Git)
cd /home/ubuntu/school-app
git pull
npm install
npm run build
pm2 restart gseab

# Voir l'état de Nginx
sudo systemctl status nginx

# Redémarrer Nginx
sudo systemctl restart nginx

# Voir l'état de MySQL
sudo systemctl status mysql
```

---

## 🔒 Sécurité importante

```bash
# Configurer le firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Créer des sauvegardes automatiques de la BDD
crontab -e
# Ajoute cette ligne (backup tous les jours à 2h du matin) :
0 2 * * * mysqldump -u gseab_user -pTON_MOT_DE_PASSE gseab > /home/ubuntu/backups/gseab_$(date +\%Y\%m\%d).sql
```

---

## 💰 Coûts AWS

**Avec Free Tier (12 premiers mois) :**
- Instance t2.micro : **GRATUIT** (750h/mois)
- 20 GB stockage : **GRATUIT**
- Transfert de données : 15 GB/mois **GRATUIT**

**Après Free Tier :**
- Instance t2.micro : ~$8-10/mois
- Stockage 20 GB : ~$2/mois
- **Total : ~$10-12/mois**

---

## 🆘 Dépannage

**Problème : L'app ne démarre pas**
```bash
pm2 logs gseab --lines 100
```

**Problème : Erreur de connexion MySQL**
```bash
sudo mysql
SHOW DATABASES;
SELECT user, host FROM mysql.user;
```

**Problème : Port 3000 déjà utilisé**
```bash
sudo lsof -i :3000
sudo kill -9 PID_DU_PROCESSUS
```

---

## ✅ Checklist finale

- [ ] Instance EC2 créée et démarrée
- [ ] Connexion SSH fonctionnelle
- [ ] Node.js, MySQL, Nginx installés
- [ ] Base de données créée et seedée
- [ ] Application buildée et lancée avec PM2
- [ ] Nginx configuré comme reverse proxy
- [ ] Site accessible via http://TON_IP
- [ ] (Optionnel) Domaine configuré avec SSL

---

**Félicitations ! Ton site GSEAB est maintenant en production sur AWS ! 🚀**
