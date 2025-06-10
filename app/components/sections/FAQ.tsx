'use client';

import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, toggle }) => {
  return (
    <div className="border-b border-brand-gray/10 last:border-0">
      <button
        className="flex justify-between items-center w-full py-6 px-8 text-left font-anton text-lg text-brand-gray hover:text-brand-olive transition-colors focus:outline-none"
        onClick={toggle}
      >
        <span className="pr-8">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-brand-olive flex-shrink-0" />
        ) : (
          <ChevronDown className="w-6 h-6 text-brand-olive flex-shrink-0" />
        )}
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-brand-gray/80 font-montserrat px-8 pb-6">{answer}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "Kolik skutečně zaplatím díky 82% dotaci?",
      answer: "Místo běžné ceny 15 000 Kč zaplatíte pouze 2 700 Kč. Stát uhradí zbývajících 12 300 Kč (82% z celkové ceny). Tato dotace je však časově omezená a končí koncem roku 2025."
    },
    {
      question: "Kde kurz probíhá?",
      answer: "Kurz se koná osobně v Praze v moderních prostorách vybavených vším potřebným pro praktickou výuku. Přesnou adresu a pokyny k dopravě zašleme po potvrzení registrace."
    },
    {
      question: "Kolik je v kurzu lidí?",
      answer: "Maximálně 10. Každému se věnujeme individuálně, aby si každý účastník odnesl maximum."
    },
    {
      question: "Musím být nezaměstnaný, abych získal dotaci?",
      answer: "Ne! Dotaci může získat prakticky každý - zaměstnanci, OSVČ, studenti, rodiče na mateřské i důchodci. Stačí se zaregistrovat do evidence zájemců o zaměstnání, po kurzu se můžete odhlásit."
    },
    {
      question: "Jak dlouho trvá schválení dotace?",
      answer: "Oficiálně má Úřad práce 30 dní, ale doporučujeme podat žádost co nejdříve. Registrace musí být minimálně 30 dní před začátkem kurzu."
    },
    {
      question: "Do kdy musím využít 82% dotaci?",
      answer: "Dotace je dostupná pouze do konce roku 2025. Pro bezpečné stíhání všech termínů doporučujeme registraci do 31. října 2025, abyste měli dostatek času na vyřízení všech náležitostí."
    },
    {
      question: "Co když kurz nedokončím?",
      answer: "Musíte mít minimálně 80% účast a splnit finální projekt. Jinak byste museli doplatit zbývajících 82% ceny kurzu (12 300 Kč)."
    },
    {
      question: "Dostanu certifikát?",
      answer: "Ano, oficiální certifikát o absolvování kurzu, který můžete použít v životopisu nebo při žádosti o práci."
    },
    {
      question: "Jaké aplikace používáte?",
      answer: "CapCut, InShot a další - všechny zdarma. Naučíme vás v nich pracovat jako profíci."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(index === openIndex ? -1 : index);
  };

  return (
    <section className="py-20 bg-brand-beige">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Praktické informace" 
          subtitle="Odpovědi na nejčastější otázky o kurzu a 82% dotaci"
        />
        
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md border border-brand-gray/10 divide-y divide-brand-gray/10">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={index === openIndex}
              toggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;