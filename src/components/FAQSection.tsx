import { Helmet } from "@/lib/helmet";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  eyebrow?: string;
}

const FAQSection = ({ faqs, title = "Preguntas Frecuentes", eyebrow = "FAQ" }: FAQSectionProps) => {
  const [open, setOpen] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="py-20 md:py-28 bg-background">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <div className="container mx-auto px-4 max-w-3xl">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="text-[11px] font-sans font-semibold tracking-[0.35em] uppercase text-muted-foreground mb-4 block">
              {eyebrow}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">{title}</h2>
            <div className="w-12 h-px bg-gold mx-auto mt-6" />
          </div>
        </ScrollReveal>
        <div className="divide-y divide-border border-y border-border">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <ScrollReveal key={f.q} delay={i * 0.05}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base md:text-lg font-semibold text-foreground">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-gold shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <p className="pb-6 text-sm md:text-base leading-relaxed font-light text-muted-foreground">
                    {f.a}
                  </p>
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
