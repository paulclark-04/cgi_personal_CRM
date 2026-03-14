import type { Interaction } from "../types";

export const mockInteractions: Interaction[] = [
  // Thomas Moreau / BNP Paribas (c3) — relaunched
  {
    id: "int1",
    contactId: "c3",
    type: "meeting",
    note: "Réunion de suivi sur le projet de transformation digitale. Thomas intéressé par notre offre d'accompagnement cloud.",
    outcome: "meeting-scheduled",
    timestamp: "2026-02-20T09:00:00Z",
  },
  {
    id: "int2",
    contactId: "c3",
    type: "email",
    note: "Envoi de la proposition commerciale pour l'accompagnement migration cloud. Devis à 150K€.",
    outcome: "sent",
    timestamp: "2026-02-15T14:00:00Z",
  },
  {
    id: "int3",
    contactId: "c3",
    type: "linkedin-message",
    note: "Relance suite à l'annonce du plan de transformation digitale BNP. Thomas a répondu positivement.",
    outcome: "replied",
    timestamp: "2026-02-01T10:30:00Z",
  },
  {
    id: "int4",
    contactId: "c3",
    type: "comment",
    note: "Commenté son post LinkedIn sur la stratégie cloud de BNP Paribas.",
    outcome: "sent",
    timestamp: "2026-01-20T16:00:00Z",
  },

  // Alexandre Petit / McKinsey (c5) — up-to-date
  {
    id: "int5",
    contactId: "c5",
    type: "meeting",
    note: "Déjeuner networking. Échange sur les tendances IA dans le consulting. Possible collaboration sur un appel d'offres.",
    outcome: "meeting-scheduled",
    timestamp: "2026-03-05T11:00:00Z",
  },
  {
    id: "int6",
    contactId: "c5",
    type: "linkedin-message",
    note: "Discussion sur le rapport McKinsey 'State of AI 2026'. Alexandre partage des insights exclusifs.",
    outcome: "replied",
    timestamp: "2026-02-18T09:00:00Z",
  },
  {
    id: "int7",
    contactId: "c5",
    type: "call",
    note: "Call rapide pour discuter d'une opportunité de mission conjointe chez un client CAC40.",
    outcome: "replied",
    timestamp: "2026-01-30T15:00:00Z",
  },

  // Émilie Fournier / L'Oréal (c8) — relaunched
  {
    id: "int8",
    contactId: "c8",
    type: "email",
    note: "Suivi post-présentation de notre offre marketing digital IA. Émilie a transféré au DG pour validation budget.",
    outcome: "replied",
    timestamp: "2026-01-15T14:00:00Z",
  },
  {
    id: "int9",
    contactId: "c8",
    type: "meeting",
    note: "Présentation de notre solution d'IA pour la personnalisation marketing. Très bon accueil de l'équipe L'Oréal.",
    outcome: "meeting-scheduled",
    timestamp: "2025-12-10T10:00:00Z",
  },
  {
    id: "int10",
    contactId: "c8",
    type: "linkedin-message",
    note: "Premier contact via LinkedIn. Émilie intéressée par nos cas d'usage en marketing IA.",
    outcome: "replied",
    timestamp: "2025-11-20T11:00:00Z",
  },

  // Laura Chen / Capgemini (c10) — up-to-date
  {
    id: "int11",
    contactId: "c10",
    type: "linkedin-message",
    note: "Échange sur les opportunités de collaboration entre nos cabinets sur des missions digital advisory.",
    outcome: "replied",
    timestamp: "2026-02-28T16:30:00Z",
  },
  {
    id: "int12",
    contactId: "c10",
    type: "meeting",
    note: "Café networking au WeWork. Discussion sur l'évolution du marché conseil en France.",
    outcome: "meeting-scheduled",
    timestamp: "2026-02-10T12:00:00Z",
  },
  {
    id: "int13",
    contactId: "c10",
    type: "like",
    note: "Liké son article LinkedIn sur les tendances du conseil digital en 2026.",
    outcome: "sent",
    timestamp: "2026-01-25T08:00:00Z",
  },

  // Sophie Durand / SNCF (c12) — relaunched
  {
    id: "int14",
    contactId: "c12",
    type: "email",
    note: "Envoi d'un cas d'étude sur l'IA appliquée à la maintenance prédictive dans le transport.",
    outcome: "sent",
    timestamp: "2026-02-10T11:00:00Z",
  },
  {
    id: "int15",
    contactId: "c12",
    type: "linkedin-message",
    note: "Félicitations pour le déploiement de l'IA maintenance prédictive à la SNCF. Sophie a répondu avec intérêt.",
    outcome: "replied",
    timestamp: "2026-01-28T14:00:00Z",
  },
  {
    id: "int16",
    contactId: "c12",
    type: "comment",
    note: "Commenté le post SNCF sur l'innovation ferroviaire.",
    outcome: "sent",
    timestamp: "2026-01-10T09:00:00Z",
  },
];
