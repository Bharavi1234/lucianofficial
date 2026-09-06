"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Phone,
  Mail,
  Bot,
  User,
  Minus,
  Copy,
  Check,
  ExternalLink,
  Instagram,
  Facebook,
  Video,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Layers,
  Globe,
  TrendingUp,
} from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  type?: "text" | "social_hub" | "service_card" | "qualification_success" | "services_overview";
  serviceData?: {
    title: string;
    description: string;
    pricing: string;
    slug?: string;
  };
  leadData?: {
    name: string;
    company?: string;
    email: string;
    phone: string;
    goal: string;
    service?: string;
  };
}

interface SessionContext {
  userName?: string;
  companyName?: string;
  userEmail?: string;
  userPhone?: string;
  userGoal?: string;
  lastServiceAsked?: string;
  qualStep: "idle" | "awaiting_name" | "awaiting_company" | "awaiting_email" | "awaiting_phone" | "awaiting_goal";
}

// Brand Exact Content
const ABOUT_LUCIAN = `We build brands. We create impact. We elevate growth. LUCIAN is a 360° digital solutions agency dedicated to helping brands establish a powerful online presence. We believe that every brand has a unique story to tell, and our mission is to amplify that story through strategic digital services. Founded with a passion for innovation and creativity, LUCIAN brings together expertise in social media management, graphic design, web development, and digital marketing. We don't just deliver services — we deliver results that help our clients grow, engage their audiences, and achieve their business goals. Our approach is simple: we listen, we strategize, and we execute.`;

const MISSION_LUCIAN = `To empower businesses with cutting-edge digital solutions that drive measurable growth. We combine creativity with strategy to deliver exceptional results for our clients.`;

const VALUES_LUCIAN = `Our Core Values:\n• Innovation: We stay ahead of digital trends.\n• Excellence: We never settle for average.\n• Integrity: We build lasting partnerships through honest communication.\n• Growth: We measure our success by the growth we drive for our clients.`;

// Exact Services & Pricing Data
const SERVICES_DATA = {
  smm: {
    title: "Social Media Management",
    description: "Strategy, content, scheduling & growth that builds strong online presence.",
    pricing: "Starting at ₹4,550 ($35)",
    slug: "social-media-management",
  },
  design: {
    title: "Graphic Design & Poster Making",
    description: "Eye-catching designs that communicate your brand and leave a lasting impact.",
    pricing: "Starting at ₹3,250 ($25)",
    slug: "graphic-design-poster-making",
  },
  web: {
    title: "Website Design & Development",
    description: "Modern, responsive and user-friendly websites that drive results.",
    pricing: "Starting at ₹26,000 ($200)",
    slug: "website-design-development",
  },
  marketing: {
    title: "Digital Marketing & Advertising",
    description: "Ads, campaigns & marketing strategies that convert and maximize ROI.",
    pricing: "Starting at ₹26,000/month ($200/mo)",
    slug: "digital-marketing-advertising",
  },
  other: {
    title: "Other Digital Solutions",
    description: "From SEO to branding, video editing to automation – we do it all for your growth.",
    pricing: "Starting at ₹6,500/hour ($50/hr)",
    slug: "other-digital-solutions",
  },
};

