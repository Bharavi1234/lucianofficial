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
} from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

interface QAEntry {
  keywords: string[];
  answer: string;
}

// 12 Rule-Based Q&A entries
const QA_DATABASE: QAEntry[] = [
  {
    keywords: ["service", "offer", "do you do", "what do you provide", "what services", "solutions"],
    answer: `LUCIAN offers 5 core digital solutions:
1. Social Media Management – Strategy, content, scheduling & growth
2. Graphic Design & Poster Making – Eye-catching brand designs
3. Website Design & Development – Modern, responsive websites
4. Digital Marketing & Advertising – Campaigns that maximize ROI
5. Other Digital Solutions – SEO, branding, video editing & automation

Which service are you most interested in?`,
  },
  {
    keywords: ["price", "cost", "charge", "how much", "quote", "pricing", "budget", "expensive", "affordable", "rate", "fee"],
    answer: `Great question! Our pricing varies based on your specific needs – project scope, timeline, and requirements all factor in. The best way to get an accurate quote is to start an inquiry! Click 'Get Started' on any service card, fill out the brief details, and we'll get back to you with a custom quote within 24 hours.`,
  },
  {
    keywords: ["start", "get started", "how to begin", "process", "steps", "begin", "where to start", "onboard"],
    answer: `Getting started with LUCIAN is easy!
1. Browse our services and pick the one you need
2. Click 'Get Started' on that service card
3. Fill out our quick 3-step inquiry form
4. We'll review and get back to you within 24 hours

Or if you prefer, you can WhatsApp us directly at 977 9818587406!`,
  },
  {
    keywords: ["social media", "instagram", "facebook", "tiktok", "youtube", "linkedin", "smm", "social", "post", "reel"],
    answer: `Yes! Social Media Management is one of our core services. We handle:
• Content strategy & planning
• Post creation & scheduling
• Audience engagement
• Growth analytics

We help brands build a strong online presence across Instagram, Facebook, TikTok, YouTube, and LinkedIn. Ready to grow your social presence? Click 'Get Started' on the Social Media Management card!`,
  },
  {
    keywords: ["website", "web", "build website", "web development", "design website", "site", "landing page", "frontend", "coder"],
    answer: `Absolutely! Our Website Design & Development service creates:
• Modern, responsive websites
• User-friendly interfaces
• SEO-optimized sites
• High conversion rates

We build websites that look great and drive results. Want to see what we can do for you? Start an inquiry and tell us about your project!`,
  },
  {
    keywords: ["graphic", "design", "poster", "branding", "logo", "visual", "creative", "art", "illustration", "banner", "flyer"],
    answer: `Yes! Our Graphic Design & Poster Making service delivers:
• Eye-catching designs that communicate your brand
• Logos, social media graphics, marketing materials
• Brand guidelines and visual identity

We make sure your brand leaves a lasting impact. Click 'Get Started' on the Graphic Design & Poster Making card!`,
  },
  {
    keywords: ["digital marketing", "ads", "advertising", "campaign", "marketing", "roi", "conversion", "ad", "meta ads", "google ads"],
    answer: `Our Digital Marketing & Advertising service includes:
• Targeted ad campaigns (social media, search, display)
• Data-driven strategies
• ROI optimization
• Performance tracking and reporting

We create campaigns that convert and maximize your return on investment!`,
  },
  {
    keywords: ["other", "seo", "automation", "video", "editing", "branding", "more", "additional", "custom"],
    answer: `Our Other Digital Solutions cover everything else you might need:
• SEO (Search Engine Optimization)
• Branding and identity
• Video editing and production
• Marketing automation

We do it all for your growth. Tell us what you need and we'll build a custom solution!`,
  },
  {
    keywords: ["person", "human", "real", "talk", "call", "connect", "speak", "agent", "live", "representative", "founder"],
    answer: `Of course! You can reach a real human at LUCIAN through:
Email: lucianofficial07052026@gmail.com
WhatsApp: 977 9818587406

Or click 'Get Started' on any service card to submit an inquiry.
A real team member will get back to you within 24 hours!`,
  },
  {
    keywords: ["thanks", "thank you", "awesome", "great", "cool", "ok", "okay", "nice", "perfect", "good", "appreciate"],
    answer: `You're very welcome! If you have any more questions, I'm always here to help. Ready to start your journey with LUCIAN? Just click 'Get Started' on any service card, or reach out directly via email (lucianofficial07052026@gmail.com) or WhatsApp (977 9818587406). We can't wait to work with you!`,
  },
  {
    keywords: ["hello", "hi", "hey", "hola", "yo", "good morning", "good afternoon", "good evening", "hey there", "namaste"],
    answer: `Hello! Welcome to LUCIAN – your 360° digital solutions agency. I'm here to help you learn about our services, pricing, and how we can grow your brand. What can I help you with today?`,
  },
  {
    keywords: ["inquiry", "inquiry form", "submit", "form", "application", "quote form"],
    answer: `You can start an inquiry by clicking 'Get Started' on any service card. This will take you through our quick 3-step process:
1. Confirm your selected service
2. Tell us about you and your project
3. Review and submit

We'll get back to you within 24 hours via email or WhatsApp!`,
  },
];

