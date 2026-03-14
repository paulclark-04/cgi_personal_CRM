# PRD — "Consultant Augmenté" MVP
## Personal CRM Augmenté à l'IA — Hackathon CGI

**Version :** 1.0 — 14 mars 2026
**Équipe :** Antoine Brosseau, Gauthier Blanchard, Paul Clark, Marceau Michaud
**Programme :** Hackathon IA ECE-JEECE / CGI Business Consulting
**Deadline démo :** 16-18 mars 2026

---

## 1. RÉSUMÉ EXÉCUTIF

### Le Problème
Les consultants (surtout juniors) possèdent un réseau professionnel riche (alumni, anciens collègues, clients) mais ne l'exploitent pas :
- **85%** des opportunités business viennent du réseau
- **70%** des offres ne sont jamais publiées (marché caché)
- **80%** des consultants jugent le networking essentiel mais n'ont pas le temps de l'industrialiser

**3 pain points majeurs :**
1. **Réseau dormant** — contacts sous-exploités, relations qui se détériorent
2. **Veille dispersée** — informations fragmentées, impossible à synthétiser
3. **Priorisation impossible** — trop de contacts, pas assez de temps

### La Solution
Un **Personal CRM augmenté à l'IA** qui combine 3 piliers (le "Trifecta de Valeur") :
1. **Network Intelligence** — segmentation, scoring, priorisation des contacts
2. **Veille Marché & Concurrentielle** — surveillance automatisée des signaux faibles (actus, changements de poste, levées de fonds)
3. **Assistant IA d'Engagement** — génération de messages personnalisés + Next Best Actions

### Ce Que le MVP Démontre
La boucle complète en live :
```
Capturer un contact → Détecter des actus pertinentes → Générer 2 messages personnalisés + 1 NBA → Logger l'interaction
```
**Résultat :** ce qui prenait 15 min par contact prend maintenant 30 secondes.

### Contrainte Clé du MVP
**100% mock data.** Pas d'API réelles (OpenRouter, RSS, LinkedIn). Toutes les données sont simulées pour montrer la vision produit complète. L'objectif est de prouver la valeur et l'UX, pas l'intégration technique.

---

## 2. DÉCISIONS TECHNIQUES

| Décision | Choix | Justification |
|----------|-------|---------------|
| Framework | **Next.js 14+ (App Router)** | Tout-en-un : frontend + API routes mock, zero config DB |
| Styling | **Tailwind CSS + shadcn/ui** | Composants pro, style SaaS moderne type Linear/Notion |
| Données | **Mock data en fichiers JSON/TS** | Pas de DB, pas d'API externes. Simulation complète |
| Langage | **TypeScript** | Typage strict, meilleure DX avec Next.js |
| Déploiement | **Localhost** | `npm run dev` le jour de la démo |
| Extension Chrome | **Simulée dans la web app** | Bouton "Capturer depuis LinkedIn" qui ajoute un contact mock avec animation |
| Icons | **Lucide React** | Cohérent avec shadcn/ui |
| Animations | **Framer Motion** (optionnel) | Transitions fluides, loading states |
| Graphiques | **Recharts** | Dashboard KPIs et analytics légers |

---

## 3. ARCHITECTURE PROJET

### Arborescence Fichiers

```
consultant-augmente/
├── app/
│   ├── layout.tsx                    # Layout principal (sidebar + header)
│   ├── page.tsx                      # Redirect vers /dashboard
│   ├── globals.css                   # Styles globaux + Tailwind
│   │
│   ├── dashboard/
│   │   └── page.tsx                  # ÉCRAN 1 : Dashboard Contacts
│   │
│   ├── contacts/
│   │   └── [id]/
│   │       └── page.tsx              # ÉCRAN 2 : Fiche Contact Détaillée
│   │
│   ├── veille/
│   │   └── page.tsx                  # ÉCRAN 3 : Vue Veille Marché
│   │
│   └── api/                          # API Routes (mock)
│       ├── contacts/
│       │   └── route.ts              # GET /api/contacts — retourne mock data
│       ├── contacts/[id]/
│       │   └── route.ts              # GET /api/contacts/:id
│       ├── intel/
│       │   └── route.ts              # POST /api/intel/fetch — simule fetch RSS
│       └── ai/
│           └── generate/
│               └── route.ts          # POST /api/ai/generate — simule génération LLM
│
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx               # Sidebar navigation
│   │   ├── header.tsx                # Top bar avec search + user
│   │   └── mobile-nav.tsx            # Navigation mobile (optionnel)
│   │
│   ├── dashboard/
│   │   ├── contacts-table.tsx        # Tableau des contacts
│   │   ├── stats-cards.tsx           # Cartes KPI en haut du dashboard
│   │   ├── import-csv-dialog.tsx     # Modal simulant l'import CSV
│   │   └── capture-linkedin-dialog.tsx # Modal simulant la capture LinkedIn
│   │
│   ├── contact/
│   │   ├── contact-header.tsx        # En-tête fiche contact (nom, titre, photo)
│   │   ├── intel-section.tsx         # Section "Actualités récentes"
│   │   ├── message-generator.tsx     # Section génération messages IA
│   │   ├── message-card.tsx          # Carte d'un message généré
│   │   ├── nba-card.tsx              # Carte Next Best Action
│   │   ├── interaction-log.tsx       # Timeline des interactions
│   │   └── log-interaction-form.tsx  # Formulaire pour logger une interaction
│   │
│   ├── veille/
│   │   ├── news-feed.tsx             # Flux d'actualités
│   │   ├── news-card.tsx             # Carte d'une actualité
│   │   ├── market-trends.tsx         # Section tendances marché
│   │   └── sector-filter.tsx         # Filtre par secteur
│   │
│   └── ui/                           # Composants shadcn/ui (auto-générés)
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── textarea.tsx
│       ├── avatar.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── separator.tsx
│       ├── skeleton.tsx
│       ├── toast.tsx
│       └── dropdown-menu.tsx
│
├── lib/
│   ├── mock-data/
│   │   ├── contacts.ts               # 12 contacts fictifs enrichis
│   │   ├── intel-items.ts            # Actualités mock par entreprise
│   │   ├── interactions.ts           # Historique d'interactions mock
│   │   ├── generated-messages.ts     # Messages pré-générés par contact
│   │   └── market-trends.ts          # Tendances marché mock
│   │
│   ├── types.ts                      # Types TypeScript (Contact, IntelItem, etc.)
│   ├── utils.ts                      # Utilitaires (cn, formatDate, etc.)
│   └── constants.ts                  # Constantes (statuts, couleurs, etc.)
│
├── public/
│   ├── avatars/                      # Photos de profil mock (placeholder)
│   └── logo.svg                      # Logo "Consultant Augmenté"
│
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── components.json                   # Config shadcn/ui
```

