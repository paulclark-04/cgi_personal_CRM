import { XMLParser } from "fast-xml-parser";
import type { IntelItem } from "./types";

const parser = new XMLParser({ ignoreAttributes: false });

interface RssItem {
  title: string;
  link: string;
  pubDate: string;
  source?: { "#text": string; "@_url": string } | string;
}

/**
 * Fetches real news from Google News RSS for a given company name.
 * Uses article titles as summaries (Google News RSS doesn't provide
 * article content, and source URLs point to homepages not articles).
 */
export async function fetchCompanyNews(
  company: string,
  contactId: string,
  maxItems = 5
): Promise<IntelItem[]> {
  const query = encodeURIComponent(company);
  const url = `https://news.google.com/rss/search?q=${query}&hl=fr&gl=FR&ceid=FR:fr`;

  const response = await fetch(url);

  if (!response.ok) {
    console.error(`Google News RSS error for "${company}":`, response.status);
    return [];
  }

  const xml = await response.text();
  const parsed = parser.parse(xml);

  const rawItems: RssItem[] = parsed?.rss?.channel?.item;
  if (!rawItems || !Array.isArray(rawItems)) {
    return [];
  }

  return rawItems.slice(0, maxItems).map((item, index) => {
    // Extract source info
    let sourceName = "Google News";
    if (typeof item.source === "object" && item.source) {
      sourceName = item.source["#text"] || "Google News";
    } else if (typeof item.source === "string") {
      sourceName = item.source;
    }

    // Clean title (remove " - Source" suffix)
    let title = item.title || "";
    const sourceSuffix = ` - ${sourceName}`;
    if (title.endsWith(sourceSuffix)) {
      title = title.slice(0, -sourceSuffix.length);
    }

    // Parse date
    const date = item.pubDate
      ? new Date(item.pubDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0];

    const type = guessIntelType(title);
    const score = Math.round((0.95 - index * 0.05) * 100) / 100;
    const tags = extractTags(title, company);

    return {
      id: `rss-${contactId}-${index}`,
      contactId,
      company,
      title,
      url: item.link || "",
      source: sourceName,
      date,
      summary: title, // Title IS the summary — it's the most reliable info from RSS
      tags,
      score,
      type,
    };
  });
}

function guessIntelType(title: string): IntelItem["type"] {
  const lower = title.toLowerCase();
  if (
    lower.includes("levée") ||
    lower.includes("financement") ||
    lower.includes("investissement") ||
    lower.includes("million") ||
    lower.includes("milliard") ||
    lower.includes("funding") ||
    lower.includes("série")
  ) {
    return "funding";
  }
  if (
    lower.includes("partenariat") ||
    lower.includes("alliance") ||
    lower.includes("accord") ||
    lower.includes("collaboration")
  ) {
    return "partnership";
  }
  if (
    lower.includes("nommé") ||
    lower.includes("nomination") ||
    lower.includes("rejoint") ||
    lower.includes("nouveau directeur") ||
    lower.includes("promotion")
  ) {
    return "job-change";
  }
  if (
    lower.includes("lance") ||
    lower.includes("lancement") ||
    lower.includes("nouveau produit") ||
    lower.includes("nouvelle offre") ||
    lower.includes("dévoile")
  ) {
    return "product-launch";
  }
  return "news";
}

function extractTags(title: string, company: string): string[] {
  const tags: string[] = [];
  const lower = title.toLowerCase();

  const keywords = [
    "IA", "intelligence artificielle", "digital", "cloud", "data",
    "ESG", "durable", "cyber", "blockchain", "fintech",
    "assurance", "banque", "santé", "énergie", "transformation",
    "acquisition", "croissance", "résultats", "innovation",
  ];

  for (const kw of keywords) {
    if (lower.includes(kw.toLowerCase())) {
      tags.push(kw);
    }
  }

  if (!tags.includes(company)) {
    tags.unshift(company);
  }

  return tags.slice(0, 4);
}

/**
 * Fetches news for multiple companies in parallel.
 */
export async function fetchMultipleCompaniesNews(
  companies: { company: string; contactId: string }[],
  maxPerCompany = 3
): Promise<IntelItem[]> {
  const results = await Promise.allSettled(
    companies.map(({ company, contactId }) =>
      fetchCompanyNews(company, contactId, maxPerCompany)
    )
  );

  const allItems: IntelItem[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      allItems.push(...result.value);
    }
  }

  allItems.sort((a, b) => b.date.localeCompare(a.date));
  return allItems;
}