// Exact 5 Quick Reply Buttons
const QUICK_REPLY_BUTTONS = [
  { label: "📊 Social Media Management", key: "smm" },
  { label: "🎨 Graphic Design", key: "design" },
  { label: "🌐 Web Development", key: "web" },
  { label: "📈 Digital Marketing", key: "marketing" },
  { label: "📞 Contact / Get a Quote", key: "contact" },
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello! Welcome to LUCIAN – your 360° digital solutions agency. I'm LUCIAN AI, your virtual growth consultant. We build brands, create impact, and elevate business growth.\n\nHow can we help scale your business today?",
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Session Context Memory
  const [context, setContext] = useState<SessionContext>({
    userName: undefined,
    companyName: undefined,
    userEmail: undefined,
    userPhone: undefined,
    userGoal: undefined,
    lastServiceAsked: undefined,
    qualStep: "idle",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load context from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem("lucian_chat_memory");
        if (saved) {
          setContext(JSON.parse(saved));
        }
      } catch (e) {
        console.warn("Context load error:", e);
      }
    }
  }, []);

  const updateContext = (newContext: Partial<SessionContext>) => {
    setContext((prev) => {
      const updated = { ...prev, ...newContext };
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem("lucian_chat_memory", JSON.stringify(updated));
        } catch (e) {
          console.warn("Context save error:", e);
        }
      }
      return updated;
    });
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("lucianofficial07052026@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Name extraction helper
  const extractName = (text: string): string | null => {
    const patterns = [
      /(?:my name is|i am|i'm|im|call me|this is)\s+([a-zA-Z]{2,25})/i,
      /^([a-zA-Z]{2,20})$/i,
    ];
    for (const p of patterns) {
      const match = text.trim().match(p);
      if (match && match[1]) {
        const forbidden = [
          "hello", "hey", "hi", "yes", "no", "sure", "book", "quote", "hire", "service",
          "services", "smm", "web", "design", "marketing", "contact", "about", "price", "pricing"
        ];
        if (!forbidden.includes(match[1].toLowerCase())) {
          return match[1].charAt(0).toUpperCase() + match[1].slice(1);
        }
      }
    }
    return null;
  };

  // Helper to extract email
  const extractEmail = (text: string): string | null => {
    const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    return match ? match[0] : null;
  };

  // Forward Lead to backend API & FormSubmit
  const sendLeadToBackend = async (lead: {
    name: string;
    company?: string;
    email: string;
    phone: string;
    goal: string;
    service?: string;
  }) => {
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lead,
          type: "Chatbot 5-Step Qualified Lead",
        }),
      }).catch((e) => console.log("Lead API notice:", e));
    } catch (err) {
      console.error("Lead submission error:", err);
    }
  };

  // Main Consultation / Sales Engine
  const processUserInput = (rawInput: string) => {
    const text = rawInput.trim();
    const lower = text.toLowerCase();

    // 1. Session Name Extraction
    const detectedName = extractName(text);
    if (detectedName && !context.userName && context.qualStep === "idle") {
      updateContext({ userName: detectedName });
    }

    // 2. QUALIFICATION FLOW STATE MACHINE
    if (context.qualStep === "awaiting_name") {
      const name = detectedName || text;
      updateContext({ userName: name, qualStep: "awaiting_company" });
      return {
        text: `Great to meet you, ${name}! What is your Business or Company Name? (or type 'Skip' if personal project)`,
        type: "text" as const,
      };
    }

    if (context.qualStep === "awaiting_company") {
      const company = lower === "skip" || lower === "none" ? "Independent / Personal" : text;
      updateContext({ companyName: company, qualStep: "awaiting_email" });
      return {
        text: `Got it. What is your Email Address so we can send you a detailed project roadmap & proposal?`,
        type: "text" as const,
      };
    }

    if (context.qualStep === "awaiting_email") {
      const email = extractEmail(text) || text;
      const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
      if (!isValid) {
        return {
          text: `Please enter a valid email address (e.g. founder@company.com) so we can send your confirmation:`,
          type: "text" as const,
        };
      }

      updateContext({ userEmail: email, qualStep: "awaiting_phone" });
      return {
        text: `Thank you! What is your Phone Number or WhatsApp (with country code)?`,
        type: "text" as const,
      };
    }

    if (context.qualStep === "awaiting_phone") {
      const phone = text;
      updateContext({ userPhone: phone, qualStep: "awaiting_goal" });
      return {
        text: `What specific goal are you trying to achieve for your brand? (e.g., more followers, a new high-converting website, scaling ad ROI, complete rebranding)`,
        type: "text" as const,
      };
    }

    if (context.qualStep === "awaiting_goal") {
      const goal = text;
      const finalName = context.userName || "Client";
      const finalCompany = context.companyName || "N/A";
      const finalEmail = context.userEmail || "Not provided";
      const finalPhone = context.userPhone || "Not provided";
      const finalService = context.lastServiceAsked || "360° Digital Growth";

      updateContext({ userGoal: goal, qualStep: "idle" });

      const leadData = {
        name: finalName,
        company: finalCompany,
        email: finalEmail,
        phone: finalPhone,
        goal,
        service: finalService,
      };

      // Transmit to API
      sendLeadToBackend(leadData);

      return {
        text: `Thank you, ${finalName}! Our team will reach out within 2 hours to discuss your ${goal}. Check your email for a confirmation.`,
        type: "qualification_success" as const,
        leadData,
      };
    }

    // 3. Trigger Qualification Flow
    if (
      lower.includes("get started") ||
      lower.includes("consultation") ||
      lower.includes("hire") ||
      lower.includes("quote") ||
      lower.includes("book") ||
      lower.includes("start project")
    ) {
      if (context.userName) {
        updateContext({ qualStep: "awaiting_company" });
        return {
          text: `Let's get your project moving, ${context.userName}! What is your Business or Company Name? (or type 'Skip')`,
          type: "text" as const,
        };
      } else {
        updateContext({ qualStep: "awaiting_name" });
        return {
          text: `Let's set up your custom growth strategy! To get started, what is your Full Name?`,
          type: "text" as const,
        };
      }
    }

    // 4. ABOUT LUCIAN / WHO ARE YOU / WHAT DO YOU DO
    if (
      lower.includes("about") ||
      lower.includes("who are you") ||
      lower.includes("what do you do") ||
      lower.includes("tell me about yourself") ||
      lower.includes("what is lucian")
    ) {
      return {
        text: `${ABOUT_LUCIAN}\n\n**Our Mission:**\n${MISSION_LUCIAN}\n\n${VALUES_LUCIAN}`,
        type: "text" as const,
      };
    }

    // 5. MISSION & VALUES SPECIFIC
    if (lower.includes("mission")) {
      return { text: MISSION_LUCIAN, type: "text" as const };
    }
    if (lower.includes("values") || lower.includes("core values")) {
      return { text: VALUES_LUCIAN, type: "text" as const };
    }

    // 6. SPECIFIC SERVICE INQUIRIES & CONTEXT MEMORY
    // Social Media Management
    if (
      lower.includes("social media") ||
      lower.includes("smm") ||
      lower.includes("instagram management") ||
      lower.includes("facebook management") ||
      lower.includes("tiktok management") ||
      lower.includes("posters") && lower.includes("social")
    ) {
      updateContext({ lastServiceAsked: "Social Media Management" });
      const s = SERVICES_DATA.smm;
      return {
        text: `**${s.title}**\n• **Description:** ${s.description}\n• **Pricing:** ${s.pricing}\n• **Platforms:** Instagram, Facebook, TikTok, YouTube, LinkedIn & More.\n\nWould you like me to connect you with our team via WhatsApp or Email to get started on this?`,
        type: "service_card" as const,
        serviceData: s,
      };
    }

    // Graphic Design
    if (
      lower.includes("graphic design") ||
      lower.includes("poster") ||
      lower.includes("logo") ||
      lower.includes("graphics") ||
      lower.includes("branding design") ||
      lower.includes("flyer")
    ) {
      updateContext({ lastServiceAsked: "Graphic Design & Poster Making" });
      const s = SERVICES_DATA.design;
      return {
        text: `**${s.title}**\n• **Description:** ${s.description}\n• **Pricing:** ${s.pricing}\n• **Deliverables:** High-impact social posts, event posters, banners, brand guidelines.\n\nWould you like me to connect you with our team via WhatsApp or Email to get started on this?`,
        type: "service_card" as const,
        serviceData: s,
      };
    }

    // Website Design & Development / "I want a website"
    if (
      lower.includes("web") ||
      lower.includes("website") ||
      lower.includes("i want a website") ||
      lower.includes("build a site") ||
      lower.includes("web development") ||
      lower.includes("landing page")
    ) {
      updateContext({ lastServiceAsked: "Website Design & Development" });
      const s = SERVICES_DATA.web;
      return {
        text: `**${s.title}**\n• **Description:** ${s.description}\n• **Pricing:** ${s.pricing}\n• **Features:** Next.js / React performance, mobile-first responsive design, high conversion UX, SEO foundation.\n\nWould you like me to connect you with our team via WhatsApp or Email to get started on this?`,
        type: "service_card" as const,
        serviceData: s,
      };
    }

    // Digital Marketing & Advertising
    if (
      lower.includes("digital marketing") ||
      lower.includes("advertising") ||
      lower.includes("ads") ||
      lower.includes("meta ads") ||
      lower.includes("google ads") ||
      lower.includes("campaigns") ||
      lower.includes("marketing")
    ) {
      updateContext({ lastServiceAsked: "Digital Marketing & Advertising" });
      const s = SERVICES_DATA.marketing;
      return {
        text: `**${s.title}**\n• **Description:** ${s.description}\n• **Pricing:** ${s.pricing}\n• **Platforms:** Meta Ads, Google Ads, TikTok Ads with ROI optimization & weekly analytics.\n\nWould you like me to connect you with our team via WhatsApp or Email to get started on this?`,
        type: "service_card" as const,
        serviceData: s,
      };
    }

    // Other Digital Solutions
    if (
      lower.includes("other") ||
      lower.includes("seo") ||
      lower.includes("automation") ||
      lower.includes("video editing")
    ) {
      updateContext({ lastServiceAsked: "Other Digital Solutions" });
      const s = SERVICES_DATA.other;
      return {
        text: `**${s.title}**\n• **Description:** ${s.description}\n• **Pricing:** ${s.pricing}\n• **Scope:** Search Engine Optimization, automated lead workflows, short-form editing.\n\nWould you like me to connect you with our team via WhatsApp or Email to get started on this?`,
        type: "service_card" as const,
        serviceData: s,
      };
    }

    // Context Memory: "How much?" when a service was previously discussed
    if (
      (lower === "how much" || lower === "how much?" || lower.includes("how much is it") || lower.includes("cost?")) &&
      context.lastServiceAsked
    ) {
      const nameTag = context.userName ? `, ${context.userName}` : "";
      if (context.lastServiceAsked === "Website Design & Development") {
        return {
          text: `For our Website Design & Development package (starting at ₹26,000), we tailor the final price based on your specific feature requirements${nameTag}. Shall I prepare a custom quote for you?`,
          type: "text" as const,
        };
      }
      return {
        text: `For ${context.lastServiceAsked}, packages start at our listed baseline${nameTag}, with tiered options to match your exact business scope. Shall I prepare a custom proposal for you?`,
        type: "text" as const,
      };
    }

    // All Services & Pricing Overview
    if (
      lower.includes("services") ||
      lower.includes("packages") ||
      lower.includes("pricing") ||
      lower.includes("rates") ||
      lower.includes("price")
    ) {
      return {
        text: `Here is LUCIAN's complete 360° Digital Solutions Suite:\n\n1. **Social Media Management:** Starting at ₹4,550\n2. **Graphic Design & Poster Making:** Starting at ₹3,250\n3. **Website Design & Development:** Starting at ₹26,000\n4. **Digital Marketing & Advertising:** Starting at ₹26,000/month\n5. **Other Digital Solutions (SEO, Automation, Video):** Starting at ₹6,500/hour\n\n*Platforms we work on: Instagram, Facebook, TikTok, YouTube, LinkedIn & More.*\n\nSelect any service below or tap 'Get Started' for a tailored quote!`,
        type: "services_overview" as const,
      };
    }

    // 7. CONTACT & SOCIAL HUB (Exact Channels)
    if (
      lower.includes("contact") ||
      lower.includes("reach out") ||
      lower.includes("how to find you") ||
      lower.includes("where are you on social media") ||
      lower.includes("social media") && (lower.includes("find") || lower.includes("link") || lower.includes("page")) ||
      lower.includes("socials") ||
      lower.includes("phone") ||
      lower.includes("email") ||
      lower.includes("whatsapp") ||
      lower === "📞 contact / get a quote"
    ) {
      return {
        text: "Here are all of LUCIAN's official direct channels and social links:",
        type: "social_hub" as const,
      };
    }

    // 8. Greetings
    if (
      lower.includes("hi") ||
      lower.includes("hello") ||
      lower.includes("hey") ||
      lower.includes("namaste") ||
      lower.includes("good morning") ||
      lower.includes("good evening")
    ) {
      const nameTag = context.userName ? `, ${context.userName}` : "";
      return {
        text: `Hello${nameTag}! Welcome to LUCIAN. 🚀\n\nWe build brands, create impact, and elevate growth. Are you looking to scale your social media, get custom graphic designs, build a high-performance website, or run profitable digital ad campaigns?`,
        type: "text" as const,
      };
    }

    // Fallback: consultative sales guidance
    const nameTag = context.userName ? `, ${context.userName}` : "";
    return {
      text: `Thanks for connecting${nameTag}! LUCIAN is a premier 360° digital solutions agency specializing in Social Media Management, Graphic Design, Web Development, and Digital Marketing.\n\nWould you like to explore our service packages or discuss a tailored growth strategy for your brand?`,
      type: "text" as const,
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const userText = (textToSend || input).trim();
    if (!userText || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    // 350ms snappy response
    setTimeout(() => {
      const response = processUserInput(userText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: response.type,
        serviceData: response.serviceData,
        leadData: response.leadData,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 350);
  };

  const handleQuickAction = (key: string) => {
    if (key === "smm") handleSendMessage("Social Media Management");
    else if (key === "design") handleSendMessage("Graphic Design");
    else if (key === "web") handleSendMessage("Website Design & Development");
    else if (key === "marketing") handleSendMessage("Digital Marketing & Advertising");
    else if (key === "contact") handleSendMessage("📞 Contact / Get a Quote");
  };

  return (
    <>
      {/* Floating Gold Toggle Button */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-gold text-background flex items-center justify-center shadow-[0_0_25px_rgba(245,176,65,0.45)] hover:bg-[#FFBE53] hover:scale-105 active:scale-95 transition-all duration-200"
            aria-label="Open LUCIAN Sales Assistant"
          >
            <MessageSquare className="w-6 h-6 text-background" />
          </button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-[9999] w-[calc(100vw-2rem)] sm:w-[395px] h-[540px] max-h-[88vh] rounded-2xl bg-[#151515] border-2 border-gold shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-[#0A0A0A] border-b border-gold/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/40 flex items-center justify-center text-gold shadow-[0_0_10px_rgba(245,176,65,0.2)]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black tracking-wide text-gold uppercase flex items-center gap-1.5">
                  <span>LUCIAN AI</span>
                  {context.userName && (
                    <span className="text-[10px] font-mono text-mutedText lowercase">({context.userName})</span>
                  )}
                </h3>
                <p className="text-[11px] text-mutedText font-mono">
                  360° Digital Solutions Agency
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded text-mutedText hover:text-primaryText transition-colors"
                aria-label="Minimize"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded text-mutedText hover:text-gold transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 max-h-[330px] scrollbar-thin scrollbar-thumb-white/10">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2 ${
                  msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 text-[11px] ${
                    msg.sender === "user"
                      ? "bg-white text-black font-bold"
                      : "bg-[#0A0A0A] border border-gold/30 text-gold"
                  }`}
                >
                  {msg.sender === "user" ? <User className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                </div>

                <div
                  className={`max-w-[85%] rounded-xl p-3 text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap ${
                    msg.sender === "user"
                      ? "bg-white text-black font-medium rounded-tr-none"
                      : "bg-[#0A0A0A] border border-white/10 text-primaryText rounded-tl-none"
                  }`}
                >
                  {msg.text}

                  {/* Service Card CTA */}
                  {msg.type === "service_card" && msg.serviceData && (
                    <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSendMessage("Get Started")}
                          className="flex-1 py-2 px-3 rounded-lg bg-gold text-background font-bold text-xs hover:bg-[#FFBE53] transition-colors flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(245,176,65,0.25)]"
                        >
                          <Briefcase className="w-3.5 h-3.5" />
                          <span>Get Started</span>
                        </button>
                        <a
                          href={`https://wa.me/9779818587406?text=${encodeURIComponent(
                            `*INQUIRY REGARDING ${msg.serviceData.title.toUpperCase()}*\nHi LUCIAN, I would like to get started on ${msg.serviceData.title} (${msg.serviceData.pricing}).`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-3 rounded-lg bg-surface border border-gold/40 text-gold font-semibold text-xs hover:bg-gold/10 transition-colors flex items-center gap-1"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Feature 6: Rich Contact & Social Hub */}
                  {msg.type === "social_hub" && (
                    <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                      {/* WhatsApp Direct */}
                      <a
                        href="https://wa.me/9779818587406"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 rounded-lg bg-surface border border-gold/30 hover:border-gold text-gold text-xs transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-gold" />
                          <span className="font-semibold">WhatsApp Direct: 977 9818587406</span>
                        </div>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>

                      {/* Official Email with Open Gmail Button */}
                      <div className="p-2 rounded-lg bg-surface border border-white/10 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs text-primaryText">
                            <Mail className="w-3.5 h-3.5 text-gold" />
                            <span className="font-mono text-[11px] truncate">lucianofficial07052026@gmail.com</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=lucianofficial07052026@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-gold/15 text-gold text-[10px] font-mono font-bold hover:bg-gold hover:text-black transition-colors"
                          >
                            <ExternalLink className="w-2.5 h-2.5" />
                            <span>Open Gmail</span>
                          </a>
                          <button
                            type="button"
                            onClick={handleCopyEmail}
                            className="px-2 py-1 rounded bg-white/5 text-mutedText hover:text-white text-[10px] font-mono transition-colors"
                          >
                            {copiedEmail ? "Copied!" : "Copy"}
                          </button>
                        </div>
                      </div>

                      {/* TikTok Official */}
                      <a
                        href="https://www.tiktok.com/@.lucianofficial"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 rounded-lg bg-surface border border-white/10 hover:border-gold/50 text-xs text-primaryText transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Video className="w-3.5 h-3.5 text-gold" />
                          <span>TikTok Official: <strong className="text-gold">@.lucianofficial</strong></span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-mutedText" />
                      </a>

                      {/* Instagram DM */}
                      <a
                        href="https://www.instagram.com/_lucianofficial/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 rounded-lg bg-surface border border-white/10 hover:border-gold/50 text-xs text-primaryText transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Instagram className="w-3.5 h-3.5 text-gold" />
                          <span>Instagram DM: <strong className="text-gold">@_lucianofficial</strong></span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-mutedText" />
                      </a>

                      {/* Facebook Page */}
                      <a
                        href="https://www.facebook.com/profile.php?id=61593873428903"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 rounded-lg bg-surface border border-white/10 hover:border-gold/50 text-xs text-primaryText transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Facebook className="w-3.5 h-3.5 text-gold" />
                          <span>Facebook Page: <strong className="text-gold">LUCIAN Official</strong></span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-mutedText" />
                      </a>

                      {/* Required Tagline */}
                      <p className="text-[11px] text-mutedText italic text-center pt-1">
                        Let&apos;s build something amazing together. Reach out directly through any of our official channels.
                      </p>
                    </div>
                  )}

                  {/* Feature 5: Qualification Success Confirmation Card */}
                  {msg.type === "qualification_success" && msg.leadData && (
                    <div className="mt-3 p-3 rounded-lg bg-surface border border-gold/50 space-y-2 text-left">
                      <div className="flex items-center gap-1.5 text-gold text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Lead Sheet Forwarded (2h Response)</span>
                      </div>
                      <div className="text-[11px] text-mutedText font-mono space-y-0.5">
                        <div>Client: <strong className="text-white">{msg.leadData.name}</strong></div>
                        {msg.leadData.company && <div>Company: <strong className="text-white">{msg.leadData.company}</strong></div>}
                        <div>Email: <strong className="text-white">{msg.leadData.email}</strong></div>
                        <div>Phone: <strong className="text-white">{msg.leadData.phone}</strong></div>
                        <div>Target Goal: <strong className="text-white">{msg.leadData.goal}</strong></div>
                      </div>
                      <a
                        href={`https://wa.me/9779818587406?text=${encodeURIComponent(
                          `*LUCIAN PROJECT QUALIFICATION*\nName: ${msg.leadData.name}\nCompany: ${msg.leadData.company || "N/A"}\nEmail: ${msg.leadData.email}\nPhone: ${msg.leadData.phone}\nGoal: ${msg.leadData.goal}\nHi LUCIAN, I just submitted my consultation request!`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-3 rounded bg-gold text-background font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#FFBE53] transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Instant WhatsApp Follow-up</span>
                      </a>
                    </div>
                  )}

                  {/* Services Overview Quick Actions */}
                  {msg.type === "services_overview" && (
                    <div className="mt-3 pt-2 border-t border-white/10 space-y-1.5">
                      <button
                        onClick={() => handleSendMessage("Get Started")}
                        className="w-full text-center py-2 rounded bg-gold text-background font-bold text-xs hover:bg-[#FFBE53] transition-colors"
                      >
                        Schedule Free Strategy Call
                      </button>
                    </div>
                  )}

                  <div
                    className={`text-[9px] mt-1 font-mono ${
                      msg.sender === "user" ? "text-black/60 text-right" : "text-[#666]"
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-mutedText">
                <div className="w-6 h-6 rounded-md bg-[#0A0A0A] border border-gold/30 flex items-center justify-center text-gold">
                  <Bot className="w-3 h-3" />
                </div>
                <div className="p-2.5 rounded-xl bg-[#0A0A0A] border border-white/10 rounded-tl-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Feature 4: Exact 5 Interactive Quick Reply Buttons */}
          <div className="p-2 border-t border-gold/30 bg-[#0A0A0A] overflow-x-auto scrollbar-none flex items-center gap-1.5 flex-nowrap">
            {QUICK_REPLY_BUTTONS.map((btn) => (
              <button
                key={btn.key}
                onClick={() => handleQuickAction(btn.key)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full border border-gold/60 text-gold hover:bg-gold hover:text-black text-xs font-mono font-medium transition-all shadow-[0_0_10px_rgba(245,176,65,0.1)] active:scale-95"
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-[#151515] border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  context.qualStep === "awaiting_name"
                    ? "Type your full name..."
                    : context.qualStep === "awaiting_company"
                    ? "Type company name (or 'Skip')..."
                    : context.qualStep === "awaiting_email"
                    ? "Type your email address..."
                    : context.qualStep === "awaiting_phone"
                    ? "Type phone / WhatsApp number..."
                    : context.qualStep === "awaiting_goal"
                    ? "Type your brand goal..."
                    : "Ask LUCIAN AI about services, pricing..."
                }
                className="flex-1 h-9 px-3 text-xs rounded-lg bg-[#0A0A0A] border border-gold/50 text-white placeholder:text-mutedText/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 rounded-lg bg-gold text-background flex items-center justify-center hover:bg-[#FFBE53] disabled:opacity-40 transition-colors flex-shrink-0 font-bold"
                aria-label="Send"
              >
                <Send className="w-4 h-4 text-black" />
              </button>
            </form>

            {/* Quick Links Footer */}
            <div className="flex items-center justify-between pt-2.5 border-t border-white/5 text-[10px] font-mono text-mutedText">
              <a
                href="https://wa.me/9779818587406"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold flex items-center gap-1 transition-colors"
              >
                <Phone className="w-3 h-3 text-gold" />
                <span>977 9818587406</span>
              </a>

              <div className="flex items-center gap-1.5">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=lucianofficial07052026@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold flex items-center gap-1 transition-colors text-primaryText"
                  title="Open in Gmail"
                >
                  <Mail className="w-3 h-3 text-gold" />
                  <span>lucianofficial07052026@gmail.com</span>
                  <ExternalLink className="w-2.5 h-2.5 text-mutedText" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-1.5 py-0.5 rounded bg-white/5 hover:bg-white/10 text-mutedText hover:text-gold transition-colors flex items-center gap-0.5"
                  title="Copy email"
                >
                  {copiedEmail ? (
                    <span className="text-gold flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-2.5 h-2.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