---

## 4. TYPES TYPESCRIPT

```typescript
// lib/types.ts

export type ContactStatus = "to-relaunch" | "relaunched" | "up-to-date" | "new";
export type RelationshipType = "alumni" | "former-colleague" | "client" | "prospect" | "partner";
export type InteractionType = "linkedin-message" | "email" | "call" | "meeting" | "comment" | "like";
export type InteractionOutcome = "sent" | "replied" | "meeting-scheduled" | "no-response" | "pending";
export type MessageTone = "professional" | "friendly";

export interface Contact {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  sector: string;
  linkedinUrl: string;
  email?: string;
  avatarUrl?: string;
  relationshipType: RelationshipType;
  tags: string[];
  status: ContactStatus;
  relationshipScore: number;        // 0-100
  lastInteractionAt: string | null; // ISO date
  createdAt: string;                // ISO date
}

export interface IntelItem {
  id: string;
  contactId: string;
  company: string;
  title: string;
  url: string;
  source: string;                    // "Les Échos", "Le Figaro", "TechCrunch", etc.
  date: string;                      // ISO date
  summary: string;
  tags: string[];
  score: number;                     // 0-1 relevance score
  type: "news" | "job-change" | "funding" | "partnership" | "product-launch";
}

export interface Interaction {
  id: string;
  contactId: string;
  type: InteractionType;
  note: string;
  outcome: InteractionOutcome;
  timestamp: string;                 // ISO datetime
}

export interface GeneratedMessage {
  tone: MessageTone;
  subject?: string;
  body: string;
}

export interface GeneratedEngagement {
  messages: GeneratedMessage[];
  nba: string;
  whyThis: string;
  sources: string[];
  conversationAngles: string[];
}

export interface MarketTrend {
  id: string;
  sector: string;
  title: string;
  description: string;
  impactLevel: "high" | "medium" | "low";
  date: string;
  relatedCompanies: string[];
}
```

---

## 5. MOCK DATA (DONNÉES FICTIVES)

### 5.1 Contacts (12 contacts)

Les contacts doivent être **réalistes et diversifiés** — secteurs variés, relations différentes, statuts mélangés. Ils sont la base de la démo.

