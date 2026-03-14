import type { ContactStatus, RelationshipType, InteractionType, InteractionOutcome } from "./types";

export const STATUS_LABELS: Record<ContactStatus, string> = {
  "to-relaunch": "À relancer",
  relaunched: "Relancé",
  "up-to-date": "À jour",
  new: "Nouveau",
};

export const STATUS_COLORS: Record<ContactStatus, string> = {
  "to-relaunch": "bg-red-100 text-red-700 border-red-200",
  relaunched: "bg-amber-100 text-amber-700 border-amber-200",
  "up-to-date": "bg-green-100 text-green-700 border-green-200",
  new: "bg-blue-100 text-blue-700 border-blue-200",
};

export const RELATIONSHIP_LABELS: Record<RelationshipType, string> = {
  alumni: "Alumni",
  "former-colleague": "Ancien collègue",
  client: "Client",
  prospect: "Prospect",
  partner: "Partenaire",
};

export const RELATIONSHIP_COLORS: Record<RelationshipType, string> = {
  alumni: "bg-purple-100 text-purple-700",
  "former-colleague": "bg-indigo-100 text-indigo-700",
  client: "bg-emerald-100 text-emerald-700",
  prospect: "bg-orange-100 text-orange-700",
  partner: "bg-cyan-100 text-cyan-700",
};

export const INTERACTION_TYPE_LABELS: Record<InteractionType, string> = {
  "linkedin-message": "Message LinkedIn",
  email: "Email",
  call: "Appel",
  meeting: "Réunion",
  comment: "Commentaire",
  like: "Like",
};

export const INTERACTION_TYPE_ICONS: Record<InteractionType, string> = {
  "linkedin-message": "💬",
  email: "📧",
  call: "📞",
  meeting: "🤝",
  comment: "💭",
  like: "👍",
};

export const OUTCOME_LABELS: Record<InteractionOutcome, string> = {
  sent: "Envoyé",
  replied: "Répondu",
  "meeting-scheduled": "Meeting planifié",
  "no-response": "Pas de réponse",
  pending: "En attente",
};

export const OUTCOME_COLORS: Record<InteractionOutcome, string> = {
  sent: "bg-blue-100 text-blue-700",
  replied: "bg-green-100 text-green-700",
  "meeting-scheduled": "bg-emerald-100 text-emerald-700",
  "no-response": "bg-gray-100 text-gray-700",
  pending: "bg-amber-100 text-amber-700",
};

export const INTEL_TYPE_ICONS: Record<string, string> = {
  news: "📰",
  "job-change": "👤",
  funding: "💰",
  partnership: "🤝",
  "product-launch": "🚀",
};

export const SECTORS = [
  "Tous",
  "Assurance",
  "Banque",
  "Tech / SaaS",
  "FinTech",
  "Conseil",
  "HealthTech",
  "Luxe / Cosmétiques",
  "Transport / Mobilité",
];
