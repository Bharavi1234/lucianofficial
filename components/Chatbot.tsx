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
  Music,
  Calendar,
  Instagram,
  Facebook,
  Video,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  type?: "text" | "social_hub" | "music_bio" | "booking_success" | "faq_menu";
  bookingData?: {
    name?: string;
    email?: string;
    eventDate?: string;
  };
}

interface SessionContext {
  userName?: string;
  userEmail?: string;
  eventDate?: string;
  bookingStep: "idle" | "awaiting_name" | "awaiting_email" | "awaiting_date";
}

// Hardcoded Dynamic FAQ Database
const FAQ_ITEMS = [
  {
    q: "What genre is your music?",
    keywords: ["genre", "music style", "what kind of music", "sound like", "type of music"],
    a: "LUCIAN blends Pop, Afrobeat, and R&B vibes. Check out my latest tracks!",
  },
  {
    q: "Do you do paid collaborations?",
    keywords: ["paid collab", "paid collaboration", "brand deal", "feature", "sponsor", "collab", "collaborate", "collaborations"],
    a: "Yes! For brand deals, collaborations, or features, please use the Booking button or email lucianofficial07052026@gmail.com directly.",
  },
  {
    q: "Where can I listen to your songs?",
    keywords: ["listen", "stream", "songs", "spotify", "apple music", "youtube music", "tracks", "latest music", "bio"],
    a: "Stream my music on Spotify, Apple Music, and YouTube Music. Check the 'Music' link in my bio!",
  },
  {
    q: "How can I contact LUCIAN directly?",
    keywords: ["contact", "reach", "email", "phone", "whatsapp", "social", "where can i find you", "find you"],
    a: "You can connect directly with LUCIAN through WhatsApp (977 9818587406), Official Email (lucianofficial07052026@gmail.com), TikTok (@.lucianofficial), Instagram (@_lucianofficial), or Facebook (LUCIAN Official).",
    showSocialHub: true,
  },
  {
    q: "What digital services do you offer?",
    keywords: ["service", "services", "offer", "what do you do", "solutions", "smm", "web", "design"],
    a: "LUCIAN offers 5 core 360° digital solutions:\n1. Social Media Management (from $35 / ₹4,550)\n2. Graphic Design & Posters (from $25 / ₹3,250)\n3. Website Design & Development (from $200 / ₹26,000)\n4. Digital Marketing & Ads (from $200/mo / ₹26,000/mo)\n5. Other Digital Solutions (from $50/hr / ₹6,500/hr)",
  },
  {
    q: "What is your pricing in USD & NPR?",
    keywords: ["price", "pricing", "cost", "npr", "usd", "rates", "exchange rate", "how much"],
    a: "Our pricing adapts dynamically based on location (1 USD = 130 NPR):\n• Social Media: $35 - $150 (₹4,550 - ₹19,500)\n• Graphic Design: $25 - $150 (₹3,250 - ₹19,500)\n• Website Development: $200 - $1,000 (₹26,000 - ₹130,000)\n• Digital Marketing: $200 - $700/mo (₹26,000 - ₹91,000/mo)\n\nClick 'Book / Collaborate' to start an inquiry!",
  },
];

