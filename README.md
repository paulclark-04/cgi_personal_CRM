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
2. **Veille Marché & Concurrentielle** — surveillance automatisée des signaux faibles (actus, changements de poste, levées de fonds)
3. **Assistant IA d'Engagement** — génération de messages personnalisés + Next Best Actions

**Résultat :** ce qui prenait **15 min** par contact prend maintenant **30 secondes**.

---

## Démo — La Boucle Complète

```
Capturer un contact → Détecter des actus pertinentes → Générer 2 messages personnalisés + 1 NBA → Logger l'interaction
```

---

## Fonctionnalités

### Dashboard (`/dashboard`)

- **4 KPIs** : Total contacts, À relancer, Score moyen, Interactions du mois
- **Vue Liste** : tableau triable (par nom, score, date) avec filtres par statut et secteur
- **Vue Kanban** : colonnes par statut (À relancer / Relancé / À jour / Nouveau) avec **drag & drop** pour changer le statut d'un contact
- **Import CSV** : simulation d'import avec barre de progression animée
- **Capture LinkedIn** : simulation d'extraction de profil en 3 étapes (extraction → enrichissement → ajout)

### Fiche Contact (`/contacts/[id]`)

C'est le coeur de l'application — 3 onglets :

**Onglet Intelligence :**
- Actualités récentes de l'entreprise du contact (3-4 par contact)
- Types d'actus : news, changement de poste, levée de fonds, partenariat, lancement produit
- Score de pertinence pour chaque actu
- Synthèse IA avec key insights et angles de conversation suggérés
- Bouton "Rafraîchir" avec animation de chargement

**Onglet Messages :**
- Bouton "Générer des messages" avec animation en 4 phases (loading → analyse → génération → affichage)
- 2 messages personnalisés générés : un ton **professionnel** et un ton **amical**
- Chaque message est copiable (clipboard) et modifiable (édition inline)
- **Next Best Action** (NBA) : action concrète recommandée (ex: "Liker le post LinkedIn...")
- Rationale "Pourquoi maintenant ?" avec sources

**Onglet Historique :**
- Timeline verticale des interactions passées (messages, calls, meetings, likes...)
- Formulaire pour logger une nouvelle interaction (type, note, résultat)
- Le statut du contact se met à jour automatiquement (ex: "À relancer" → "Relancé")

### Veille Marché (`/veille`)

- **Filtres secteur** : Assurance, Banque, Tech/SaaS, FinTech, Conseil, HealthTech, Luxe, Transport
- **Flux d'actualités** : toutes les actus agrégées, triées par date, avec le contact lié
- **Tendances Marché** : 8 tendances transversales avec niveau d'impact et entreprises concernées

---

## Stack Technique

| Technologie | Usage |
|-------------|-------|
| **Next.js 16** (App Router) | Framework fullstack |
| **TypeScript** | Typage strict |
| **Tailwind CSS v4** | Styling utilitaire |
| **shadcn/ui** (base-ui) | Composants UI |
| **Lucide React** | Icônes |
| **Framer Motion** | Animations |
| **Recharts** | Graphiques (prêt pour extension) |
| **Sonner** | Notifications toast |

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
│   └── api/                          # API Routes (mock)
│       ├── contacts/route.ts         # GET /api/contacts
│       ├── contacts/[id]/route.ts    # GET /api/contacts/:id
│       ├── intel/route.ts            # POST /api/intel/fetch
│       └── ai/generate/route.ts      # POST /api/ai/generate
│
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx               # Sidebar navigation + logo CGI
│   │   └── header.tsx                # Barre de recherche + user
│   ├── dashboard/
│   │   ├── contacts-table.tsx        # Tableau contacts triable
│   │   ├── contacts-kanban.tsx       # Vue Kanban drag & drop
│   │   ├── stats-cards.tsx           # 4 cartes KPI
│   │   ├── import-csv-dialog.tsx     # Dialog import CSV simulé
│   │   └── capture-linkedin-dialog.tsx # Dialog capture LinkedIn simulée
│   ├── contact/
│   │   ├── contact-header.tsx        # En-tête fiche (nom, score, tags)
│   │   ├── intel-section.tsx         # Onglet Intelligence (actus + synthèse)
│   │   ├── message-generator.tsx     # Onglet Messages (génération IA)
│   │   ├── message-card.tsx          # Carte message (copie + édition)
│   │   ├── nba-card.tsx              # Carte Next Best Action
│   │   ├── interaction-log.tsx       # Timeline interactions
│   │   └── log-interaction-form.tsx  # Formulaire log interaction
│   ├── veille/
│   │   ├── news-feed.tsx             # Flux d'actualités
│   │   ├── news-card.tsx             # Carte actualité
│   │   ├── market-trends.tsx         # Tendances marché
│   │   └── sector-filter.tsx         # Filtres secteur
│   └── ui/                           # Composants shadcn/ui
│
├── lib/
│   ├── types.ts                      # Types TypeScript
│   ├── utils.ts                      # Utilitaires (formatDate, getInitials...)
│   ├── constants.ts                  # Labels, couleurs, icônes
│   └── mock-data/
│       ├── contacts.ts               # 12 contacts fictifs
│       ├── intel-items.ts            # 21 actualités mock
│       ├── interactions.ts           # 16 interactions historiques
│       ├── generated-messages.ts     # 7 engagements pré-générés
│       └── market-trends.ts          # 8 tendances marché
│
└── public/
    └── cgi-logo.png                  # Logo CGI
