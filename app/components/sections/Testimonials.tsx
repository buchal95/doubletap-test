'use client';

import React from 'react';
import SectionHeading from '../common/SectionHeading';
import { Star, Quote, Play } from 'lucide-react';

const TestimonialCard: React.FC<{
  name: string;
  quote: string;
  stars?: number;
}> = ({ name, quote, stars = 5 }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 border border-brand-gray/10 transition-all duration-300 hover:shadow-lg relative">
      {/* Quote icon */}
      <Quote className="w-8 h-8 text-brand-olive/30 mb-4" />
      
      {/* Stars */}
      <div className="flex mb-6">
        {[...Array(stars)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-brand-olive fill-brand-olive" />
        ))}
      </div>
      
      {/* Quote text */}
      <p className="text-brand-gray/80 font-montserrat mb-6 italic leading-relaxed">
        "{quote}"
      </p>
      
      {/* Author */}
      <div className="border-t border-brand-gray/10 pt-4">
        <p className="font-anton text-brand-gray text-lg">{name}</p>
        <p className="text-brand-gray/60 text-sm font-montserrat">absolventka kurzu</p>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Tina",
      quote: "Kurz se mi velmi líbil a taky mi hodně dal 😊 Jsem si sebejistější ve tvorbě videí a contentu na sociální sítě. Lektoři byli oba naprosto skvělí a vše nám důkladně vysvětlili. Seznámila jsem se s velice kreativní aplikací CapCut, kterou se teď snažím co nejvíc využívat. Tento kurz bych doporučila všem, kdo se chtějí naučit, nebo se zdokonalit ve tvorbě videí na sociálních sítích. Stojí to za to! Moc Vám děkuji!",
      stars: 5
    },
    {
      name: "Renáta", 
      quote: "Zúčastnila jsem se kurzu Tvorba krátkých videí na sociální sítě a byla to skvělá zkušenost! Atmosféra byla velmi uvolněná a přátelská, zároveň ale nabitá praktickými informacemi. Lektoři byli milí, trpěliví a velmi nápomocní – každý z nás dostal individuální přístup podle své úrovně. Oceňuji, že se opravdu přizpůsobili potřebám jak začátečníků, tak pokročilých, takže se nikdo necítil pozadu ani se nenudil. Kurz byl zábavný, praktický a motivující – odnesla jsem si spoustu nových dovedností a inspirace, které určitě využiju při tvorbě vlastního obsahu. Pokud váháte, rozhodně doporučuju.",
      stars: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Co říkají naši absolventi" 
          subtitle="Skutečné reference od lidí, kteří kurz absolvovali"
        />
        
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
        
        {/* Video testimonial section */}
        <div className="bg-brand-beige rounded-xl p-8 md:p-10 text-center max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-center mb-6">
            <Play className="w-8 h-8 text-brand-olive mr-3" />
            <h3 className="text-2xl font-anton mb-0 text-brand-gray">Video od absolventky</h3>
          </div>
          
          <div className="aspect-w-16 aspect-h-9 max-w-3xl mx-auto mb-6">
            <iframe
              src="https://www.youtube.com/embed/nuhI-mo_vmY"
              title="Video testimonial od absolventky kurzu - Tina"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-64 md:h-[400px] rounded-lg shadow-lg"
            ></iframe>
          </div>
          
          <p className="text-brand-gray/80 font-montserrat max-w-2xl mx-auto mb-4">
            "Kurz se mi velmi líbil a taky mi hodně dal. Jsem si sebejistější ve tvorbě videí a contentu na sociální sítě."
          </p>
          <p className="font-anton text-brand-gray">Tina, absolventka kurzu</p>
        </div>
        
        {/* Call to action */}
        <div className="bg-white border-2 border-brand-olive/20 rounded-xl p-8 text-center max-w-4xl mx-auto">
          <h3 className="text-xl font-anton mb-4 text-brand-gray">Přidejte se k naším spokojeným absolventům</h3>
          <p className="text-brand-gray/80 font-montserrat max-w-2xl mx-auto mb-6">
            Každý měsíc absolvuje náš kurz další skupina nadšenců, kteří si chtějí zlepšit své video dovednosti. 
            Buďte mezi nimi a objevte, jak snadné může být vytváření profesionálních videí.
          </p>
          <div className="inline-flex items-center bg-brand-olive/10 px-4 py-2 rounded-lg border border-brand-olive/20">
            <Star className="w-5 h-5 text-brand-olive fill-brand-olive mr-2" />
            <span className="font-montserrat font-semibold text-brand-gray">100% spokojenost absolventů</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;