```typescript
// lib/mock-data/contacts.ts

export const mockContacts: Contact[] = [
  {
    id: "c1",
    name: "Marc Leblanc",
    firstName: "Marc",
    lastName: "Leblanc",
    title: "Head of Sales",
    company: "Allianz France",
    sector: "Assurance",
    linkedinUrl: "https://linkedin.com/in/marc-leblanc",
    email: "marc.leblanc@allianz.fr",
    avatarUrl: "/avatars/marc.jpg",
    relationshipType: "alumni",
    tags: ["decision-maker", "high-priority", "IA"],
    status: "to-relaunch",
    relationshipScore: 72,
    lastInteractionAt: "2025-09-15T10:00:00Z",
    createdAt: "2024-06-01T00:00:00Z"
  },
  {
    id: "c2",
    name: "Sarah Dupont",
    firstName: "Sarah",
    lastName: "Dupont",
    title: "CTO",
    company: "TechCorp",
    sector: "Tech / SaaS",
    linkedinUrl: "https://linkedin.com/in/sarah-dupont",
    email: "sarah.dupont@techcorp.io",
    avatarUrl: "/avatars/sarah.jpg",
    relationshipType: "former-colleague",
    tags: ["decision-maker", "scale-up", "engineering"],
    status: "to-relaunch",
    relationshipScore: 65,
    lastInteractionAt: "2025-12-01T14:30:00Z",
    createdAt: "2023-03-15T00:00:00Z"
  },
  {
    id: "c3",
    name: "Thomas Moreau",
    firstName: "Thomas",
    lastName: "Moreau",
    title: "Directeur Transformation Digitale",
    company: "BNP Paribas",
    sector: "Banque",
    linkedinUrl: "https://linkedin.com/in/thomas-moreau",
    avatarUrl: "/avatars/thomas.jpg",
    relationshipType: "client",
    tags: ["decision-maker", "transformation", "grand-compte"],
    status: "relaunched",
    relationshipScore: 85,
    lastInteractionAt: "2026-02-20T09:00:00Z",
    createdAt: "2024-01-10T00:00:00Z"
  },
  {
    id: "c4",
    name: "Julie Martin",
    firstName: "Julie",
    lastName: "Martin",
    title: "VP People & Culture",
    company: "Doctolib",
    sector: "HealthTech",
    linkedinUrl: "https://linkedin.com/in/julie-martin",
    email: "julie.martin@doctolib.com",
    avatarUrl: "/avatars/julie.jpg",
    relationshipType: "alumni",
    tags: ["HR", "scale-up", "culture"],
    status: "to-relaunch",
    relationshipScore: 45,
    lastInteractionAt: "2025-06-20T16:00:00Z",
    createdAt: "2023-09-01T00:00:00Z"
  },
  {
    id: "c5",
    name: "Alexandre Petit",
    firstName: "Alexandre",
    lastName: "Petit",
    title: "Partner",
    company: "McKinsey & Company",
    sector: "Conseil",
    linkedinUrl: "https://linkedin.com/in/alexandre-petit",
    avatarUrl: "/avatars/alexandre.jpg",
    relationshipType: "former-colleague",
    tags: ["senior", "stratégie", "consulting"],
    status: "up-to-date",
    relationshipScore: 90,
    lastInteractionAt: "2026-03-05T11:00:00Z",
    createdAt: "2022-01-01T00:00:00Z"
  },
  {
    id: "c6",
    name: "Camille Roux",
    firstName: "Camille",
    lastName: "Roux",
    title: "Head of Data & AI",
    company: "Société Générale",
    sector: "Banque",
    linkedinUrl: "https://linkedin.com/in/camille-roux",
    email: "camille.roux@socgen.com",
    avatarUrl: "/avatars/camille.jpg",
    relationshipType: "prospect",
    tags: ["data", "IA", "grand-compte"],
    status: "new",
    relationshipScore: 30,
    lastInteractionAt: null,
    createdAt: "2026-03-10T00:00:00Z"
  },
  {
    id: "c7",
    name: "Nicolas Bernard",
    firstName: "Nicolas",
    lastName: "Bernard",
    title: "CEO & Co-founder",
    company: "DataWave",
    sector: "Tech / SaaS",
    linkedinUrl: "https://linkedin.com/in/nicolas-bernard",
    email: "nicolas@datawave.ai",
    avatarUrl: "/avatars/nicolas.jpg",
    relationshipType: "alumni",
    tags: ["entrepreneur", "IA", "startup"],
    status: "to-relaunch",
    relationshipScore: 55,
    lastInteractionAt: "2025-10-12T08:00:00Z",
    createdAt: "2023-06-01T00:00:00Z"
  },
  {
    id: "c8",
    name: "Émilie Fournier",
    firstName: "Émilie",
    lastName: "Fournier",
    title: "Directrice Marketing",
    company: "L'Oréal",
    sector: "Luxe / Cosmétiques",
    linkedinUrl: "https://linkedin.com/in/emilie-fournier",
    avatarUrl: "/avatars/emilie.jpg",
    relationshipType: "client",
    tags: ["marketing", "digital", "grand-compte"],
    status: "relaunched",
    relationshipScore: 78,
    lastInteractionAt: "2026-01-15T14:00:00Z",
    createdAt: "2024-05-01T00:00:00Z"
  },
  {
    id: "c9",
    name: "Pierre Leclerc",
    firstName: "Pierre",
    lastName: "Leclerc",
    title: "DSI",
    company: "AXA France",
    sector: "Assurance",
    linkedinUrl: "https://linkedin.com/in/pierre-leclerc",
    avatarUrl: "/avatars/pierre.jpg",
    relationshipType: "prospect",
    tags: ["DSI", "cloud", "cyber"],
    status: "to-relaunch",
    relationshipScore: 40,
    lastInteractionAt: "2025-11-01T10:00:00Z",
    createdAt: "2025-02-01T00:00:00Z"
  },
  {
    id: "c10",
    name: "Laura Chen",
    firstName: "Laura",
    lastName: "Chen",
    title: "Senior Manager — Digital Advisory",
    company: "Capgemini",
    sector: "Conseil",
    linkedinUrl: "https://linkedin.com/in/laura-chen",
    email: "laura.chen@capgemini.com",
    avatarUrl: "/avatars/laura.jpg",
    relationshipType: "former-colleague",
    tags: ["conseil", "digital", "advisory"],
    status: "up-to-date",
    relationshipScore: 82,
    lastInteractionAt: "2026-02-28T16:30:00Z",
    createdAt: "2022-09-01T00:00:00Z"
  },
  {
    id: "c11",
    name: "Maxime Girard",
    firstName: "Maxime",
    lastName: "Girard",
    title: "Chief Revenue Officer",
    company: "Qonto",
    sector: "FinTech",
    linkedinUrl: "https://linkedin.com/in/maxime-girard",
    avatarUrl: "/avatars/maxime.jpg",
    relationshipType: "alumni",
    tags: ["revenue", "fintech", "scale-up"],
    status: "to-relaunch",
    relationshipScore: 50,
    lastInteractionAt: "2025-08-10T09:00:00Z",
    createdAt: "2023-11-01T00:00:00Z"
  },
  {
    id: "c12",
    name: "Sophie Durand",
    firstName: "Sophie",
    lastName: "Durand",
    title: "Responsable Innovation",
    company: "SNCF",
    sector: "Transport / Mobilité",
    linkedinUrl: "https://linkedin.com/in/sophie-durand",
    email: "sophie.durand@sncf.fr",
    avatarUrl: "/avatars/sophie.jpg",
    relationshipType: "partner",
    tags: ["innovation", "mobilité", "public"],
    status: "relaunched",
    relationshipScore: 68,
    lastInteractionAt: "2026-02-10T11:00:00Z",
    createdAt: "2024-08-01T00:00:00Z"
  }
];
```

### 5.2 Intel Items (Actualités Mock)

Créer **3-4 actualités par entreprise** pour les contacts principaux (au moins pour c1 Marc/Allianz, c2 Sarah/TechCorp, c3 Thomas/BNP, c6 Camille/SocGen, c7 Nicolas/DataWave). Les actualités doivent être **réalistes et datées de février-mars 2026**. Varier les types : news, job-change, funding, partnership, product-launch.

