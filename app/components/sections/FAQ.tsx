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
      question: "Pro koho je kurz určen?",
      answer: "Kurz je vhodný pro začátečníky i mírně pokročilé. Je ideální pro marketéry, podnikatele, content creatory a všechny, kdo chtějí vylepšit svá videa pro osobní či firemní prezentaci."
    },
    {
      question: "Potřebuji vlastní vybavení?",
      answer: "Ne, veškeré vybavení vám zapůjčíme. Pokud ale máte vlastní kameru, smartphone nebo notebook s editačním softwarem, můžete si je přinést a naučit se pracovat přímo s nimi."
    },
    {
      question: "Jak funguje dotace na kurz?",
      answer: "Díky podpoře našich partnerů můžeme nabídnout kurz za zvýhodněnou cenu 2 700 Kč místo plné ceny 15 000 Kč. Dotaci vyřizujeme my, vy platíte pouze sníženou částku."
    },
    {
      question: "Co když se mi termín nebude hodit?",
      answer: "Nabízíme několik termínů v průběhu roku. Pokud vám navržený termín nevyhovuje, kontaktujte nás a domluvíme vám jiný. V případě, že se nemůžete zúčastnit po zaplacení, můžete svou účast přesunout na jiný termín nebo poslat náhradníka."
    },
    {
      question: "Získám certifikát o absolvování?",
      answer: "Ano, po úspěšném absolvování kurzu získáte certifikát o dokončení, který můžete využít ve svém CV."
    },
    {
      question: "Jak probíhá platba za kurz?",
      answer: "Po vyplnění registračního formuláře vás kontaktujeme s potvrzením místa a zašleme vám platební údaje. Platbu můžete provést převodem na účet nebo kartou online. Kurz je potřeba uhradit nejpozději 5 dní před jeho začátkem."
    },
    {
      question: "Mohu získat fakturu pro firmu?",
      answer: "Ano, na vyžádání vám vystavíme fakturu pro firemní účely. V takovém případě prosím uveďte fakturační údaje při registraci."
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
          title="Často kladené otázky" 
          subtitle="Našli jste odpověď na svou otázku? Pokud ne, neváhejte nás kontaktovat"
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