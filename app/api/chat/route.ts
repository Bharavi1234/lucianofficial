import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are LUCIAN Bot, the friendly and professional AI assistant for LUCIAN – a premium 360° digital solutions agency.
Brand Tagline: BUILD | INNOVATE | ELEVATE
Brand Message: WE BUILD BRANDS. WE CREATE IMPACT. WE ELEVATE GROWTH.
Brand Closing: ONE BRAND. ENDLESS POSSIBILITIES.
Official Contact: lucianofficial636@gmail.com | WhatsApp: +977 9818587406

LUCIAN offers 5 core solutions:
1. Social Media Management – Strategy, content, scheduling & growth that builds strong online presence.
2. Graphic Design & Poster Making – Eye-catching designs that communicate your brand and leave a lasting impact.
3. Website Design & Development – Modern, responsive and user-friendly websites that drive results.
4. Digital Marketing & Advertising – Ads, campaigns & marketing strategies that convert and maximize ROI.
5. Other Digital Solutions – From SEO to branding, video editing to automation – we do it all for your growth.

Key Instructions:
- Be concise, professional, helpful, and enthusiastic.
- If asked about pricing: Explain that pricing is customized based on project scope, and encourage them to click "Get Started" on any service or message on WhatsApp at +977 9818587406 for a custom quote within 24 hours.
- If asked to connect with a real person: Provide email (lucianofficial636@gmail.com) and WhatsApp (+977 9818587406).
- Offer clear next steps to start an inquiry.`;

// Pre-defined knowledge base for instant answers
const PRESET_ANSWERS: Record<string, string> = {
  "services": `LUCIAN offers 5 core digital solutions:
1. Social Media Management – Strategy, content, scheduling & growth
2. Graphic Design & Poster Making – Eye-catching brand designs & marketing collateral
3. Website Design & Development – Modern, high-converting, responsive websites
4. Digital Marketing & Advertising – Paid ad campaigns & ROI-driven marketing
5. Other Digital Solutions – SEO, branding, video editing & automation`,

  "pricing": `Great question! Our pricing is customized to each client's specific scope and growth goals.
The best way to get an accurate quote is to start an inquiry! Click "Get Started" on any service card, fill out our quick 3-step form, and our team will get back to you with a tailored quote within 24 hours. You can also chat directly on WhatsApp at +977 9818587406.`,

  "get started": `Getting started with LUCIAN is easy and takes less than 2 minutes:
1. Browse our solutions on the website
2. Click "Get Started" on the service you need
3. Fill out our quick 3-step project form
4. Our strategy team will review your brief and reach out within 24 hours!
Or message us on WhatsApp at +977 9818587406 for instant priority onboarding.`,

  "social media": `Yes! Social Media Management is one of our flagship services. We handle end-to-end content strategy, high-performing post design, scheduling, community management, and growth analytics across Instagram, Facebook, TikTok, YouTube, and LinkedIn.`,

  "website": `Absolutely! Our Website Design & Development service builds fast, mobile-first, SEO-optimized websites that turn visitors into paying clients. We build clean, modern UI/UX customized for your brand.`,

  "real person": `We'd love to connect with you directly!
• Email: lucianofficial636@gmail.com
• WhatsApp: +977 9818587406 (Click to chat: https://wa.me/9779818587406)
• Instagram: @_lucianofficial
A real member of the LUCIAN leadership team will get back to you within 24 hours!`,
};

function matchPresetQuery(query: string): string | null {
  const q = query.toLowerCase().trim();
  if (q.includes("what service") || q.includes("services do you offer") || q.includes("all services")) {
    return PRESET_ANSWERS["services"];
  }
  if (q.includes("how much") || q.includes("cost") || q.includes("pricing") || q.includes("charge") || q.includes("rate")) {
    return PRESET_ANSWERS["pricing"];
  }
  if (q.includes("how do i get started") || q.includes("get started") || q.includes("how to start") || q.includes("process")) {
    return PRESET_ANSWERS["get started"];
  }
  if (q.includes("social media") || q.includes("instagram") || q.includes("facebook") || q.includes("tiktok")) {
    return PRESET_ANSWERS["social media"];
  }
  if (q.includes("website") || q.includes("web design") || q.includes("web dev") || q.includes("build a website")) {
    return PRESET_ANSWERS["website"];
  }
  if (q.includes("real person") || q.includes("human") || q.includes("call") || q.includes("speak with") || q.includes("contact person")) {
    return PRESET_ANSWERS["real person"];
  }
  return null;
}

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // 1. Check instant preset match
    const preset = matchPresetQuery(message);
    if (preset) {
      return NextResponse.json({ reply: preset, source: "knowledge-base" });
    }

    // 2. Try Puter free public AI endpoint if reachable
    try {
      const puterRes = await fetch("https://api.puter.com/drivers/call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          interface: "puter-chat-completion",
          driver: "gemini-2.5-flash",
          method: "chat",
          args: {
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...(Array.isArray(history) ? history.slice(-6) : []),
              { role: "user", content: message },
            ],
          },
        }),
      });

      if (puterRes.ok) {
        const data = await puterRes.json();
        const reply =
          data?.result?.message?.content ||
          data?.result?.content ||
          data?.message?.content ||
          (typeof data?.result === "string" ? data.result : null);

        if (reply && typeof reply === "string") {
          return NextResponse.json({ reply, source: "puter-ai" });
        }
      }
    } catch {
      // Fallback below
    }

    // 3. Fallback intelligent response
    const fallbackResponse = `Thank you for reaching out! At LUCIAN, we specialize in Social Media Management, Graphic Design, Website Development, Digital Marketing, and custom Digital Solutions.

To get personalized guidance or a tailored project quote, feel free to:
1. Start a service inquiry on our website
2. Chat with us directly on WhatsApp at +977 9818587406
3. Email our team at lucianofficial636@gmail.com

How else can I assist your brand today?`;

    return NextResponse.json({ reply: fallbackResponse, source: "fallback" });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply: "I'm having a slight connection hiccup, but our team is standing by! Feel free to WhatsApp us directly at +977 9818587406 or email lucianofficial636@gmail.com.",
      },
      { status: 200 }
    );
  }
}