**Exemples pour Marc Leblanc / Allianz :**
```typescript
{
  id: "i1",
  contactId: "c1",
  company: "Allianz France",
  title: "Allianz annonce un partenariat stratégique avec Salesforce pour l'IA commerciale",
  url: "https://lesechos.fr/allianz-salesforce-ia-2026",
  source: "Les Échos",
  date: "2026-02-15",
  summary: "Allianz France et Salesforce s'associent pour déployer une solution d'IA générative au sein des équipes commerciales. L'objectif : automatiser 40% des tâches de reporting et personnaliser les interactions clients.",
  tags: ["partenariat", "IA", "Salesforce", "commercial"],
  score: 0.95,
  type: "partnership"
},
{
  id: "i2",
  contactId: "c1",
  company: "Allianz France",
  title: "Marc Leblanc nommé Head of Sales chez Allianz France",
  url: "https://linkedin.com/posts/allianz-marc-promotion",
  source: "LinkedIn",
  date: "2026-01-20",
  summary: "Marc Leblanc prend la tête de la direction commerciale d'Allianz France après 3 ans en tant que Directeur Régional. Sa mission : accélérer la digitalisation du parcours de vente.",
  tags: ["promotion", "nomination", "commercial"],
  score: 0.98,
  type: "job-change"
},
{
  id: "i3",
  contactId: "c1",
  company: "Allianz France",
  title: "Allianz lance un nouveau produit d'assurance cyber pour les PME",
  url: "https://argusdelassurance.com/allianz-cyber-pme",
  source: "L'Argus de l'Assurance",
  date: "2026-03-01",
  summary: "Face à la hausse des cyberattaques (+35% en 2025), Allianz dévoile une offre dédiée aux PME combinant assurance, prévention et accompagnement post-incident.",
  tags: ["cyber", "PME", "produit", "innovation"],
  score: 0.82,
  type: "product-launch"
}
```

**Générer des données similaires pour chaque contact principal (Sarah/TechCorp avec levée de fonds, Thomas/BNP avec transformation digitale, etc.)**

### 5.3 Messages Pré-Générés

Pour chaque contact qui a des intel items, pré-générer un objet `GeneratedEngagement` complet. Utiliser le format et les exemples du context file (section 18 — Few-Shot Examples).

**Exemple pour Marc Leblanc :**
```typescript
{
  contactId: "c1",
  messages: [
    {
      tone: "professional",
      body: "Marc,\n\nFélicitations pour ton nouveau rôle de Head of Sales chez Allianz ! J'ai vu qu'Allianz vient d'annoncer un partenariat stratégique avec Salesforce sur l'IA. Je repensais à notre échange de septembre dernier sur l'automatisation des processus commerciaux.\n\nJe serais curieux d'échanger sur comment vous envisagez d'intégrer l'IA dans vos processus sales. J'accompagne justement plusieurs directions commerciales sur ces sujets.\n\nDispo pour un café virtuel de 20 min la semaine prochaine ?\n\nBravo encore,\nPaul"
    },
    {
      tone: "friendly",
      body: "Salut Marc !\n\nJ'ai vu passer la news de ta promo — bravo, c'est mérité ! Et super timing avec le partenariat Allianz × Salesforce sur l'IA que j'ai vu cette semaine.\n\nÇa m'intéresserait vraiment de savoir comment tu vois l'évolution du rôle sales avec ces nouvelles technos. J'imagine que tu as plein d'insights là-dessus vu ton nouveau poste.\n\nOn en discute autour d'un call rapide ?\n\nÀ bientôt,\nPaul"
    }
  ],
  nba: "Liker et commenter le post LinkedIn d'Allianz annonçant le partenariat Salesforce",
  whyThis: "Marc vient d'être promu et son entreprise lance une initiative IA majeure. C'est le moment idéal pour reconnexion avec proposition de valeur sur l'automatisation commerciale.",
  sources: [
    "https://lesechos.fr/allianz-salesforce-ia-2026",
    "https://linkedin.com/posts/allianz-marc-promotion"
  ],
  conversationAngles: [
    "Comment Allianz prévoit d'implémenter l'IA dans les processus de vente ?",
    "Quels sont les défis du scale d'une équipe commerciale dans l'assurance ?"
  ]
}
```

**Générer un GeneratedEngagement pour au moins 6 contacts sur 12.**

### 5.4 Interactions (Historique)

Pré-remplir un historique d'interactions pour les contacts en statut "relaunched" et "up-to-date". 2-4 interactions par contact concerné.

### 5.5 Tendances Marché

5-8 tendances transversales pour l'écran Veille :
- "L'IA générative transforme les directions commerciales" (impact: high)
- "Vague de consolidation dans la FinTech européenne" (impact: high)
- "Cybersécurité : budgets en hausse de 25% dans le CAC40" (impact: medium)
- "Le cloud souverain devient un critère d'achat clé" (impact: medium)
- "Les ESN accélèrent sur l'offre consulting IA" (impact: high)
- etc.

---

## 6. SPÉCIFICATIONS UI — ÉCRAN PAR ÉCRAN

### Design System Global

**Palette de couleurs :**
- **Background principal :** `#FAFAFA` (gris très clair) ou dark mode `#0A0A0B`
- **Sidebar :** `#FFFFFF` bordure droite subtile, ou dark `#111113`
- **Accent primaire :** `#E11D48` (rouge CGI / rose-600) — utilisé pour CTAs, badges actifs, scoring
- **Accent secondaire :** `#3B82F6` (bleu) — liens, éléments informatifs
- **Success :** `#10B981` (vert) — statut "up-to-date", scores élevés
- **Warning :** `#F59E0B` (ambre) — statut "relaunched", scores moyens
- **Danger :** `#EF4444` (rouge) — statut "to-relaunch", scores bas
- **Text primary :** `#111827`
- **Text secondary :** `#6B7280`

**Typographie :**
- Font : `Inter` (Google Fonts) — sans-serif moderne
- Titres : Semi-bold 600
- Body : Regular 400
- Small / Labels : Medium 500, text-sm

**Bordures & Ombres :**
- Cards : `border border-gray-200 rounded-xl shadow-sm`
- Hover : `shadow-md transition-shadow`
- Radius : `rounded-lg` (8px) pour la plupart, `rounded-xl` (12px) pour les cards

**Spacing :**
- Page padding : `p-6` ou `p-8`
- Gap entre cards : `gap-4` ou `gap-6`
- Sidebar width : `w-64` (256px)

---

### ÉCRAN 1 : Dashboard Contacts (`/dashboard`)