const FALLBACK_ANSWER = `That's a great question! Let me point you to the best way to get answers. You can:
• Browse our services above and click 'Get Started' for details
• Visit our About page to learn more about us
• Contact us directly via email (lucianofficial07052026@gmail.com) or WhatsApp (977 9818587406)

Is there a specific service you're interested in?`;

const QUICK_REPLY_BUTTONS = [
  "What services do you offer?",
  "How much do you charge?",
  "How do I get started?",
  "Do you do social media?",
  "Can you build a website?",
  "What about graphic design?",
  "Connect me with a real person",
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello! Welcome to LUCIAN. I'm here to help you explore our 360° digital solutions. What can I help you with today?",
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Pure rule-based keyword matching logic
  const findAnswer = (query: string): string => {
    const q = query.toLowerCase().trim();

    for (const entry of QA_DATABASE) {
      const isMatch = entry.keywords.some((kw) => q.includes(kw));
      if (isMatch) {
        return entry.answer;
      }
    }

    return FALLBACK_ANSWER;
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

    // 500ms simulated typing delay
    setTimeout(() => {
      const botAnswer = findAnswer(userText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: botAnswer,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <>
      {/* Floating Gold Toggle Button */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-gold text-background flex items-center justify-center shadow-[0_0_25px_rgba(245,176,65,0.45)] hover:bg-[#FFBE53] hover:scale-105 active:scale-95 transition-all duration-200 animate-bounce"
            aria-label="Open LUCIAN Chatbot"
          >
            <MessageSquare className="w-6 h-6 text-background" />
          </button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-[9999] w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] max-h-[85vh] rounded-2xl bg-[#151515] border-2 border-gold shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-[#0A0A0A] border-b border-gold flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/40 flex items-center justify-center text-gold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black tracking-wide text-gold uppercase">
                  LUCIAN Bot
                </h3>
                <p className="text-[11px] text-mutedText font-mono">
                  360° Digital Solutions Assistant
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
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 max-h-[320px] scrollbar-thin scrollbar-thumb-white/10">
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
                  className={`max-w-[82%] rounded-xl p-3 text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap ${
                    msg.sender === "user"
                      ? "bg-white text-black font-medium rounded-tr-none"
                      : "bg-[#0A0A0A] border border-white/10 text-primaryText rounded-tl-none"
                  }`}
                >
                  {msg.text}
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

          {/* Quick Reply Chips */}
          <div className="p-2 border-t border-white/10 bg-[#0A0A0A] overflow-x-auto scrollbar-none flex items-center gap-1.5 flex-nowrap">
            {QUICK_REPLY_BUTTONS.map((chip) => (
              <button
                key={chip}
                onClick={() => handleSendMessage(chip)}
                className="flex-shrink-0 px-2.5 py-1 rounded-full border border-gold/60 text-gold hover:bg-gold hover:text-black text-[11px] font-mono transition-colors"
              >
                {chip}
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
                placeholder="Ask a question..."
                className="flex-1 h-9 px-3 text-xs rounded-lg bg-[#0A0A0A] border border-gold text-white placeholder:text-mutedText/50 focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 rounded-lg bg-gold text-white flex items-center justify-center hover:bg-[#FFBE53] disabled:opacity-40 transition-colors flex-shrink-0"
                aria-label="Send"
              >
                <Send className="w-4 h-4 text-black" />
              </button>
            </form>

            {/* Quick Links */}
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
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <span className="text-gold flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" /> Copied!
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
