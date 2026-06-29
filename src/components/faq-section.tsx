"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer: "Most of our web development projects take between 4 to 8 weeks from kickoff to launch. This depends on the complexity of the design, the number of pages, and how quickly we receive feedback and assets from your team."
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer: "Yes, absolutely. We offer tailored maintenance packages to ensure your site remains secure, fast, and up-to-date. This includes regular plugin updates, performance monitoring, and priority bug fixes."
  },
  {
    question: "What is the minimum budget required to work with you?",
    answer: "Our custom web design and development engagements typically start at $10,000. However, we sometimes take on smaller strategic projects if they align well with our expertise. Reach out and we can discuss your specific needs."
  },
  {
    question: "Will my website be optimized for SEO and mobile?",
    answer: "Every site we build follows strict SEO best practices (semantic HTML, fast load times, optimized metadata) and is fully responsive across all devices from mobile to large desktop displays."
  },
  {
    question: "What do you need from me to get started?",
    answer: "We usually start with a discovery call. After that, we'll need any existing brand guidelines, high-resolution logos, and a general idea of your goals. If you don't have these, we offer branding and strategy services as well."
  }
];

const FaqItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border-b border-border/40 py-4">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-4 text-left focus:outline-none group"
      >
        <span className="text-xl font-medium text-foreground group-hover:text-accent transition-colors duration-300">
          {question}
        </span>
        <div className="ml-4 flex-shrink-0 relative flex items-center justify-center size-8 rounded-full border border-border/50 group-hover:border-accent transition-colors duration-300 bg-background/50 backdrop-blur-sm">
          <Plus className={`absolute size-4 text-foreground transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
          <Minus className={`absolute size-4 text-accent transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
        </div>
      </button>
      <div 
        className={`grid transition-all duration-500 ease-[cubic-bezier(0.04,0.62,0.23,0.98)] ${isOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0 mt-0"}`}
      >
        <div className="overflow-hidden">
          <p className="pb-6 text-foreground-muted leading-relaxed max-w-3xl">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 px-6 lg:px-12 bg-background overflow-hidden z-10" id="faqs">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-accent-1/10 via-accent-3/10 to-accent-4/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground mb-6">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-1 via-accent-2 to-accent-4">Questions</span>
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Everything you need to know about our services, process, and working with us.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
