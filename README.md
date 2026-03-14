# Consultant Augmenté — Personal CRM IA

> Personal CRM augmenté à l'Intelligence Artificielle pour consultants.
> Projet développé dans le cadre du **Hackathon IA ECE-JEECE / CGI Business Consulting** (Mars 2026).

**Équipe :** Antoine Brosseau, Gauthier Blanchard, Paul Clark, Marceau Michaud

---

## Le Problème

Les consultants possèdent un réseau professionnel riche — alumni, anciens collègues, clients — mais ne l'exploitent pas efficacement :

- **85%** des opportunités business viennent du réseau
- **70%** des offres ne sont jamais publiées (marché caché)
- **80%** des consultants jugent le networking essentiel mais n'ont pas le temps de l'industrialiser

**3 pain points majeurs :**

1. **Réseau dormant** — contacts sous-exploités, relations qui se détériorent
2. **Veille dispersée** — informations fragmentées, impossible à synthétiser
3. **Priorisation impossible** — trop de contacts, pas assez de temps

## La Solution

Un **Personal CRM augmenté à l'IA** qui combine 3 piliers :

1. **Network Intelligence** — segmentation, scoring, priorisation des contacts
2. **Veille Marché en temps réel** — surveillance automatisée via Google News RSS (actus, changements de poste, levées de fonds)
3. **Assistant IA d'Engagement** — génération de messages personnalisés via GPT OSS 120B + Next Best Actions

**Résultat :** ce qui prenait **15 min** par contact prend maintenant **30 secondes**.

---

## Démo — La Boucle Complète

```
Capturer un profil LinkedIn (Apify) → Enrichir via IA (secteur, tags) → Détecter des actus en temps réel (Google News) → Générer 2 messages personnalisés + 1 NBA (OpenRouter) → Logger l'interaction (SQLite)
```

---

## Fonctionnalités

### Dashboard (`/dashboard`)

- **4 KPIs** : Total contacts, À relancer, Score moyen, Interactions du mois
- **Vue Liste** : tableau triable (par nom, score, date) avec filtres par statut et secteur
- **Vue Kanban** : colonnes par statut (À relancer / Relancé / À jour / Nouveau) avec **drag & drop** pour changer le statut d'un contact — **persisté en base de données**
- **Import CSV** : import avec barre de progression animée
- **Capture LinkedIn** : extraction réelle de profil via **Apify** en 3 étapes (scraping → enrichissement IA → ajout en DB)

### Fiche Contact (`/contacts/[id]`)

C'est le coeur de l'application — 3 onglets :

**Onglet Intelligence :**
- Actualités **en temps réel** de l'entreprise du contact via Google News RSS
- Types d'actus détectés automatiquement : news, changement de poste, levée de fonds, partenariat, lancement produit
- Score de pertinence pour chaque actu
- Synthèse IA avec key insights et angles de conversation suggérés
- Bouton "Rafraîchir" pour re-fetcher les dernières actus

**Onglet Messages :**
- Bouton "Générer des messages" — appel **réel** à GPT OSS 120B via OpenRouter
- L'IA utilise les **vraies actualités** Google News du contact pour personnaliser les messages
- 2 messages personnalisés générés : un ton **professionnel** et un ton **amical**
- Chaque message est copiable (clipboard) et modifiable (édition inline)
- **Next Best Action** (NBA) : action concrète recommandée
- Rationale "Pourquoi maintenant ?" avec sources

**Onglet Historique :**
- Timeline verticale des interactions passées (messages, calls, meetings, likes...)
- Formulaire pour logger une nouvelle interaction (type, note, résultat) — **persisté en DB**
- Le statut du contact se met à jour automatiquement (ex: "À relancer" → "Relancé")

### Veille Marché (`/veille`)

- **Filtres secteur** : Assurance, Banque, Tech/SaaS, FinTech, Conseil, HealthTech, Luxe, Transport, Énergie, Immobilier
- **Graphiques** : distribution par type d'actu, volume par secteur, timeline d'activité
- **Flux d'actualités en temps réel** : toutes les actus Google News agrégées pour les entreprises du réseau
- **Tendances Marché** : tendances transversales avec niveau d'impact et entreprises concernées

