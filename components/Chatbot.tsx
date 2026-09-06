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

// Rule-Based Q&A Database with Dual-Currency & Pricing integration
const QA_DATABASE: QAEntry[] = [
  {
    keywords: ["prices in npr", "npr", "nepali", "nepal price", "rs", "rupee", "in npr"],
    answer: `Here are our prices in NPR (₹):

Social Media Management:
- Basic: ₹4,550
- Standard: ₹9,750 (Most Popular)
- Premium: ₹19,500

Graphic Design & Poster Making:
- Basic: ₹3,250
- Standard: ₹7,150
- Premium: ₹19,500

Website Design & Development:
- Basic: ₹26,000
- Standard: ₹65,000
- Premium: ₹130,000

Digital Marketing & Advertising:
- Basic: ₹26,000/month
- Standard: ₹52,000/month
- Premium: ₹91,000/month

Other Digital Solutions:
- Basic: ₹6,500/hour
- Standard: ₹19,500/project
- Premium: ₹52,000/project

Complete Digital Pro:
- Starting at ₹130,000 (custom quote)

These prices are calculated at 1 USD = 130 NPR. Use the country selector in the top right to switch between currencies.`,
  },
  {
    keywords: ["prices in usd", "usd", "dollar", "in usd", "dollar price", "usd price"],
    answer: `Here are our prices in USD ($):

Social Media Management:
- Basic: $35
- Standard: $75 (Most Popular)
- Premium: $150

Graphic Design & Poster Making:
- Basic: $25
- Standard: $55
- Premium: $150

Website Design & Development:
- Basic: $200
- Standard: $500
- Premium: $1,000

Digital Marketing & Advertising:
- Basic: $200/month
- Standard: $400/month
- Premium: $700/month

Other Digital Solutions:
- Basic: $50/hour
- Standard: $150/project
- Premium: $400/project

Complete Digital Pro:
- Starting at $1,000 (custom quote)

Use the country selector in the top right to switch to NPR prices.`,
  },
  {
    keywords: ["how much is social media", "social media management price", "social media cost", "smm cost", "smm price"],
    answer: `Our Social Media Management packages:
- Basic: $35 (2 platforms, 5 posts + 1 reel, 7 days)
- Standard: $75 (3 platforms, 10 posts + 3 reels, 15 days) ← Most Popular
- Premium: $150 (5 platforms, 20 posts + 6 reels, 30 days)

Prices shown in USD. Use the country selector above to switch to NPR (₹) prices!`,
  },
  {
    keywords: ["most popular", "popular package", "best package", "popular choice", "which package"],
    answer: `The Standard package is our most popular choice across all services! For Social Media Management, it's $75/month (or ₹9,750 in NPR) for:
- 3 platforms
- 10 posts + 3 reels
- 15 days of management
- Engagement with followers
- Action plan
- Basic reporting
- 2 revisions

It offers the perfect balance of features and value. You can select it on any service page!`,
  },
  {
    keywords: ["exchange rate", "conversion rate", "usd to npr", "npr to usd", "1 usd"],
    answer: `The current exchange rate we use is:
1 USD = 130 NPR

This means:
- $35 = ₹4,550
- $75 = ₹9,750
- $150 = ₹19,500
- $200 = ₹26,000
- $500 = ₹65,000
- $1,000 = ₹130,000

We update this rate periodically to stay current. Use the country selector in the top right to switch between currencies.`,
  },
  {
    keywords: ["complete digital pro", "digital pro", "all in one pro", "pro bundle"],
    answer: `Complete Digital Pro is our comprehensive 360° all-in-one digital growth package starting at $1,000 (or ₹130,000 in NPR). It integrates full-stack social media management, complete brand graphics, high-performance website development, targeted multi-channel ad campaigns, and automated SEO infrastructure. Contact us directly or start an inquiry for a custom quote!`,
  },
  {
    keywords: ["service", "offer", "do you do", "what do you provide", "what services", "solutions"],
    answer: `LUCIAN offers 5 core digital solutions:
1. Social Media Management – Strategy, content, scheduling & growth (from $35 / ₹4,550)
2. Graphic Design & Poster Making – Eye-catching brand designs (from $25 / ₹3,250)
3. Website Design & Development – Modern, responsive websites (from $200 / ₹26,000)
4. Digital Marketing & Advertising – Campaigns that maximize ROI (from $200/mo / ₹26,000/mo)
5. Other Digital Solutions – SEO, branding, video editing & automation (from $50/hr / ₹6,500/hr)

Which service are you most interested in?`,
  },
  {
    keywords: ["price", "cost", "charge", "how much", "quote", "pricing", "budget", "expensive", "affordable", "rate", "fee"],
    answer: `Our pricing is transparent and flexible in both USD ($) and NPR (₹):
• Social Media Management: Starting at $35 / ₹4,550
• Graphic Design & Posters: Starting at $25 / ₹3,250
• Website Development: Starting at $200 / ₹26,000
• Digital Marketing: Starting at $200/mo / ₹26,000/mo
• Other Solutions: Starting at $50/hr / ₹6,500/hr

Click 'Show me prices in NPR' or 'Show me prices in USD' below for full package breakdowns!`,
  },
  {
    keywords: ["start", "get started", "how to begin", "process", "steps", "begin", "where to start", "onboard"],
    answer: `Getting started with LUCIAN is easy!
1. Browse our services and pick the one you need
2. Click 'Get Started' on that service card
3. Choose your package (Basic, Standard, or Premium)
4. Fill out our quick inquiry form
5. We'll review and get back to you within 24 hours

Or if you prefer, you can WhatsApp us directly at 977 9818587406!`,
  },
  {
    keywords: ["social media", "instagram", "facebook", "tiktok", "youtube", "linkedin", "smm", "social", "post", "reel"],
    answer: `Yes! Social Media Management is one of our core services. We handle:
• Content strategy & planning
• Post creation & scheduling (Reels, Carousels, Stories)
• Community & audience engagement
• Growth analytics & monthly reports

Tiers start from $35 (₹4,550) up to $150 (₹19,500). Click 'Get Started' on the Social Media Management card to choose your tier!`,
  },
  {
    keywords: ["website", "web", "build website", "web development", "design website", "site", "landing page", "frontend"],
    answer: `Absolutely! Our Website Design & Development service creates:
• Modern, responsive websites built with Next.js / React
• Bespoke UI/UX engineered for high conversion rates
• Technical SEO foundation & blazing-fast load speeds
• Seamless WhatsApp & email inquiry integrations

Packages: Basic ($200 / ₹26k), Standard ($500 / ₹65k), Premium ($1,000 / ₹130k). Start an inquiry to launch your site!`,
  },
  {
    keywords: ["graphic", "design", "poster", "branding", "logo", "visual", "creative", "art", "flyer"],
    answer: `Yes! Our Graphic Design & Poster Making service delivers:
• Eye-catching visual assets that communicate your brand
• Event posters, social ad graphics, banners & collateral
• Complete typography & brand identity guidelines

Packages: Basic ($25 / ₹3,250), Standard ($55 / ₹7,150), Premium ($150 / ₹19,500). Click 'Get Started' on the Graphic Design card!`,
  },
  {
    keywords: ["digital marketing", "ads", "advertising", "campaign", "marketing", "roi", "conversion", "meta ads", "google ads"],
    answer: `Our Digital Marketing & Advertising service includes:
• Targeted ad campaigns across Meta, Google & TikTok
• High-converting ad copy & dynamic creatives
• Continuous A/B testing & ROI optimization
• Transparent ROAS analytics & reporting

Packages: Basic ($200/mo / ₹26k), Standard ($400/mo / ₹52k), Premium ($700/mo / ₹91k).`,
  },
  {
    keywords: ["other", "seo", "automation", "video", "editing", "branding", "custom"],
    answer: `Our Other Digital Solutions cover:
• Advanced Search Engine Optimization (SEO)
• Short-form video editing for Reels & TikTok
• Automated lead capture & CRM workflows
• Bespoke technical consulting

Rates start at $50/hour (₹6,500/hr) or $150/project (₹19,500/project). Tell us what you need!`,
  },
  {
    keywords: ["person", "human", "real", "talk", "call", "connect", "speak", "agent", "live", "representative", "founder"],
    answer: `Of course! You can reach a real team member at LUCIAN through:
Email: lucianofficial07052026@gmail.com
WhatsApp: 977 9818587406

Or click 'Get Started' on any service card to submit an inquiry. We'll connect with you within 24 hours!`,
  },
  {
    keywords: ["thanks", "thank you", "awesome", "great", "cool", "ok", "okay", "nice", "perfect", "good", "appreciate"],
    answer: `You're very welcome! If you have any more questions, I'm always here to help. Ready to elevate your brand with LUCIAN? Just click 'Get Started' on any service card, or reach out directly via WhatsApp (977 9818587406) or email (lucianofficial07052026@gmail.com).`,
  },
  {
    keywords: ["hello", "hi", "hey", "hola", "yo", "good morning", "good afternoon", "good evening", "namaste"],
    answer: `Hello! Welcome to LUCIAN – your 360° digital solutions agency. I'm here to help you explore our services, dual-currency pricing (USD / NPR), and how we can grow your brand. What can I help you with today?`,
  },
  {
    keywords: ["inquiry", "inquiry form", "submit", "form", "application", "quote form"],
    answer: `You can start an inquiry by clicking 'Get Started' on any service card:
1. Select your desired package tier (Basic, Standard, or Premium)
2. Provide your project details and contact info
3. Review and submit

Our team will review your requirements and get back to you within 24 hours!`,
  },
];

const FALLBACK_ANSWER = `That's a great question! Here is how we can help you best:
• Browse our services on the website and click 'Get Started' for full package details
• Switch between USD ($) and NPR (₹) using the country selector in the top right
• Contact our team directly via WhatsApp (977 9818587406) or email (lucianofficial07052026@gmail.com)

Would you like to see our prices in NPR or USD?`;

const QUICK_REPLY_BUTTONS = [
  "What services do you offer?",
  "How much is social media management?",
  "Show me prices in NPR",
  "Show me prices in USD",
  "What's the most popular package?",
  "Can you build a website?",
  "What about graphic design?",
  "Tell me about Complete Digital Pro",
  "Connect me with a real person",
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello! Welcome to LUCIAN. I'm here to help you explore our 360° digital solutions and pricing (USD & NPR). What can I help you with today?",
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
