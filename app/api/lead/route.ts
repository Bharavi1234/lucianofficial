import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const headers = request.headers;
    const body = await request.json();
    const {
      name,
      company,
      email,
      phone,
      goal,
      service,
      type = "Chatbot Qualified Lead",
      details = "",
      location = "",
    } = body;

    if (!email && !name && !phone) {
      return NextResponse.json(
        { error: "Name, email, or phone is required" },
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
          _subject: `⚡ [LUCIAN AI Lead] ${name || "Client"} - ${service || "Digital Solutions"} [Goal: ${goal || "Growth"}]`,
          _template: "table",
          _captcha: "false",
          "Lead Type": type,
          "Full Name": name || "Not provided",
          "Company / Brand": company || "Not provided",
          "Email Address": email || "Not provided",
          "Phone / WhatsApp": phone || "Not provided",
          "Target Goal": goal || "Not provided",
          "Interested Service": service || "General Agency Services",
          "Additional Details": details || "Captured via LUCIAN AI Sales Assistant",
          "Client Location": clientLocation,
          "IP Address": clientIp,
          "Submitted At": new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" }),
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
            company,
            email,
            phone,
            goal,
            service,
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
    console.log("=== NEW LUCIAN QUALIFIED LEAD ===");
    console.log(`Client: ${name} (${company || "No Company"})`);
    console.log(`Contact: ${email} | ${phone}`);
    console.log(`Service: ${service} | Goal: ${goal}`);
    console.log(`Location: ${clientLocation} | IP: ${clientIp}`);
    console.log("=================================");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
