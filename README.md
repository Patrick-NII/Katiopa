# Katiopa - Plateforme Éducative Intelligente

Katiopa est une plateforme éducative innovante qui combine l'intelligence artificielle, les mathématiques et la programmation pour créer une expérience d'apprentissage unique pour les enfants de 5 à 15 ans. Notre assistant IA, Okapi, personnalise l'apprentissage et guide chaque enfant dans son parcours éducatif.

## 🎯 Vision et Objectifs

Katiopa vise à révolutionner l'apprentissage des enfants en :
- Rendant l'apprentissage des mathématiques et de la programmation ludique et engageant
- Utilisant l'IA pour personnaliser le parcours d'apprentissage de chaque enfant
- Développant la pensée computationnelle et la logique dès le plus jeune âge
- Créant un environnement sécurisé où les parents peuvent suivre la progression de leur enfant
- Favorisant l'autonomie et la confiance en soi des apprenants

## 🚀 Fonctionnalités Principales

### Assistant IA Okapi
- Assistant conversationnel intelligent spécialisé dans l'éducation
- Personnalisation des réponses selon l'âge et le niveau de l'enfant
- Aide aux devoirs et explications adaptatives
- Génération de quiz et exercices personnalisés
- Suivi de progression et recommandations

### Parcours d'Apprentissage
#### Mathématiques (5-15 ans)
- Niveau 1 (5-7 ans) : Découverte des nombres, opérations simples, géométrie basique
- Niveau 2 (8-10 ans) : Fractions, décimaux, problèmes mathématiques
- Niveau 3 (11-13 ans) : Algèbre, statistiques, probabilités
- Niveau 4 (14-15 ans) : Fonctions, trigonométrie, logique mathématique

#### Programmation (7-15 ans)
- Niveau 1 (7-9 ans) : Programmation visuelle avec Scratch
- Niveau 2 (10-12 ans) : Python basique, jeux simples
- Niveau 3 (13-15 ans) : Python avancé, développement web, IA

#### Intelligence Artificielle (10-15 ans)
- Introduction aux concepts d'IA
- Création de modèles simples
- Compréhension des algorithmes d'apprentage
- Projets pratiques d'IA

### Fonctionnalités Parents
- Tableau de bord de suivi détaillé
- Rapports de progression hebdomadaires
- Paramétrage des objectifs et récompenses
- Communication avec l'assistant Okapi
- Gestion des comptes enfants
- Recommandations personnalisées

### Fonctionnalités Enfants
- Interface adaptée à chaque tranche d'âge
- Système de récompenses et badges
- Création de projets personnels
- Défis communautaires
- Bac à sable pour l'expérimentation
- Jeux éducatifs interactifs

## 🏗️ Architecture Technique

### Frontend
- **Framework**: Next.js 14.1.0
- **UI**: Chakra UI avec thème personnalisé
- **État**: Zustand pour la gestion d'état
- **Animations**: Framer Motion
- **Internationalisation**: Support FR/EN

### Backend
- **API Routes**: Next.js API Routes
- **Base de données**: PostgreSQL avec Prisma ORM
- **Cache**: Redis pour les sessions et données temporaires
- **Authentification**: NextAuth.js avec Firebase Auth
- **Stockage**: Firebase Storage
- **Paiements**: Stripe

### Services Externes
- **IA**: OpenAI GPT-4 pour l'assistant Okapi
- **Analytics**: Firebase Analytics
- **Emails**: Nodemailer
- **Déploiement**: GitHub Pages avec GitHub Actions

### Sécurité
- Authentification multi-facteurs
- Chiffrement des données sensibles
- Protection CSRF
- Validation des entrées
- Rate limiting
- Conformité RGPD

## 🛠️ Installation et Configuration

### Prérequis