---

## Intégrations & APIs

| Service | Usage | Clé requise |
|---------|-------|-------------|
| **OpenRouter** (GPT OSS 120B free) | Génération de messages personnalisés + enrichissement secteur/tags | `OPENROUTER_API_KEY` |
| **Google News RSS** | Veille marché en temps réel (actualités par entreprise) | Aucune (gratuit, illimité) |
| **Apify** (LinkedIn Profile Scraper) | Capture de profils LinkedIn (nom, poste, entreprise, photo) | `APIFY_API_KEY` |
| **SQLite** (Prisma ORM) | Persistance des contacts, interactions, statuts | Aucune (local) |

---

## Stack Technique

| Technologie | Usage |
|-------------|-------|
| **Next.js 16** (App Router) | Framework fullstack |
| **TypeScript** | Typage strict |
| **Tailwind CSS v4** | Styling utilitaire |
| **shadcn/ui** (base-ui) | Composants UI |
| **Prisma** + **SQLite** | ORM + base de données locale |
| **Lucide React** | Icônes |
| **Framer Motion** | Animations |
| **Recharts** | Graphiques |
| **Sonner** | Notifications toast |
| **fast-xml-parser** | Parsing des flux RSS Google News |

---

## Architecture Projet

```
consultant-augmente/
├── app/
│   ├── layout.tsx                    # Layout principal (sidebar + header)
│   ├── page.tsx                      # Redirect → /dashboard
│   ├── globals.css                   # Styles globaux + Tailwind
│   ├── dashboard/
│   │   └── page.tsx                  # Dashboard (liste + kanban)
│   ├── contacts/
│   │   ├── page.tsx                  # Page contacts (liste)
│   │   └── [id]/
│   │       └── page.tsx              # Fiche contact détaillée
│   ├── veille/
│   │   └── page.tsx                  # Vue veille marché
│   └── api/
│       ├── contacts/
│       │   ├── route.ts              # GET (liste) + POST (création)
│       │   └── [id]/
│       │       ├── route.ts          # GET + PATCH + DELETE contact
│       │       └── interactions/
│       │           └── route.ts      # POST interaction (persiste en DB)
│       ├── intel/route.ts            # POST — actus temps réel (Google News RSS)
│       ├── veille/route.ts           # GET — actus multi-entreprises par secteur
│       ├── ai/generate/route.ts      # POST — génération messages IA (OpenRouter)
│       └── linkedin/
│           ├── capture/route.ts      # POST — scraping profil LinkedIn (Apify)
│           └── enrich/route.ts       # POST — enrichissement secteur/tags (IA)
│
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx               # Sidebar navigation + logo CGI
│   │   └── header.tsx                # Barre de recherche + user
│   ├── dashboard/
│   │   ├── contacts-table.tsx        # Tableau contacts triable
│   │   ├── contacts-kanban.tsx       # Vue Kanban drag & drop (persiste statuts)
│   │   ├── stats-cards.tsx           # 4 cartes KPI
│   │   ├── import-csv-dialog.tsx     # Dialog import CSV
│   │   └── capture-linkedin-dialog.tsx # Dialog capture LinkedIn (Apify + IA)
│   ├── contact/
│   │   ├── contact-header.tsx        # En-tête fiche (nom, score, tags)
│   │   ├── intel-section.tsx         # Onglet Intelligence (actus temps réel)
│   │   ├── message-generator.tsx     # Onglet Messages (génération IA réelle)
│   │   ├── message-card.tsx          # Carte message (copie + édition)
│   │   ├── nba-card.tsx              # Carte Next Best Action
│   │   ├── interaction-log.tsx       # Timeline interactions
│   │   └── log-interaction-form.tsx  # Formulaire log interaction (persiste en DB)
│   ├── veille/
│   │   ├── news-feed.tsx             # Flux d'actualités
│   │   ├── news-card.tsx             # Carte actualité
│   │   ├── veille-charts.tsx         # Graphiques veille (3 charts Recharts)
│   │   ├── market-trends.tsx         # Tendances marché
│   │   └── sector-filter.tsx         # Filtres secteur
│   └── ui/                           # Composants shadcn/ui
│
├── lib/
│   ├── types.ts                      # Types TypeScript
│   ├── utils.ts                      # Utilitaires (formatDate, getInitials...)
│   ├── constants.ts                  # Labels, couleurs, icônes, secteurs
│   ├── db.ts                         # Singleton Prisma client
│   ├── db-helpers.ts                 # Helpers DB → TypeScript conversion
│   ├── ai-prompt.ts                  # System prompt pour la génération IA
│   ├── news-fetcher.ts              # Fetcher Google News RSS + parsing XML
│   └── mock-data/                    # Données initiales (utilisées pour le seed)
│       ├── contacts.ts               # 12 contacts
│       ├── intel-items.ts            # 21 actualités (fallback)
│       ├── interactions.ts           # 16 interactions
│       ├── generated-messages.ts     # 7 engagements pré-générés (fallback)
│       └── market-trends.ts          # 8 tendances marché
│
├── prisma/
│   ├── schema.prisma                 # Schéma DB (Contact + Interaction)
│   ├── seed.ts                       # Script de seed (12 contacts + 16 interactions)
│   └── migrations/                   # Migrations SQLite
│
└── public/
    └── cgi-logo.png                  # Logo CGI
```

