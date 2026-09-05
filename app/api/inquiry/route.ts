import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { serviceName, fullName, email, phone, projectBrief, budgetRange, howFound } = body;

    if (!fullName || !email || !projectBrief) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

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
          fullName,
          email,
          phone,
          projectBrief,
          budgetRange,
          howFound,
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
          subject: `New LUCIAN Inquiry: ${serviceName} from ${fullName}`,
          from_name: "LUCIAN Website",
          to_email: "lucianofficial636@gmail.com",
          service: serviceName,
          name: fullName,
          email: email,
          phone: phone,
          brief: projectBrief,
          budget: budgetRange,
          source: howFound,
        }),
      });
    }

    // Always log on server side for visibility in Vercel logs
    console.log("=== NEW LUCIAN INQUIRY RECEIVED ===");
    console.log(`Service: ${serviceName}`);
    console.log(`Client: ${fullName} (${email}, ${phone})`);
    console.log(`Budget: ${budgetRange} | Source: ${howFound}`);
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
