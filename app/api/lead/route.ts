import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const headers = request.headers;
    const body = await request.json();
    const {
      name,
      email,
      eventDate,
      type = "Chatbot Lead",
      details = "",
      location = "",
    } = body;

    if (!email && !name) {
      return NextResponse.json(
        { error: "Name or email is required" },
        { status: 400 }
      );
    }

    const forwardedFor = headers.get("x-forwarded-for") || "";
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "Unknown IP";
    const serverCountry = headers.get("x-vercel-ip-country") || "";
    const serverCity = headers.get("x-vercel-ip-city") || "";
    const clientLocation = location || `${serverCity ? `${decodeURIComponent(serverCity)}, ` : ""}${serverCountry || "Online"}`;

    // 1. Direct delivery to Gmail via FormSubmit.co
    try {
      await fetch("https://formsubmit.co/ajax/lucianofficial07052026@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `⚡ [Chatbot] New Lead / Booking: ${name || email} (${type})`,
          _template: "table",
          _captcha: "false",
          "Lead Type": type,
          "Name": name || "Not provided",
          "Email": email || "Not provided",
          "Event / Collab Date": eventDate || "N/A",
          "Details": details || "Captured via LUCIAN Chatbot Assistant",
          "Location": clientLocation,
          "IP": clientIp,
          "Timestamp": new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" }),
        }),
      });
    } catch (fsErr) {
      console.error("FormSubmit lead notice:", fsErr);
    }

    // 2. Also forward to Formspree if configured
    const formspreeId = process.env.FORMSPREE_ID || process.env.NEXT_PUBLIC_FORMSPREE_ID || "mqpklvrn";
    if (formspreeId) {
      try {
        await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            leadType: type,
            name,
            email,
            eventDate,
            details,
            location: clientLocation,
            submittedAt: new Date().toISOString(),
          }),
        });
      } catch (fErr) {
        console.error("Formspree lead notice:", fErr);
      }
    }

    // Log to Vercel runtime logs for immediate visibility
    console.log("=== NEW LUCIAN CHATBOT LEAD ===");
    console.log(`Type: ${type} | Name: ${name} | Email: ${email}`);
    console.log(`Date/Scope: ${eventDate} | Location: ${clientLocation}`);
    console.log("===============================");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
