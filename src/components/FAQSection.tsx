import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'What is an OG Username?',
    answer: '“OG” stands for Original Gangster (or original generation) inside online forums. In naming conventions, it refers to usernames that are extremely short (usually 3 or 4 characters, e.g., "q7x" or "Azyr"), or consist of actual dictionary words (e.g., "Void", "Haze") with no clutter, symbols, or numeric suffixes. These are highly prized and hard to find.'
  },
  {
    question: 'How does the AI Smart Generator work?',
    answer: 'Our AI generator integrates the advanced Gemini 3.5-flash model server-side. Rather than randomly joining prefixes and suffixes, it parses your custom creative search prompt (e.g., "cozy bakery", "cyber rogue stealth hacker") and returns curated phonetic candidates with custom conceptual definitions and style tags directly from custom neural indexing schemas.'
  },
  {
    question: 'Are the generated usernames guaranteed to be available?',
    answer: 'Given that billions of profiles exist across Instagram, Discord, and TikTok, some handles may already be taken. Our Instant Social Availability Scanner performs real-time heuristic checks to evaluate if a handle is claimable. These outcomes are accurate indicators, but we recommend direct profile lookups before making final branding moves.'
  },
  {
    question: 'Can I export custom favorited username lists?',
    answer: 'Yes! UserGen is engineered to be fully standalone and offline-first. You can create multiple custom Bookmark Collections (e.g., "Gaming Handles", "Startup Names") in your browser. With a single click, you can export selected names or whole list frames as unformatted TXT spreadsheets, CSV databases, or standardized structured JSON.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq-accordions" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-white/5 bg-[#08080f]/50">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Accompanying visual marketing info block */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 shadow-xl backdrop-blur">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-white tracking-wide">
              Security & Privacy Reserved
            </h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              We never log or escrow your generated username candidates. Everything (including custom favorite collections, history search states, and copied cache registries) is stored locally within browser sandboxes. No cloud telemetry or third-party tracking.
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 shadow-xl backdrop-blur">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <h3 className="mt-4 text-base font-bold text-white tracking-wide">
              No Sign-Up or Subscriptions
            </h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              UserGen is an open-source, developer-accessible platform design prototype. Generate limitless combinations, copy, favorite, and bundle layouts forever without ever typing credit card data or passwords.
            </p>
          </div>
        </div>

        {/* ACCORDION COLUMN CONTAINER */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center space-x-2 border-b border-white/5 pb-3.5 mb-2">
            <HelpCircle className="h-5 w-5 text-blue-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Core Platform FAQ
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-white/5 bg-slate-950/20 px-4 py-3.5 transition-all hover:bg-slate-950/40"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between text-left text-xs font-bold text-white uppercase tracking-wide"
                  >
                    <span>{item.question}</span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    )}
                  </button>

                  <div
                    className={`mt-3 overflow-hidden text-xs text-slate-400 leading-relaxed transition-all duration-300 ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="border-t border-white/5 pt-3 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