**Layout :**
```
┌──────────────────────────────────────────────────────┐
│ SIDEBAR │            HEADER (search + user)           │
│         │─────────────────────────────────────────────│
│ 📊 Dashboard │                                        │
│ 👤 Contacts  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐     │
│ 📰 Veille    │  │ KPI │ │ KPI │ │ KPI │ │ KPI │     │
│              │  └─────┘ └─────┘ └─────┘ └─────┘     │
│ ───────────  │                                        │
│ ⚙️ Settings   │  ┌──────────────────────────────────┐  │
│              │  │  Filtres + Actions (Import, Add)  │  │
│              │  ├──────────────────────────────────┤  │
│              │  │                                  │  │
│              │  │        TABLEAU CONTACTS           │  │
│              │  │                                  │  │
│              │  │  Photo | Nom | Titre | Company   │  │
│              │  │  Score | Statut | Dernière inter │  │
│              │  │  ... 12 lignes ...               │  │
│              │  │                                  │  │
│              │  └──────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

**Composants détaillés :**

#### A. Sidebar (`components/layout/sidebar.tsx`)
- Logo "Consultant Augmenté" en haut (ou icône + nom)
- Navigation : Dashboard (icône LayoutDashboard), Contacts (Users), Veille (Newspaper)
- Séparateur
- Settings en bas (Settings icon)
- Indicateur page active : fond coloré subtil + texte bold
- Version : "v0.1 — PoC Hackathon CGI" en petit en bas

#### B. Header (`components/layout/header.tsx`)
- Barre de recherche (icône Search) — fonctionnelle : filtre les contacts par nom/company
- À droite : avatar utilisateur (Paul Clark) + nom + dropdown menu

#### C. Stats Cards (`components/dashboard/stats-cards.tsx`)
4 cartes KPI en row :
1. **Total Contacts** — "12" — icône Users — fond neutre
2. **À Relancer** — "5" — icône AlertCircle — fond rouge/rose subtil (ce sont ceux en statut "to-relaunch")
3. **Score Moyen** — "63/100" — icône TrendingUp — barre de progression
4. **Interactions ce mois** — "8" — icône MessageCircle — fond vert subtil

#### D. Actions Bar
- Filtre par statut : boutons/pills "Tous" | "À relancer" | "Relancés" | "À jour" | "Nouveaux"
- Filtre par secteur : dropdown avec les secteurs (Assurance, Banque, Tech, etc.)
- Bouton **"+ Importer CSV"** — ouvre un Dialog simulant un upload CSV (avec animation de succès)
- Bouton **"+ Capturer LinkedIn"** — ouvre un Dialog simulant la capture d'un profil LinkedIn (champ URL → animation parsing → contact ajouté)

#### E. Contacts Table (`components/dashboard/contacts-table.tsx`)
Tableau avec colonnes :
| Avatar + Nom | Titre | Entreprise | Secteur | Score | Statut | Dernière interaction | Actions |

- **Avatar** : cercle 32px avec initiales si pas de photo
- **Nom** : lien cliquable → `/contacts/[id]`
- **Score** : badge coloré (vert >70, ambre 40-70, rouge <40) avec le chiffre
- **Statut** : badge coloré ("À relancer" rouge, "Relancé" ambre, "À jour" vert, "Nouveau" bleu)
- **Dernière interaction** : format relatif ("il y a 3 jours", "il y a 6 mois")
- **Actions** : icône "..." dropdown → "Voir profil", "Générer message", "Logger interaction"
- **Tri** : cliquer sur l'en-tête de colonne pour trier (au moins par score et date)
- **Hover** : ligne surbrillance subtile

#### F. Import CSV Dialog (`components/dashboard/import-csv-dialog.tsx`)
Dialog modal qui simule l'import :
1. Zone drag & drop + bouton "Parcourir"
2. Au clic : animation de parsing (barre de progression)
3. Résultat : "12 contacts importés avec succès" + preview tableau
4. Bouton "Confirmer l'import"
**Important :** Tout est simulé — le fichier n'est pas réellement parsé, on affiche directement les mock contacts.

#### G. Capture LinkedIn Dialog (`components/dashboard/capture-linkedin-dialog.tsx`)
Dialog qui simule la capture depuis LinkedIn :
1. Champ input : "Collez l'URL du profil LinkedIn"
2. Bouton "Capturer"
3. Animation : spinner + étapes animées ("Extraction du profil...", "Enrichissement des données...", "Ajout au CRM...")
4. Résultat : card du contact capturé (pré-rempli avec un mock)
5. Bouton "Ajouter au réseau"
**Important :** Simulation complète — l'URL n'est pas réellement scrapée.

---

### ÉCRAN 2 : Fiche Contact (`/contacts/[id]`)

C'est l'écran le plus important — c'est là que la magie de la démo se passe.

**Layout :**
```
┌──────────────────────────────────────────────────────┐
│ SIDEBAR │            HEADER                           │
│         │─────────────────────────────────────────────│
│         │                                             │
│         │  ← Retour    CONTACT HEADER                 │
│         │  ┌──────────────────────────────────────┐   │
│         │  │ 📷 Marc Leblanc                      │   │
│         │  │ Head of Sales — Allianz France       │   │
│         │  │ Score: ████████░░ 72/100             │   │
│         │  │ 🏷️ alumni | decision-maker | IA       │   │
│         │  │ Dernière interaction : il y a 6 mois │   │
│         │  └──────────────────────────────────────┘   │
│         │                                             │
│         │  ┌─── TABS ──────────────────────────────┐  │
│         │  │ [Intelligence] [Messages] [Historique] │  │
│         │  └───────────────────────────────────────┘  │
│         │                                             │
│         │  (contenu du tab sélectionné)               │
│         │                                             │
└──────────────────────────────────────────────────────┘
```

**Composants détaillés :**

#### A. Contact Header (`components/contact/contact-header.tsx`)
- Bouton "← Retour au dashboard"
- Grand avatar (80px) + nom + titre + company
- Badge relationship type (alumni, former-colleague, etc.)
- Barre de score relationnelle (progress bar colorée 0-100)
- Tags sous forme de badges
- Statut actuel (badge coloré)
- "Dernière interaction : il y a X" (format relatif)
- Boutons d'action : "Ouvrir LinkedIn" (lien externe), "Envoyer email" (mailto:)

#### B. Onglet "Intelligence" (Tab par défaut)

**Section "Actualités Récentes" (`components/contact/intel-section.tsx`) :**
- Titre : "📰 Actualités — Allianz France"
- Bouton "🔄 Rafraîchir" — au clic : spinner 2-3 sec (simulé), puis affiche les actus mock
- 3 cartes d'actualité empilées verticalement :
  - Chaque carte : titre (lien cliquable), source + date, résumé 2-3 lignes, tags, score de pertinence (badge)
  - Type icon : 📰 news, 👤 job-change, 💰 funding, 🤝 partnership, 🚀 product-launch

**Section "Synthèse IA" :**
- Encadré avec fond subtil (bleu/violet très clair)
- Icône ✨ ou 🧠
- 2 bullet points "Key Insights" extraits des actus
- 2 "Angles de conversation" suggérés

#### C. Onglet "Messages"

**Section "Génération IA" (`components/contact/message-generator.tsx`) :**
- Bouton principal (gros, accent primaire) : **"✨ Générer des messages"**
- Au clic : animation de génération (typing effect ou skeleton loading, 3-4 secondes simulées)
- Résultat affiché :

  **Message Card Professional (`components/contact/message-card.tsx`) :**
  - Badge "Professionnel" (bleu)
  - Corps du message dans un bloc stylé (fond blanc, bordure gauche colorée)
  - Bouton "📋 Copier" en haut à droite
  - Bouton "✏️ Modifier" (ouvre un textarea pour éditer)

  **Message Card Friendly :**
  - Badge "Amical" (vert)
  - Même structure

  **NBA Card (`components/contact/nba-card.tsx`) :**
  - Encadré distinct (fond ambre/jaune très clair)
  - Icône ⚡ + "Next Best Action"
  - Texte de la NBA
  - Bouton "✅ Marquer comme fait"

  **Rationale :**
  - Petit encadré "Pourquoi maintenant ?" avec l'explication (1-2 phrases)
  - Sources listées (liens cliquables)

#### D. Onglet "Historique"

**Timeline des interactions (`components/contact/interaction-log.tsx`) :**
- Timeline verticale (ligne + cercles colorés)
- Chaque interaction : icône type (💬 message, 📞 call, 👍 like, 📧 email), date, note, outcome (badge)
- Interactions triées par date DESC (plus récent en haut)

**Formulaire "Logger une interaction" (`components/contact/log-interaction-form.tsx`) :**
- En haut de la timeline
- Champs :
  - Type (Select) : Message LinkedIn, Email, Appel, Réunion, Commentaire, Like
  - Note (Textarea) : texte libre
  - Résultat (Select) : Envoyé, Répondu, Meeting planifié, Pas de réponse
- Bouton "Enregistrer"
- Au submit : animation de succès, nouvelle interaction apparaît en haut de la timeline (mock — ajout local au state React)

---

### ÉCRAN 3 : Vue Veille Marché (`/veille`)

**Layout :**
```
┌──────────────────────────────────────────────────────┐
│ SIDEBAR │            HEADER                           │
│         │─────────────────────────────────────────────│
│         │                                             │
│         │  ┌──────────────────────────────────────┐   │
│         │  │  FILTRES SECTEUR (pills/chips)       │   │
│         │  │  [Tous] [Banque] [Assurance] [Tech]  │   │
│         │  │  [FinTech] [Conseil] [HealthTech]    │   │
│         │  └──────────────────────────────────────┘   │
│         │                                             │
│         │  ┌──── COL GAUCHE ───┐ ┌── COL DROITE ──┐  │
│         │  │                   │ │                 │  │
│         │  │   FLUX ACTUS      │ │  TENDANCES      │  │
│         │  │                   │ │  MARCHÉ          │  │
│         │  │  Card actu 1      │ │                 │  │
│         │  │  Card actu 2      │ │  Trend card 1  │  │
│         │  │  Card actu 3      │ │  Trend card 2  │  │
│         │  │  Card actu 4      │ │  Trend card 3  │  │
│         │  │  ...              │ │  ...            │  │
│         │  │                   │ │                 │  │
│         │  └───────────────────┘ └─────────────────┘  │
└──────────────────────────────────────────────────────┘
```

**Composants détaillés :**

#### A. Filtres Secteur (`components/veille/sector-filter.tsx`)
- Chips/pills cliquables : "Tous", "Banque", "Assurance", "Tech / SaaS", "FinTech", "Conseil", "HealthTech", "Luxe", "Transport"
- Sélection active : fond accent, texte blanc
- Filtre les actualités affichées en dessous

#### B. Flux d'Actualités (`components/veille/news-feed.tsx`)
- Colonne gauche (2/3 de la largeur)
- Toutes les intel items de tous les contacts, triées par date DESC
- Chaque carte (`components/veille/news-card.tsx`) :
  - Type badge (coloré par type)
  - Titre (lien)
  - Source + date
  - Résumé (2-3 lignes, troncable)
  - Tags
  - **"Contacts liés :"** — avatar(s) miniature(s) du/des contact(s) associé(s), cliquables vers leur fiche
  - Score de pertinence (petit badge)

#### C. Tendances Marché (`components/veille/market-trends.tsx`)
- Colonne droite (1/3 de la largeur)
- Titre "📊 Tendances Marché"
- Cards empilées :
  - Titre de la tendance
  - Description courte (2-3 lignes)
  - Badge impact (🔴 High, 🟡 Medium, 🟢 Low)
  - Entreprises liées (badges cliquables)
  - Date

---

## 7. COMPORTEMENTS INTERACTIFS & ANIMATIONS

### Simulation de la Génération IA
Quand l'utilisateur clique "Générer des messages" sur une fiche contact :
1. **Phase 1 (0-1s)** : Le bouton passe en état loading (spinner)
2. **Phase 2 (1-2s)** : Skeleton loaders apparaissent à la place des messages (3 blocs gris animés)
3. **Phase 3 (2-3s)** : Texte "Analyse des actualités en cours..." puis "Génération des messages..."
4. **Phase 4 (3-4s)** : Les messages apparaissent avec une animation fade-in, un par un (d'abord le pro, puis le friendly, puis la NBA)

**Implémentation :** Simple `setTimeout` côté client. Les messages sont déjà dans le mock data, on simule juste le délai.

### Simulation du Rafraîchissement Intel
Quand l'utilisateur clique "Rafraîchir" sur les actualités :
1. Spinner sur le bouton
2. Skeleton loaders remplacent les cartes actus (1.5-2s)
3. Cartes réapparaissent (même données mock mais l'effet est là)

### Simulation Import CSV
1. Zone drag & drop avec bordure pointillée
2. Au "drop" ou clic : barre de progression animée (2s)
3. Message de succès avec nombre de contacts
4. Table preview des contacts importés

### Simulation Capture LinkedIn
1. Input URL + bouton "Capturer"
2. Étapes animées séquentiellement :
   - "🔍 Extraction du profil..." (1s)
   - "📊 Enrichissement des données..." (1s)
   - "✅ Ajout au CRM..." (0.5s)
3. Card du contact apparaît avec animation slide-up
4. Bouton "Ajouter au réseau"

### Copie Message
Au clic sur "Copier" :
- Le texte est copié dans le clipboard (`navigator.clipboard.writeText`)
- Le bouton change momentanément : "✅ Copié !" (1.5s puis revient)
- Toast notification en bas à droite "Message copié"

### Logger Interaction
Au submit du formulaire :
- Animation de succès (check vert)
- Nouvelle interaction ajoutée en haut de la timeline (state local React)
- Le statut du contact change (ex: "to-relaunch" → "relaunched")
- Toast : "Interaction enregistrée"

---

## 8. API ROUTES MOCK

Ces routes simulent un vrai backend. Elles retournent des données mock avec un délai artificiel pour simuler la latence réseau.

### `GET /api/contacts`
Retourne la liste des contacts. Supporte query params `?status=to-relaunch&sector=Banque` pour filtrage.

### `GET /api/contacts/[id]`
Retourne un contact par ID avec ses intel items et interactions associées.

### `POST /api/intel/fetch`
Body : `{ contactId: string }`
Simule le fetch de news RSS. Retourne les intel items mock après un délai de 2s (`await new Promise(r => setTimeout(r, 2000))`).

### `POST /api/ai/generate`
Body : `{ contactId: string }`
Simule la génération IA. Retourne le GeneratedEngagement mock après un délai de 3.5s.

---

## 9. INSTRUCTIONS DE DÉVELOPPEMENT POUR CLAUDE CODE

### Ordre de Construction (Phases)

**Phase 1 : Setup Projet (10 min)**
1. `npx create-next-app@latest consultant-augmente --typescript --tailwind --eslint --app --src-dir=false`
2. Installer shadcn/ui : `npx shadcn@latest init`
3. Installer composants shadcn nécessaires : button, card, badge, dialog, input, select, textarea, avatar, table, tabs, separator, skeleton, toast, dropdown-menu
4. Installer dépendances : `npm install lucide-react framer-motion recharts`
5. Configurer la font Inter dans `app/layout.tsx`
6. Configurer les couleurs custom dans `tailwind.config.ts`

**Phase 2 : Mock Data & Types (15 min)**
1. Créer `lib/types.ts` avec tous les types TypeScript
2. Créer `lib/mock-data/contacts.ts` — 12 contacts
3. Créer `lib/mock-data/intel-items.ts` — 3-4 actus par contact principal
4. Créer `lib/mock-data/interactions.ts` — historique pour contacts relancés
5. Créer `lib/mock-data/generated-messages.ts` — messages pré-générés pour 6+ contacts
6. Créer `lib/mock-data/market-trends.ts` — 5-8 tendances
7. Créer `lib/utils.ts` et `lib/constants.ts`

**Phase 3 : Layout & Navigation (15 min)**
1. Créer le layout global (`app/layout.tsx`) avec sidebar + header
2. Implémenter la sidebar avec navigation active
3. Implémenter le header avec search bar
4. Style global (couleurs, spacing, dark mode prep)

**Phase 4 : Dashboard Contacts (30 min)**
1. Stats cards (4 KPIs)
2. Barre de filtres + boutons actions
3. Table des contacts avec tri et filtrage
4. Dialog Import CSV (simulation)
5. Dialog Capture LinkedIn (simulation)

**Phase 5 : Fiche Contact (45 min)**
C'est le cœur du MVP — y passer le plus de temps.
1. Contact header (infos, score, tags)
2. Système de tabs (Intelligence, Messages, Historique)
3. Tab Intelligence : cartes actualités + synthèse IA
4. Tab Messages : bouton génération + animation + message cards + NBA card
5. Tab Historique : timeline interactions + formulaire log

**Phase 6 : Vue Veille Marché (20 min)**
1. Filtres secteur (chips)
2. Flux d'actualités (toutes les intel items agrégées)
3. Tendances marché (sidebar droite)

**Phase 7 : Polish & Animations (15 min)**
1. Animations de chargement (skeleton, typing effect)
2. Transitions entre pages/tabs
3. Toast notifications
4. Responsive (s'assurer que ça marche sur un laptop)
5. Vérifier tous les liens de navigation

### Règles de Code

- **TypeScript strict** — pas de `any`, types explicites partout
- **Composants React fonctionnels** avec hooks
- **Server Components** par défaut (Next.js App Router), `"use client"` uniquement quand nécessaire (interactions, state)
- **Nommage** : kebab-case pour les fichiers, PascalCase pour les composants
- **Import paths** : utiliser `@/` pour les imports absolus
- **Pas de `localStorage`** — tout en React state / props
- **Mock data** importée directement depuis `@/lib/mock-data/`
- **Responsive** : mobile-first mais priorité au rendu laptop (c'est pour une démo en salle)
- **Commentaires** : commenter les sections clés (surtout la logique de simulation)
- Utiliser des **placeholder images** pour les avatars (initiales dans un cercle coloré via un composant, ou `https://ui-avatars.com/api/?name=Marc+Leblanc`)

