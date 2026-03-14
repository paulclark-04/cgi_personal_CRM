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
  relationshipScore: number;
  lastInteractionAt: string | null;
  createdAt: string;
}

export interface IntelItem {
  id: string;
  contactId: string;
  company: string;
  title: string;
  url: string;
  source: string;
  date: string;
  summary: string;
  tags: string[];
  score: number;
  type: "news" | "job-change" | "funding" | "partnership" | "product-launch";
}

export interface Interaction {
  id: string;
  contactId: string;
  type: InteractionType;
  note: string;
  outcome: InteractionOutcome;
  timestamp: string;
}

export interface GeneratedMessage {
  tone: MessageTone;
  subject?: string;
  body: string;
}

export interface GeneratedEngagement {
  contactId: string;
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