```

---

## Données Mock

Le MVP fonctionne avec des **données 100% simulées** — pas d'API externes.

### 12 Contacts

| Nom | Entreprise | Secteur | Statut |
|-----|-----------|---------|--------|
| Marc Leblanc | Allianz France | Assurance | À relancer |
| Sarah Dupont | TechCorp | Tech / SaaS | À relancer |
| Thomas Moreau | BNP Paribas | Banque | Relancé |
| Julie Martin | Doctolib | HealthTech | À relancer |
| Alexandre Petit | McKinsey | Conseil | À jour |
| Camille Roux | Société Générale | Banque | Nouveau |
| Nicolas Bernard | DataWave | Tech / SaaS | À relancer |
| Émilie Fournier | L'Oréal | Luxe / Cosmétiques | Relancé |
| Pierre Leclerc | AXA France | Assurance | À relancer |
| Laura Chen | Capgemini | Conseil | À jour |
| Maxime Girard | Qonto | FinTech | À relancer |
| Sophie Durand | SNCF | Transport / Mobilité | Relancé |

### Types d'actualités

- **News** : articles de presse (Les Échos, TechCrunch, Forbes...)
- **Job Change** : promotions, changements de poste
- **Funding** : levées de fonds (Série A, C...)
- **Partnership** : partenariats stratégiques
- **Product Launch** : lancements de produits

### Messages IA pré-générés

Pour 7 contacts, l'app génère :
- 1 message ton **professionnel**
- 1 message ton **amical**
- 1 **Next Best Action**
- 1 explication "Pourquoi maintenant ?"
- Des angles de conversation

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

## Scénario de Démo (10 min)

| Durée | Étape | Action |
|-------|-------|--------|
| 1 min | Introduction | Ouvrir le dashboard, présenter les KPIs |
| 2 min | Vue d'ensemble | Filtrer par "À relancer", montrer la vue Kanban |
| 1 min | Capture contact | Cliquer "Capturer LinkedIn", montrer l'animation |
| 2 min | Intelligence | Ouvrir Marc Leblanc, montrer les 3 actus + synthèse IA |
| 3 min | Messages IA | Cliquer "Générer des messages", montrer les 2 tons + NBA, copier un message |
| 1 min | Logger & Suivre | Logger une interaction, voir le statut changer |
| 0.5 min | Veille | Montrer le flux multi-secteur, filtrer par "Banque" |
| 0.5 min | Conclusion | "De 15 min à 30 sec par contact" |

---

## Ce que le MVP ne fait pas (volontairement)

- Pas de vrais appels API (OpenRouter, RSS, LinkedIn)
- Pas de base de données (tout en mock JSON)
- Pas d'authentification
- Pas de vraie extension Chrome
- Pas de scoring calculé dynamiquement
- Pas de persistence serveur (refresh = reset)
- Pas d'envoi réel de messages

**Tout cela est prévu dans la roadmap future.**

---

## Roadmap Future

- **Phase 1** : Intégration OpenRouter pour la génération IA réelle
- **Phase 2** : Connexion RSS/API pour la veille automatisée
- **Phase 3** : Extension Chrome pour la capture LinkedIn
- **Phase 4** : Base de données (PostgreSQL) + authentification
- **Phase 5** : Scoring relationnel dynamique basé sur les interactions
- **Phase 6** : Notifications et rappels automatiques
- **Phase 7** : Multi-tenant pour déploiement en marque blanche chez CGI

---

## Licence

Projet réalisé dans le cadre du Hackathon CGI — ECE Paris, Mars 2026.
