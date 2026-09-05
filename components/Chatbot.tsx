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
  ArrowRight,
  CheckCircle2,
  Minimize2,
} from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  isLeadForm?: boolean;
}

const QUICK_REPLIES = [
  "What services do you offer?",
  "How much do you charge?",
  "How do I get started?",
  "Do you do social media?",
  "Can you build a website?",
  "Connect me with a real person",
];

const PRESET_RESPONSES: Record<string, string> = {
  "what services do you offer?": `LUCIAN offers 5 core digital solutions:
1. Social Media Management – Strategy, content, scheduling & growth
2. Graphic Design & Poster Making – Eye-catching brand designs
3. Website Design & Development – Modern, responsive websites
4. Digital Marketing & Advertising – Campaigns that maximize ROI
5. Other Digital Solutions – SEO, branding, video editing & automation`,

  "how much do you charge?": `Great question! Our pricing varies based on your specific needs. The best way to get an accurate quote is to start an inquiry! Click "Get Started" on any service card, fill out the brief details, and we'll get back to you with a custom quote within 24 hours.`,

  "how do i get started?": `Getting started with LUCIAN is easy!
1. Browse our services
2. Click "Get Started" on the service you want
3. Fill out our quick 3-step form
4. We'll get back to you within 24 hours.
Or WhatsApp us directly at 977 9818587406!`,

  "do you do social media?": `Yes! Social Media Management is one of our core services. We handle content strategy, post creation & scheduling, audience engagement, and growth analytics across Instagram, Facebook, TikTok, YouTube, and LinkedIn.`,

  "can you build a website?": `Absolutely! Our Website Design & Development service creates modern, responsive, SEO-optimized sites that drive conversions.`,

  "connect me with a real person": `Of course!
• Email: lucianofficial636@gmail.com
• WhatsApp: 977 9818587406 (wa.me/9779818587406)
• Instagram: @_lucianofficial

Or click "Get Started" on any service card. A real team member will get back to you within 24 hours!`,
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello! I'm LUCIAN Bot. How can I help elevate your brand today?",
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Lead capture state
  const [leadName, setLeadName] = useState("");
  const [leadContact, setLeadContact] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load Puter.js in background
  useEffect(() => {
    if (typeof window !== "undefined" && !(window as unknown as { puter?: unknown }).puter) {
      const script = document.createElement("script");
      script.src = "https://js.puter.com/v2/";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    // Check instant local preset responses first
    const lower = queryText.toLowerCase().trim();
    if (PRESET_RESPONSES[lower]) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: PRESET_RESPONSES[lower],
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        setIsTyping(false);
      }, 400);
      return;
    }

    try {
      // 1. Try Puter.js directly in browser if available
      const puterObj = (window as unknown as { puter?: { ai?: { chat?: (prompt: string, opts?: { model?: string }) => Promise<unknown> } } })?.puter;
      if (puterObj?.ai?.chat) {
        try {
          const puterResponse = await puterObj.ai.chat(
            `You are LUCIAN Bot, the friendly AI assistant for LUCIAN – a 360° digital solutions agency (Social Media Management, Graphic Design, Web Development, Digital Marketing, SEO & Branding). Contact: lucianofficial636@gmail.com, WhatsApp: 977 9818587406. Answer concisely and enthusiastically: ${queryText}`,
            { model: "gemini-2.5-flash" }
          );

          const replyText =
            typeof puterResponse === "string"
              ? puterResponse
              : (puterResponse as { message?: { content?: string } })?.message?.content ||
                (puterResponse as { text?: string })?.text;

          if (replyText) {
            setMessages((prev) => [
              ...prev,
              {
                id: (Date.now() + 1).toString(),
                sender: "bot",
                text: replyText,
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              },
            ]);
            setIsTyping(false);
            return;
          }
        } catch {
          // fallback to API route
        }
      }

      // 2. Call internal /api/chat route
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: queryText,
          history: messages.slice(-4).map((m) => ({
            role: m.sender === "bot" ? "assistant" : "user",
            content: m.text,
          })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: data.reply || "I'm here to help! Feel free to WhatsApp us at 977 9818587406.",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } else {
        throw new Error("Chat response not ok");
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: `I'd love to help with that! You can reach our team directly at lucianofficial636@gmail.com or on WhatsApp at 977 9818587406.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadContact.trim()) return;

    setLeadSubmitting(true);
    try {
      await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceName: "Chatbot Lead Capture",
          fullName: leadName,
          email: leadContact.includes("@") ? leadContact : "Chatbot Lead",
          phone: leadContact,
          projectBrief: "User requested callback via LUCIAN AI Chatbot.",
          budgetRange: "Not specified",
          howFound: "AI Chatbot",
        }),
      }).catch(() => {});

      setLeadSubmitted(true);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          sender: "bot",
          text: `Thank you, ${leadName}! Our team has received your details and will contact you via ${leadContact} within 24 hours.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch {
      setLeadSubmitted(true);
    } finally {
      setLeadSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Gold Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gold text-background shadow-[0_0_25px_rgba(245,176,65,0.45)] hover:bg-[#FFBE53] hover:scale-110 active:scale-95 transition-all duration-200"
            aria-label="Open LUCIAN AI Chatbot"
          >
            <MessageSquare className="w-6 h-6 text-background transition-transform group-hover:rotate-12" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-background animate-pulse" />
          </button>
        )}
      </div>

      {/* Chat Window Popup */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[580px] max-h-[85vh] rounded-3xl bg-[#121212] border border-gold/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div className="p-4 bg-surface border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold shadow-[0_0_15px_rgba(245,176,65,0.2)]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black tracking-wide text-primaryText uppercase">
                    LUCIAN <span className="text-gold">Bot</span>
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-mutedText font-mono">
                  360° Digital Agency AI Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-mutedText hover:text-primaryText hover:bg-white/5 transition-colors"
                aria-label="Minimize Chatbot"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-mutedText hover:text-gold hover:bg-white/5 transition-colors"
                aria-label="Close Chatbot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${
                  msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs ${
                    msg.sender === "user"
                      ? "bg-gold text-background font-bold"
                      : "bg-surface border border-gold/30 text-gold"
                  }`}
                >
                  {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                </div>

                <div
                  className={`max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.sender === "user"
                      ? "bg-gold text-background font-medium rounded-tr-none shadow-[0_2px_15px_rgba(245,176,65,0.25)]"
                      : "bg-surface border border-white/10 text-primaryText rounded-tl-none"
                  }`}
                >
                  {msg.text}
                  <div
                    className={`text-[10px] mt-1.5 font-mono ${
                      msg.sender === "user" ? "text-background/70 text-right" : "text-mutedText"
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-mutedText font-mono">
                <div className="w-7 h-7 rounded-lg bg-surface border border-gold/30 flex items-center justify-center text-gold">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="p-3 rounded-2xl bg-surface border border-white/10 rounded-tl-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            {/* Lead Capture Widget (Optionally displayed) */}
            {!leadSubmitted && messages.length >= 3 && (
              <div className="p-3.5 rounded-xl bg-gold/5 border border-gold/30 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono text-gold font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Want a quick callback or custom quote?</span>
                </div>
                <form onSubmit={handleLeadSubmit} className="space-y-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    required
                    className="w-full h-8 px-2.5 text-xs rounded-md bg-[#0A0A0A] border border-white/10 text-primaryText focus:border-gold outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Email or WhatsApp"
                    value={leadContact}
                    onChange={(e) => setLeadContact(e.target.value)}
                    required
                    className="w-full h-8 px-2.5 text-xs rounded-md bg-[#0A0A0A] border border-white/10 text-primaryText focus:border-gold outline-none"
                  />
                  <button
                    type="submit"
                    disabled={leadSubmitting}
                    className="w-full h-8 rounded-md bg-gold text-background text-xs font-bold hover:bg-[#FFBE53] transition-colors flex items-center justify-center gap-1.5"
                  >
                    {leadSubmitting ? <span>Sending...</span> : <span>Request Quick Callback</span>}
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </form>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Pills */}
          <div className="p-2 border-t border-white/5 bg-background/50 overflow-x-auto scrollbar-none flex items-center gap-1.5 flex-nowrap">
            {QUICK_REPLIES.map((reply) => (
              <button
                key={reply}
                onClick={() => handleSendMessage(reply)}
                className="flex-shrink-0 px-2.5 py-1 rounded-full bg-surface border border-white/10 hover:border-gold/50 hover:bg-gold/10 hover:text-gold text-[11px] font-mono text-mutedText transition-all"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-surface border-t border-white/10">
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
                placeholder="Ask LUCIAN Bot anything..."
                className="flex-1 h-10 px-3.5 text-xs rounded-xl bg-[#0A0A0A] border border-white/10 text-primaryText placeholder:text-mutedText/60 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 rounded-xl bg-gold text-background flex items-center justify-center hover:bg-[#FFBE53] disabled:opacity-40 transition-all flex-shrink-0 shadow-[0_0_10px_rgba(245,176,65,0.3)]"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Contact Links */}
            <div className="flex items-center justify-between pt-2 px-1 text-[10px] font-mono text-mutedText/70">
              <a
                href="https://wa.me/9779818587406"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold flex items-center gap-1 transition-colors"
              >
                <Phone className="w-2.5 h-2.5" />
                <span>WhatsApp: 977 9818587406</span>
              </a>
              <a
                href="mailto:lucianofficial636@gmail.com"
                className="hover:text-gold flex items-center gap-1 transition-colors"
              >
                <Mail className="w-2.5 h-2.5" />
                <span>lucianofficial636@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
