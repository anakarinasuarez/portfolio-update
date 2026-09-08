"use client";

/* ============================================================
   AI assistant — answers questions about Ana Karina and helps
   visitors request an interview. Talks to /api/chat, which holds
   the system prompt and the model credential server-side.

   El estado y la conversación viven en useChat; los textos en copy.
   Aquí solo queda el marcado.
   ============================================================ */

import { useState } from "react";

import { Arrow } from "@/components/ui/Arrow";
import { siteConfig } from "@/lib/site";

import { mailtoFor, useChat } from "./useChat";

export function Chat() {
  const [open, setOpen] = useState<boolean>(false);
  const { c, msgs, input, setInput, busy, booking, bookingUrl, bodyRef, send } = useChat();

  return (
    <div className={"chat" + (open ? " chat-open" : "")}>
      <button className="chat-fab" aria-label={c.open} onClick={() => setOpen((o) => !o)}>
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9A1.5 1.5 0 0 1 18.5 16H9l-4 3.5V16H5.5A1.5 1.5 0 0 1 4 14.5v-9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><circle cx="9" cy="10" r="1" fill="currentColor" /><circle cx="12.5" cy="10" r="1" fill="currentColor" /><circle cx="16" cy="10" r="1" fill="currentColor" /></svg>
        )}
      </button>

      {open && (
        <div className="chat-panel" role="dialog" aria-label={c.title}>
          <div className="chat-head">
            <span className="chat-avatar">AK</span>
            <div className="chat-head-txt">
              <strong>{c.title}</strong>
              <span><span className="chat-online" /> {c.sub}</span>
            </div>
          </div>

          <div className="chat-body" ref={bodyRef}>
            {msgs.map((m, i) => (
              <div className={"chat-msg chat-" + m.role} key={i}>
                <div className="chat-bubble">
                  {m.text}
                  {m.mail && (
                    <a className="chat-maillink" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                  )}
                </div>
              </div>
            ))}
            {busy && (
              <div className="chat-msg chat-assistant">
                <div className="chat-bubble chat-typing"><span /><span /><span /></div>
              </div>
            )}
            {booking && (
              <div className="chat-booking">
                <div className="chat-booking-row"><b>{booking.name}</b> · {booking.email}</div>
                {booking.format && <div className="chat-booking-row chat-booking-format">{booking.format}</div>}
                <div className="chat-booking-row chat-booking-topic">{booking.topic}</div>
                {/* Con calendario, el visitante elige hora libre; sin él, correo. */}
                <a
                  className="chat-confirm"
                  href={bookingUrl ?? mailtoFor(booking)}
                  {...(bookingUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {bookingUrl ? c.pickSlot : c.confirm} <Arrow size={14} />
                </a>
              </div>
            )}
          </div>

          {msgs.length <= 1 && !busy && (
            <div className="chat-chips">
              {c.chips.map((q) => (
                <button key={q} onClick={() => send(q)}>{q}</button>
              ))}
            </div>
          )}

          <form className="chat-input" onSubmit={(e) => { e.preventDefault(); send(); }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={c.placeholder}
              aria-label={c.placeholder}
            />
            <button type="submit" aria-label={c.send} disabled={busy || !input.trim()}>
              <Arrow size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
