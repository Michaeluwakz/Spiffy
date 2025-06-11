"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs as faqData, type FAQItem } from '@/lib/placeholder-data';
import { HelpCircle } from "lucide-react";

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <HelpCircle size={64} className="mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-headline font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground">
          Find answers to common questions about booking, properties, and more.
        </p>
      </div>
      
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqData.map((faq: FAQItem) => (
          <AccordionItem key={faq.id} value={faq.id} className="bg-card shadow-lg rounded-lg border border-border/50 px-2">
            <AccordionTrigger className="text-lg font-semibold font-headline text-left hover:no-underline px-4 py-4 focus:ring-2 focus:ring-ring rounded-md">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-0 text-base text-foreground/80 font-body leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
