'use client';

import React from 'react';
import { FAQ_ITEMS } from '@/lib/constants';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function FAQSection() {
  return (
    <section id="faq" className="py-28 relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">Got Questions?</h2>
          <p className="text-3xl sm:text-5xl font-bold text-white font-heading tracking-tight">Frequently Asked Questions</p>
        </div>

        <Accordion className="w-full space-y-4">
          {FAQ_ITEMS.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="rounded-xl border border-white/10 bg-slate-900/40 px-6">
              <AccordionTrigger className="text-white hover:text-indigo-400 text-left font-semibold text-base py-5">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-400 text-sm leading-relaxed pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