### Ce Qui Doit Fonctionner Parfaitement Pour la Démo

1. ✅ Navigation sidebar → 3 pages accessibles
2. ✅ Dashboard : voir tous les contacts, filtrer par statut
3. ✅ Cliquer sur un contact → fiche détaillée
4. ✅ Voir les actualités du contact (3 actus)
5. ✅ Cliquer "Générer des messages" → animation → 2 messages + NBA apparaissent
6. ✅ Copier un message (clipboard)
7. ✅ Logger une interaction (formulaire → ajout dans la timeline)
8. ✅ Capture LinkedIn simulée (dialog → animation → contact "ajouté")
9. ✅ Vue veille : flux d'actus filtrables par secteur

---

## 10. SCÉNARIO DE DÉMO (10 MIN)

Ce script correspond exactement au flow que le jury CGI verra. Le MVP doit supporter chaque étape.

**[1 min] Introduction**
- Ouvrir le dashboard
- "Notre solution transforme le réseau dormant des consultants en pipeline commercial actif, grâce à l'IA."

**[2 min] Étape 1 : Vue d'Ensemble**
- Montrer les 4 KPIs ("12 contacts, 5 à relancer, score moyen 63/100")
- Filtrer par "À relancer" → 5 contacts apparaissent
- "L'outil identifie automatiquement qui relancer en priorité"