const QUICK_MENU_BUTTONS = [
  { label: "📞 Contact Me", action: "contact" },
  { label: "🎵 Latest Music/Bio", action: "music" },
  { label: "📅 Book / Collaborate", action: "book" },
  { label: "❓ Help/FAQ", action: "faq" },
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hey! Welcome to LUCIAN. I'm LUCIAN's AI Assistant. 🎵\n\nHow can I help you today? You can check out my music, book a collab, view services, or reach out directly!",
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Session context memory
  const [context, setContext] = useState<SessionContext>({
    userName: undefined,
    userEmail: undefined,
    eventDate: undefined,
    bookingStep: "idle",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load / save session context memory
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem("lucian_chat_context");
        if (saved) {
          setContext(JSON.parse(saved));
        }
      } catch (e) {
        console.warn("Could not load chat memory:", e);
      }
    }
  }, []);

  const updateContext = (newContext: Partial<SessionContext>) => {
    setContext((prev) => {
      const updated = { ...prev, ...newContext };
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem("lucian_chat_context", JSON.stringify(updated));
        } catch (e) {
          console.warn("Could not save chat memory:", e);
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

  // Helper to extract names from greetings / self-introductions
  const extractName = (text: string): string | null => {
    const patterns = [
      /(?:my name is|i am|i'm|im|call me|this is)\s+([a-zA-Z]{2,20})/i,
      /^([a-zA-Z]{2,20})$/i,
    ];
    for (const p of patterns) {
      const match = text.trim().match(p);
      if (match && match[1]) {
        // filter out common conversational words
        const forbidden = ["hello", "hey", "hi", "yes", "no", "sure", "book", "collab", "music", "help", "thanks", "what", "where"];
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

  // Forward Lead data to backend API & FormSubmit
  const sendLeadToBackend = async (payload: {
    name?: string;
    email?: string;
    eventDate?: string;
    type: string;
  }) => {
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch((e) => console.log("Lead API notice:", e));
    } catch (err) {
      console.error("Lead submission error:", err);
    }
  };

  // Process user input
  const processUserInput = (rawInput: string) => {
    const text = rawInput.trim();
    const lower = text.toLowerCase();

    // 1. Session memory: check if user just introduced their name
    const detectedName = extractName(text);
    if (detectedName && !context.userName && context.bookingStep === "idle") {
      updateContext({ userName: detectedName });
    }

    // 2. Email opt-in detection if user enters an email outside flow
    const detectedEmail = extractEmail(text);
    if (detectedEmail && context.bookingStep === "idle") {
      updateContext({ userEmail: detectedEmail });
      sendLeadToBackend({
        name: context.userName || "Fan Subscriber",
        email: detectedEmail,
        type: "Newsletter / Release Opt-In",
      });

      return {
        text: `You're all set! I've saved ${detectedEmail}. You'll be the first to know about new music drops, tour dates, and exclusive releases. 🎵`,
        type: "text" as const,
      };
    }

    // 3. BOOKING / COLLABORATION LEAD CAPTURE FLOW
    if (context.bookingStep === "awaiting_name") {
      const name = detectedName || text;
      updateContext({ userName: name, bookingStep: "awaiting_email" });
      return {
        text: `Thanks, ${name}! What's the best email address to reach you at?`,
        type: "text" as const,
      };
    }

    if (context.bookingStep === "awaiting_email") {
      const email = detectedEmail || text;
      const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
      if (!isValid) {
        return {
          text: "Please provide a valid email address so our team can send you the booking details:",
          type: "text" as const,
        };
      }

      updateContext({ userEmail: email, bookingStep: "awaiting_date" });
      return {
        text: `Got it (${email})! What is the preferred event date or target project timeline? (e.g. 'Oct 15, 2026' or 'Next Month')`,
        type: "text" as const,
      };
    }

    if (context.bookingStep === "awaiting_date") {
      const eventDate = text;
      const finalName = context.userName || "Prospective Client";
      const finalEmail = context.userEmail || "Not provided";

      updateContext({ eventDate, bookingStep: "idle" });

      // Dispatch to lead capture API
      sendLeadToBackend({
        name: finalName,
        email: finalEmail,
        eventDate,
        type: "Chatbot Booking & Collaboration",
      });

      return {
        text: `Awesome, ${finalName}! Your booking request for ${eventDate} has been received. Our team will review it and reply to ${finalEmail} within 24 hours.`,
        type: "booking_success" as const,
        bookingData: {
          name: finalName,
          email: finalEmail,
          eventDate,
        },
      };
    }

    // Trigger Booking Flow
    if (
      lower.includes("book") ||
      lower.includes("collab") ||
      lower.includes("collaborate") ||
      lower.includes("hire") ||
      lower.includes("schedule") ||
      lower === "📅 book / collaborate"
    ) {
      if (context.userName) {
        updateContext({ bookingStep: "awaiting_email" });
        return {
          text: `Thanks, ${context.userName}! Let's get that booking scheduled. What's the best email address to reach you at?`,
          type: "text" as const,
        };
      } else {
        updateContext({ bookingStep: "awaiting_name" });
        return {
          text: "Let's get that booking or collaboration scheduled! What is your full name?",
          type: "text" as const,
        };
      }
    }

    // Trigger Social Hub
    if (
      lower.includes("contact") ||
      lower.includes("where can i find you") ||
      lower.includes("social") ||
      lower.includes("instagram") ||
      lower.includes("tiktok") ||
      lower.includes("facebook") ||
      lower.includes("reach") ||
      lower === "📞 contact me"
    ) {
      return {
        text: "Here are all of LUCIAN's official direct channels and socials:",
        type: "social_hub" as const,
      };
    }

    // Trigger Music / Bio
    if (
      lower.includes("music") ||
      lower.includes("song") ||
      lower.includes("bio") ||
      lower.includes("track") ||
      lower.includes("spotify") ||
      lower.includes("apple music") ||
      lower === "🎵 latest music/bio"
    ) {
      return {
        text: "LUCIAN blends Pop, Afrobeat, and R&B vibes. Stream the latest tracks and releases on your favorite platform:",
        type: "music_bio" as const,
      };
    }

    // Trigger Help / FAQ Menu
    if (
      lower.includes("faq") ||
      lower.includes("help") ||
      lower.includes("question") ||
      lower === "❓ help/faq"
    ) {
      return {
        text: "Here are the most common questions about LUCIAN's music, collaborations, and digital solutions:",
        type: "faq_menu" as const,
      };
    }

    // Check FAQ entries
    for (const item of FAQ_ITEMS) {
      if (item.keywords.some((k) => lower.includes(k))) {
        return {
          text: item.a,
          type: item.showSocialHub ? ("social_hub" as const) : ("text" as const),
        };
      }
    }

    // Greeting with Opt-in prompt
    if (
      lower.includes("hi") ||
      lower.includes("hello") ||
      lower.includes("hey") ||
      lower.includes("namaste") ||
      lower.includes("yo")
    ) {
      const greetingName = context.userName ? `, ${context.userName}` : "";
      return {
        text: `Hello${greetingName}! Welcome to LUCIAN. 🎵\n\nWould you like to stay updated on new music releases, live drops, and project slots? Drop your email below, or select an option to get started!`,
        type: "text" as const,
      };
    }

    // Fallback response
    return {
      text: "Thanks for reaching out! You can explore LUCIAN's latest music, book a collaboration, view our 360° digital solutions, or connect with us directly on WhatsApp.",
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

    // 400ms natural typing delay
    setTimeout(() => {
      const response = processUserInput(userText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: response.type,
        bookingData: response.bookingData,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 400);
  };

  const handleQuickAction = (action: string) => {
    if (action === "contact") handleSendMessage("📞 Contact Me");
    else if (action === "music") handleSendMessage("🎵 Latest Music/Bio");
    else if (action === "book") handleSendMessage("📅 Book / Collaborate");
    else if (action === "faq") handleSendMessage("❓ Help/FAQ");
  };

  return (
    <>
      {/* Floating Gold Toggle Button */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-gold text-background flex items-center justify-center shadow-[0_0_25px_rgba(245,176,65,0.45)] hover:bg-[#FFBE53] hover:scale-105 active:scale-95 transition-all duration-200"
            aria-label="Open LUCIAN Chatbot"
          >
            <MessageSquare className="w-6 h-6 text-background" />
          </button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-[9999] w-[calc(100vw-2rem)] sm:w-[390px] h-[540px] max-h-[88vh] rounded-2xl bg-[#151515] border-2 border-gold shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-[#0A0A0A] border-b border-gold/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/40 flex items-center justify-center text-gold shadow-[0_0_10px_rgba(245,176,65,0.2)]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black tracking-wide text-gold uppercase flex items-center gap-1.5">
                  <span>LUCIAN AI Assistant</span>
                  {context.userName && (
                    <span className="text-[10px] font-mono text-mutedText lowercase">({context.userName})</span>
                  )}
                </h3>
                <p className="text-[11px] text-mutedText font-mono">
                  Pop &middot; Afrobeat &middot; 360° Digital Agency
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

                  {/* Feature 4: Rich Social Hub Grid */}
                  {msg.type === "social_hub" && (
                    <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                      {/* 1. WhatsApp */}
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

                      {/* 2. Official Email with Open Gmail */}
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
                            className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gold/15 text-gold text-[10px] font-mono font-bold hover:bg-gold hover:text-black transition-colors"
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

                      {/* 3. TikTok */}
                      <a
                        href="https://www.tiktok.com/@.lucianofficial"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 rounded-lg bg-surface border border-white/10 hover:border-gold/50 text-xs text-primaryText transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Video className="w-3.5 h-3.5 text-gold" />
                          <span>TikTok: <strong className="text-gold">@.lucianofficial</strong></span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-mutedText" />
                      </a>

                      {/* 4. Instagram */}
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

                      {/* 5. Facebook */}
                      <a
                        href="https://www.facebook.com/profile.php?id=61593873428903"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 rounded-lg bg-surface border border-white/10 hover:border-gold/50 text-xs text-primaryText transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Facebook className="w-3.5 h-3.5 text-gold" />
                          <span>Facebook: <strong className="text-gold">LUCIAN Official</strong></span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-mutedText" />
                      </a>
                    </div>
                  )}

                  {/* Feature 3 & Music Bio Card */}
                  {msg.type === "music_bio" && (
                    <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                      <div className="p-2.5 rounded-lg bg-surface border border-gold/30">
                        <div className="text-[11px] font-mono text-gold uppercase mb-1">Genre &amp; Sound</div>
                        <div className="text-xs text-primaryText font-medium">Pop &middot; Afrobeat &middot; R&amp;B Vibes</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href="https://spotify.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-surface border border-white/10 hover:border-gold text-center text-xs font-semibold text-primaryText hover:text-gold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Music className="w-3.5 h-3.5 text-gold" />
                          <span>Spotify</span>
                        </a>
                        <a
                          href="https://music.apple.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-surface border border-white/10 hover:border-gold text-center text-xs font-semibold text-primaryText hover:text-gold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Music className="w-3.5 h-3.5 text-gold" />
                          <span>Apple Music</span>
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSendMessage("📅 Book / Collaborate")}
                        className="w-full py-2 rounded-lg bg-gold text-background font-bold text-xs hover:bg-[#FFBE53] transition-colors flex items-center justify-center gap-1.5 mt-1"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Collaboration / Feature</span>
                      </button>
                    </div>
                  )}

                  {/* Feature 2: Booking Success Card */}
                  {msg.type === "booking_success" && msg.bookingData && (
                    <div className="mt-3 p-3 rounded-lg bg-surface border border-gold/50 space-y-2 text-left">
                      <div className="flex items-center gap-1.5 text-gold text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Request Forwarded</span>
                      </div>
                      <div className="text-[11px] text-mutedText font-mono space-y-0.5">
                        <div>Client: <strong className="text-white">{msg.bookingData.name}</strong></div>
                        <div>Email: <strong className="text-white">{msg.bookingData.email}</strong></div>
                        <div>Target Date: <strong className="text-white">{msg.bookingData.eventDate}</strong></div>
                      </div>
                      <a
                        href={`https://wa.me/9779818587406?text=${encodeURIComponent(
                          `*CHATBOT COLLABORATION INQUIRY*\nName: ${msg.bookingData.name}\nEmail: ${msg.bookingData.email}\nDate: ${msg.bookingData.eventDate}\nHi LUCIAN, I just requested a booking!`
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

                  {/* Feature 3: FAQ Quick Triggers */}
                  {msg.type === "faq_menu" && (
                    <div className="mt-3 pt-2 border-t border-white/10 space-y-1.5">
                      <button
                        onClick={() => handleSendMessage("What genre is your music?")}
                        className="w-full text-left p-2 rounded bg-surface hover:bg-gold/10 border border-white/5 hover:border-gold/30 text-xs text-primaryText hover:text-gold transition-colors flex items-center justify-between"
                      >
                        <span>What genre is your music?</span>
                        <ArrowRight className="w-3 h-3 text-gold shrink-0" />
                      </button>
                      <button
                        onClick={() => handleSendMessage("Do you do paid collaborations?")}
                        className="w-full text-left p-2 rounded bg-surface hover:bg-gold/10 border border-white/5 hover:border-gold/30 text-xs text-primaryText hover:text-gold transition-colors flex items-center justify-between"
                      >
                        <span>Do you do paid collaborations?</span>
                        <ArrowRight className="w-3 h-3 text-gold shrink-0" />
                      </button>
                      <button
                        onClick={() => handleSendMessage("Where can I listen to your songs?")}
                        className="w-full text-left p-2 rounded bg-surface hover:bg-gold/10 border border-white/5 hover:border-gold/30 text-xs text-primaryText hover:text-gold transition-colors flex items-center justify-between"
                      >
                        <span>Where can I listen to your songs?</span>
                        <ArrowRight className="w-3 h-3 text-gold shrink-0" />
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

          {/* Feature 1: Persistent Interactive Quick Reply Menu */}
          <div className="p-2 border-t border-gold/30 bg-[#0A0A0A] overflow-x-auto scrollbar-none flex items-center gap-1.5 flex-nowrap">
            {QUICK_MENU_BUTTONS.map((btn) => (
              <button
                key={btn.action}
                onClick={() => handleQuickAction(btn.action)}
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
                  context.bookingStep === "awaiting_name"
                    ? "Type your full name..."
                    : context.bookingStep === "awaiting_email"
                    ? "Type your email address..."
                    : context.bookingStep === "awaiting_date"
                    ? "Type event date / timeline..."
                    : "Ask LUCIAN AI anything..."
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
