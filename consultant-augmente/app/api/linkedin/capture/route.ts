import { NextRequest, NextResponse } from "next/server";

const LINKEDIN_URL_RE =
  /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w\-%.]{3,100}\/?$/i;

export async function POST(request: NextRequest) {
  try {
    const { url } = (await request.json()) as { url?: string };

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Missing required field: url" },
        { status: 400 }
      );
    }

    const cleanUrl = url.trim().replace(/\/+$/, "");

    if (!LINKEDIN_URL_RE.test(cleanUrl)) {
      return NextResponse.json(
        {
          error:
            "Invalid LinkedIn profile URL. Expected format: https://www.linkedin.com/in/username",
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.APIFY_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Apify API key is not configured" },
        { status: 500 }
      );
    }

    // Call Apify actor synchronously — input key is "urls" not "profileUrls"
    const actorId = "harvestapi~linkedin-profile-scraper";
    const apifyUrl = `https://api.apify.com/v2/acts/${actorId}/run-sync-get-dataset-items?token=${apiKey}`;

    const apifyResponse = await fetch(apifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ urls: [cleanUrl] }),
      signal: AbortSignal.timeout(60_000),
    });

    if (!apifyResponse.ok) {
      const errorText = await apifyResponse.text().catch(() => "Unknown error");
      console.error("Apify API error:", apifyResponse.status, errorText);
      return NextResponse.json(
        { error: `LinkedIn scraping failed (status ${apifyResponse.status})` },
        { status: 502 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const profiles: any[] = await apifyResponse.json();

    if (!Array.isArray(profiles) || profiles.length === 0) {
      return NextResponse.json(
        { error: "No profile data returned from LinkedIn" },
        { status: 404 }
      );
    }

    const profile = profiles[0];

    // Extract fields from the Apify response structure
    const firstName = profile.firstName ?? "";
    const lastName = profile.lastName ?? "";

    // currentPosition is an array of { companyName, title?, ... }
    const currentPositions = profile.currentPosition ?? [];
    const currentPos = currentPositions[0];

    const title = currentPos?.title ?? profile.headline ?? "";
    const company = currentPos?.companyName ?? "";

    // profilePicture is an object with url and sizes
    const avatarUrl =
      profile.profilePicture?.sizes?.[1]?.url ??
      profile.profilePicture?.url ??
      undefined;

    return NextResponse.json({
      firstName,
      lastName,
      title,
      company,
      linkedinUrl: profile.linkedinUrl ?? cleanUrl,
      ...(avatarUrl ? { avatarUrl } : {}),
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "TimeoutError") {
      return NextResponse.json(
        { error: "LinkedIn scraping timed out (60 s limit)" },
        { status: 504 }
      );
    }
    console.error("LinkedIn capture error:", error);
    return NextResponse.json(
      { error: "Internal server error during LinkedIn capture" },
      { status: 500 }
    );
  }
}