---

## Installation & Lancement

### Prérequis

- **Node.js** 18+
- **npm** 9+

### Installation

```bash
# Cloner le repo
git clone https://github.com/paulclark-04/cgi_personal_CRM.git
cd cgi_personal_CRM/consultant-augmente

# Installer les dépendances
npm install
```

### Configuration

Créer un fichier `.env.local` à la racine de `consultant-augmente/` :

```env
# Base de données SQLite (obligatoire)
DATABASE_URL="file:./dev.db"

# OpenRouter — génération de messages IA (obligatoire pour la génération)
OPENROUTER_API_KEY=votre_clé_openrouter

# Apify — capture de profils LinkedIn (obligatoire pour la capture LinkedIn)
APIFY_API_KEY=votre_clé_apify
```

Créer aussi un fichier `.env` :

```env
DATABASE_URL="file:./dev.db"
```

### Initialiser la base de données

```bash
# Créer la DB SQLite et la populer avec les données initiales
npx prisma migrate dev --name init
```

Cela crée automatiquement la base de données SQLite et la peuple avec 12 contacts et 16 interactions.

### Lancement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Build production

```bash
npm run build
npm start
```

---

## Ce qui fonctionne (en vrai)

- **Génération de messages IA** — GPT OSS 120B via OpenRouter, basée sur les vraies actualités du contact
- **Veille marché en temps réel** — Google News RSS, actualités fraîches pour chaque entreprise
- **Capture LinkedIn** — Apify scrape le profil réel, l'IA enrichit le secteur et les tags
- **Persistance complète** — SQLite via Prisma, les données survivent au refresh
- **Drag & drop Kanban** — les changements de statut sont persistés en DB
- **Interactions** — chaque interaction loggée est sauvegardée en DB

## Ce que le MVP ne fait pas (volontairement)

- Pas d'authentification
- Pas de scoring calculé dynamiquement (score statique)
- Pas d'envoi réel de messages (copier-coller)
- Pas d'import CSV réel (simulation UI)
- Pas de notifications / rappels automatiques

---

## Roadmap Future

- **Phase 1** : Scoring relationnel dynamique basé sur les interactions et la fréquence
- **Phase 2** : Import CSV réel pour ajout de contacts en masse
- **Phase 3** : Notifications et rappels automatiques de relance
- **Phase 4** : Migration PostgreSQL pour déploiement cloud
- **Phase 5** : Authentification et multi-utilisateurs
- **Phase 6** : Extension Chrome pour capture LinkedIn directe depuis le navigateur
- **Phase 7** : Multi-tenant pour déploiement en marque blanche chez CGI

---

## Licence

Projet réalisé dans le cadre du Hackathon CGI — ECE Paris, Mars 2026.
