import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const headers = request.headers;
    const body = await request.json();
    const {
      serviceName,
      packageName,
      packagePrice,
      currency,
      fullName,
      email,
      phone,
      projectBrief,
      budgetRange,
      howFound,
      clientCountry,
      clientCity,
      clientRegion,
      clientTimezone,
      clientIp,
    } = body;

    if (!fullName || !email || !projectBrief) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    // Extract server-side geolocation headers for 100% accurate fallback/enrichment
    const serverCountry = headers.get("x-vercel-ip-country") || "";
    const serverCity = headers.get("x-vercel-ip-city") || "";
    const serverRegion = headers.get("x-vercel-ip-country-region") || "";
    const forwardedFor = headers.get("x-forwarded-for") || "";
    const serverIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "";

    const finalCountry = clientCountry || serverCountry || "Unknown Location";
    const finalCity = clientCity || (serverCity ? decodeURIComponent(serverCity) : "");
    const finalRegion = clientRegion || (serverRegion ? decodeURIComponent(serverRegion) : "");
    const finalIp = clientIp || serverIp || "Unknown IP";

    const locationSummary = `${finalCity ? `${finalCity}, ` : ""}${finalRegion ? `${finalRegion}, ` : ""}${finalCountry}`;

    // 1. Forward directly to Formspree endpoint (mqpklvrn)
    const formspreeId = process.env.FORMSPREE_ID || process.env.NEXT_PUBLIC_FORMSPREE_ID || "mqpklvrn";
    if (formspreeId) {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          serviceName,
          packageName: packageName ? `${packageName} (${packagePrice || ""})` : "General Inquiry",
          currency: currency || "USD",
          fullName,
          email,
          phone,
          projectBrief,
          budgetRange,
          howFound,
          client_location: locationSummary,
          client_country: finalCountry,
          client_city: finalCity,
          client_timezone: clientTimezone || "Unknown Timezone",
          client_ip: finalIp,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        console.error("Formspree forward failed with status:", response.status);
      }
    }

    // 2. Also forward to Web3Forms free public endpoint if configured
    const web3Key = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (web3Key) {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3Key,
          subject: `New LUCIAN Inquiry: ${serviceName} from ${fullName} [${finalCountry}]`,
          from_name: "LUCIAN Website",
          to_email: "lucianofficial07052026@gmail.com",
          service: serviceName,
          package: packageName ? `${packageName} (${packagePrice || ""})` : "N/A",
          currency: currency || "USD",
          name: fullName,
          email: email,
          phone: phone,
          location: locationSummary,
          ip_address: finalIp,
          timezone: clientTimezone,
          brief: projectBrief,
          budget: budgetRange,
          source: howFound,
        }),
      });
    }

    // Always log on server side for full visibility in Vercel logs
    console.log("=== NEW LUCIAN INQUIRY RECEIVED ===");
    console.log(`Service: ${serviceName} | Package: ${packageName} (${packagePrice})`);
    console.log(`Client: ${fullName} (${email}, ${phone})`);
    console.log(`Location: ${locationSummary} | IP: ${finalIp} | TZ: ${clientTimezone}`);
    console.log(`Currency: ${currency} | Budget: ${budgetRange} | Source: ${howFound}`);
    console.log(`Brief: ${projectBrief}`);
    console.log("===================================");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Inquiry API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
