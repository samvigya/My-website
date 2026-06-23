"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "model"; text: string };

const SUGGESTIONS = [
  "Why did you move from analytics to CSM?",
  "What's your biggest achievement?",
  "What tools do you use day to day?",
  "Tell me something not on your resume.",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "model",
      text: "Hey! I'm a little AI version of Samvigya 👋 Ask me anything about my work, my pivot from analytics to CSM, or honestly whatever you're curious about.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Msg = { role: "user", text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: nextMessages.slice(0, -1).map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setMessages((m) => [
          ...m,
          {
            role: "model",
            text:
              "Hmm, I'm having trouble responding right now — feel free to email trivedisamvigya@gmail.com directly!",
          },
        ]);
      } else {
        setMessages((m) => [...m, { role: "model", text: data.reply }]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "model",
          text: "Something went wrong on my end — try again in a bit?",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating bubble */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
        style={{
          background: open ? "var(--ink)" : "var(--coral)",
          color: open ? "var(--butter)" : "var(--ink)",
        }}
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Panel */}
      <div
        className="fixed bottom-24 right-6 z-50 w-[min(380px,calc(100vw-2.5rem))] rounded-3xl border border-[var(--line)] bg-white shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right"
        style={{
          height: "min(560px, 70vh)",
          opacity: open ? 1 : 0,
          transform: open ? "scale(1) translateY(0)" : "scale(0.92) translateY(12px)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {/* header */}
        <div
          className="px-5 py-4 flex items-center gap-3 shrink-0"
          style={{ background: "var(--lavender)" }}
        >
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-lg">
            🙋‍♀️
          </div>
          <div>
            <p className="font-[family-name:var(--font-display)] font-semibold text-[15px] text-[var(--ink)]">
              Ask me anything
            </p>
            <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--ink)]/70">
              AI version of Samvigya
            </p>
          </div>
        </div>

        {/* messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
          style={{ background: "var(--butter-deep)" }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className="flex"
              style={{
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                className="max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed"
                style={{
                  background: m.role === "user" ? "var(--ink)" : "white",
                  color: m.role === "user" ? "var(--butter)" : "var(--ink)",
                  border: m.role === "user" ? "none" : "1px solid var(--line)",
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl px-4 py-3 bg-white border border-[var(--line)] flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[var(--ink-soft)] animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          {messages.length === 1 && !loading && (
            <div className="flex flex-col gap-2 pt-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-left text-[13px] rounded-xl px-3.5 py-2.5 bg-white border border-[var(--line)] hover:border-[var(--coral-deep)] hover:text-[var(--coral-deep)] transition-colors text-[var(--ink-soft)]"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="p-3 border-t border-[var(--line)] flex gap-2 shrink-0 bg-white"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a question..."
            className="flex-1 rounded-full px-4 py-2.5 text-[14px] bg-[var(--butter-deep)] outline-none focus:ring-2 focus:ring-[var(--coral)] text-[var(--ink)]"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors disabled:opacity-40 cursor-pointer"
            style={{ background: "var(--coral)" }}
            aria-label="Send"
          >
            →
          </button>
        </form>
      </div>
    </>
  );
}