**[1 min] Étape 2 : Capture d'un Contact**
- Cliquer "Capturer depuis LinkedIn"
- Coller une URL fictive
- Montrer l'animation d'extraction
- "En un clic, le contact est capturé et enrichi"

**[2 min] Étape 3 : Intelligence sur un Contact**
- Cliquer sur Marc Leblanc
- Montrer la fiche : score 72/100, alumni, à relancer depuis 6 mois
- Tab Intelligence : "3 actualités récentes détectées automatiquement"
- Montrer la synthèse IA : "Allianz accélère sur l'IA commerciale..."

**[3 min] Étape 4 : Génération de Messages (LE MOMENT CLÉ)**
- Tab Messages → cliquer "Générer des messages"
- Animation de génération (3-4 sec)
- Montrer les 2 messages (pro + friendly) — lire un extrait
- Montrer la NBA : "Liker le post Allianz..."
- Montrer le "Pourquoi maintenant"
- Copier un message → "Prêt à envoyer en 30 secondes"

**[1 min] Étape 5 : Logger & Suivre**
- Logger l'interaction ("Message LinkedIn envoyé, attend réponse")
- Contact passe de "À relancer" à "Relancé"
- "Chaque interaction est tracée pour capitaliser"

**[0.5 min] Étape 6 : Vue Veille**
- Ouvrir la page Veille
- Montrer le flux multi-secteur
- Filtrer par "Banque"
- "La veille est centralisée et actionnable"