- Node.js (v18 ou supérieur)
- PostgreSQL (v14 ou supérieur)
- Compte Firebase
- Compte OpenAI (pour l'assistant Okapi)
- Compte Stripe (pour les abonnements)

### Configuration des Variables d'Environnement

Le projet nécessite plusieurs clés API et configurations pour fonctionner correctement. Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
# Base de données
DATABASE_URL="postgresql://user:password@localhost:5432/katiopa"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-secret-nextauth"

# OpenAI (pour l'assistant Okapi)
OPENAI_API_KEY="votre-clé-api-openai"

# Stripe (pour les abonnements)
STRIPE_SECRET_KEY="votre-clé-secrète-stripe"
STRIPE_WEBHOOK_SECRET="votre-secret-webhook-stripe"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="votre-clé-publique-stripe"

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY="votre-clé-api-firebase"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="votre-projet.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="votre-id-projet"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="votre-projet.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="votre-id-expéditeur"
NEXT_PUBLIC_FIREBASE_APP_ID="votre-id-app"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="votre-id-mesure"

# Google OAuth
GOOGLE_CLIENT_ID="votre-id-client-google"
GOOGLE_CLIENT_SECRET="votre-secret-client-google"

# Autres configurations
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

> **Important** : 
> - Ne jamais commiter le fichier `.env.local` dans Git
> - Garder vos clés API secrètes et ne jamais les partager
> - Pour l'assistant Okapi, vous devez obtenir votre propre clé API OpenAI
> - Les valeurs ci-dessus sont des exemples, remplacez-les par vos propres clés

### Obtention des Clés API

1. **OpenAI API** :
   - Créez un compte sur [OpenAI](https://platform.openai.com)
   - Générez une clé API dans les paramètres de votre compte
   - Utilisez cette clé pour `OPENAI_API_KEY`

2. **Firebase** :
   - Créez un projet sur [Firebase Console](https://console.firebase.google.com)
   - Ajoutez une application web à votre projet
   - Copiez les configurations dans les paramètres de votre application

3. **Stripe** :
   - Créez un compte sur [Stripe](https://stripe.com)
   - Obtenez vos clés API dans le tableau de bord développeur

4. **Google OAuth** :
   - Configurez un projet dans [Google Cloud Console](https://console.cloud.google.com)
   - Créez des identifiants OAuth 2.0
   - Ajoutez les domaines autorisés

### Installation Locale

1. Cloner le repository :
```bash
git clone https://github.com/votre-username/katiopa.git
cd katiopa
```

2. Installer les dépendances :
```bash
npm install
```

3. Configuration des variables d'environnement :
```bash
cp .env.example .env.local
```

Variables d'environnement requises :
```env
# Base
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=votre_secret

# Base de données
DATABASE_URL="postgresql://user:password@localhost:5432/katiopa"

# Redis
REDIS_URL=redis://localhost:6379

# OpenAI
OPENAI_API_KEY=votre_clé_api

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=votre_clé
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=votre_domaine
NEXT_PUBLIC_FIREBASE_PROJECT_ID=votre_projet
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=votre_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=votre_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=votre_measurement_id

# Stripe
STRIPE_SECRET_KEY=votre_clé_secrète
STRIPE_WEBHOOK_SECRET=votre_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=votre_clé_publique
```

4. Initialiser la base de données :
```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

5. Lancer le serveur de développement :
```bash
npm run dev
```

### Déploiement

1. Configuration GitHub Pages :
- Fork du repository
- Configuration des secrets GitHub :
  - `OPENAI_API_KEY`
  - `FIREBASE_*`
  - `STRIPE_*`
  - Autres variables d'environnement

2. Workflow de déploiement :
- Push sur la branche main
- GitHub Actions build et déploiement automatique
- Vérification des tests et du build
- Déploiement sur GitHub Pages

## 📦 Structure du Projet

```
katiopa/
├── src/
│   ├── components/          # Composants React
│   │   ├── chat/           # Composants de chat avec Okapi
│   │   ├── games/          # Jeux éducatifs
│   │   ├── layout/         # Composants de mise en page
│   │   ├── learning/       # Composants d'apprentissage
│   │   └── subscription/   # Composants d'abonnement
│   ├── config/             # Configuration
│   │   ├── routes.ts       # Routes de l'application
│   │   └── subscription-plans.ts
│   ├── hooks/              # Hooks personnalisés
│   ├── lib/                # Bibliothèques et utilitaires
│   │   ├── prisma.ts       # Client Prisma
│   │   └── firebase.ts     # Configuration Firebase
│   ├── pages/              # Pages Next.js
│   │   ├── api/           # Routes API
│   │   └── app/           # Pages de l'application
│   ├── services/           # Services externes
│   │   └── openai.ts      # Service OpenAI
│   ├── styles/            # Styles globaux
│   └── types/             # Types TypeScript
├── public/                # Fichiers statiques
├── prisma/               # Schéma et migrations
├── scripts/              # Scripts utilitaires
└── tests/               # Tests
```

## 🔄 Workflow de Développement

1. **Branches**
   - `main` : Production
   - `develop` : Développement
   - `feature/*` : Nouvelles fonctionnalités
   - `fix/*` : Corrections de bugs

2. **Processus de Contribution**
   - Créer une branche depuis `develop`
   - Développer la fonctionnalité
   - Tests unitaires et d'intégration
   - Pull Request vers `develop`
   - Review et merge
   - Déploiement sur staging
   - Tests de validation
   - Merge vers `main`

3. **Tests**
   - Tests unitaires : Jest
   - Tests d'intégration : Cypress
   - Tests E2E : Playwright
   - Couverture de code : 80% minimum

## 📊 Métriques et Monitoring

- **Performance**
  - Temps de chargement des pages
  - Score Lighthouse
  - Métriques Core Web Vitals

- **Utilisation**
  - Nombre d'utilisateurs actifs
  - Temps moyen de session
  - Taux de complétion des exercices
  - Progression des apprenants

- **Technique**
  - Uptime
  - Temps de réponse API
  - Utilisation des ressources
  - Erreurs et exceptions

## 🔒 Sécurité et Conformité

- **Protection des Données**
  - Chiffrement des données sensibles
  - Stockage sécurisé
  - Anonymisation des données
  - Conformité RGPD

- **Sécurité des Enfants**
  - Filtrage du contenu
  - Modération des interactions
  - Contrôle parental
  - Protection contre le cyberharcèlement

## 📱 Applications Mobiles (En développement)

- **iOS**
  - Développement en Swift
  - Disponible sur l'App Store
  - Fonctionnalités natives

- **Android**
  - Développement en Kotlin
  - Disponible sur Google Play
  - Optimisation matérielle

## 🤝 Contribution

Nous accueillons les contributions ! Consultez notre [guide de contribution](CONTRIBUTING.md) pour :
- Standards de code
- Processus de PR
- Tests requis
- Documentation

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support et Contact

- **Support Technique**: support@katiopa.com
- **Partenariats**: partnerships@katiopa.com
- **Presse**: press@katiopa.com
- **Site Web**: https://katiopa.com
- **Twitter**: @KatiopaApp
- **LinkedIn**: Katiopa 