**[0.5 min] Conclusion**
- "De 15 min à 30 sec par contact. Veille automatisée, messages personnalisés, réseau activé."
- "Architecture intégrable chez CGI, scalable en marque blanche."

---

## 11. CRITÈRES DE SUCCÈS DU MVP

| Critère | Target |
|---------|--------|
| Pages fonctionnelles | 3/3 (dashboard, fiche contact, veille) |
| Navigation | Fluide, pas de crash, pas de page blanche |
| Simulation génération IA | Animation réaliste + messages affichés |
| Copie message | Fonctionne (clipboard) |
| Log interaction | Formulaire → ajout dans timeline |
| Filtrage contacts | Par statut et secteur |
| Temps de lancement | `npm run dev` → app accessible en <10s |
| Rendu visuel | Pro, SaaS moderne, pas de "look prototype" |
| Responsive laptop | Fonctionne sur un écran 13-15" |

---

## 12. CE QUE LE MVP NE FAIT PAS (VOLONTAIREMENT)

- ❌ Pas de vrais appels API (OpenRouter, RSS, LinkedIn)
- ❌ Pas de base de données (tout en mock JSON)
- ❌ Pas d'authentification / login
- ❌ Pas de vraie extension Chrome
- ❌ Pas de scoring relationnel calculé dynamiquement
- ❌ Pas de persistence côté serveur (refresh = reset)
- ❌ Pas de dark mode (sauf si le temps le permet)
- ❌ Pas de multi-user / multi-tenant
- ❌ Pas d'envoi réel de messages

**Tout cela est mentionné en "Roadmap Future" dans le pitch.**

---

## ANNEXE A : Commandes de Setup

```bash
# Créer le projet
npx create-next-app@latest consultant-augmente --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*"

cd consultant-augmente

# Initialiser shadcn/ui
npx shadcn@latest init

# Installer les composants shadcn
npx shadcn@latest add button card badge dialog input select textarea avatar table tabs separator skeleton toast dropdown-menu progress

# Installer dépendances additionnelles
npm install lucide-react recharts framer-motion

# Lancer le dev server
npm run dev
```

## ANNEXE B : Résumé pour le Pitch (Fiche POC 1 Page)

**ENJEU** : 85% des opportunités viennent du réseau, mais celui-ci reste dormant. La veille est dispersée, les relances sont oubliées.

**SOLUTION** : Personal CRM augmenté IA qui combine intelligence réseau, veille automatisée et génération de messages personnalisés. Workflow : Capturer → Détecter → Générer → Logger.

**VALEUR** : 15 min → 30 sec par contact. Réseau activé systématiquement. Messages contextualisés grâce à la veille. Capitalisation complète des interactions.

**FAISABILITÉ** : Architecture Next.js + API IA (OpenRouter), intégrable chez CGI, scalable en marque blanche. Compliance LinkedIn (user-initiated). RGPD-ready.

---

**FIN DU PRD**

Ce document contient 100% des informations nécessaires pour que Claude Code construise le MVP de A à Z. Chaque écran, chaque composant, chaque interaction, chaque donnée mock est spécifié.
